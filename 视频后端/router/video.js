const express = require("express");
const Video = require("../database/video");
const Subscription = require("../database/subscription");
const News = require("../database/news");
const History = require("../database/history");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const { Op } = require("sequelize");
// 获取所有视频信息的路由
router.get("/videos", async (req, res) => {
  try {
    // 使用数据库模型 Video 查找所有视频
    const videos = await Video.findAll();

    // 返回视频数据
    res.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);

    // 如果查询出现错误，返回 500 状态码和错误信息
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching video information",
    });
  }
});
router.post("/video", async (req, res) => {
  const { title, description, video_url, classify, landscape, pic } = req.body;
  try {
    if (title && description && video_url && classify && pic && landscape) {
      const video = await Video.create({
        title,
        description,
        video_url,
        classify,
        pic,
        landscape,
      });
      // 查询订阅该视频的用户
      const subscriptions = await Subscription.findAll({
        where: { title: video.title },
      }); // 给每个用户发送消息
      for (const subscription of subscriptions) {
        await News.create({
          uid: subscription.uid,
          topic: "视频更新通知",
          content: `你订阅的 "${video.title}" 已更新！`,
          date: new Date(),
        });
      }
      // 成功注册，返回 201 状态码和用户信息
      return res.status(201).json({ message: "视频上传成功", video });
    } else {
      // 如果请求中缺少必要字段，返回 400 状态码
      return res.status(400).json({ message: "视频上次失败" });
    }
  } catch (error) {
    // 捕获并处理所有其他错误
    console.error(error); // 打印错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});
router.post("/videoinfo", async (req, res) => {
  const { id } = req.body;
  try {
    const video = await Video.findOne({ where: { id } });
    const videos = await Video.findAll({ where: { title: video.title } });
    return res.status(200).json({ success: true, data: videos });
  } catch (error) {
    // 捕获并处理所有其他错误
    console.error(error); // 打印错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});
router.post("/videoclass", async (req, res) => {
  const { classify } = req.body;
  try {
    const videos = await Video.findAll({ where: { classify } });

    // 初始化唯一视频数组
    const uniqueVideos = [];

    if (videos.length > 0) {
      const seenTitles = new Map(); // 使用 Map 来跟踪已出现的标题
      videos.forEach((item) => {
        if (!seenTitles.has(item.title)) {
          seenTitles.set(item.title, true); // 将标题添加到 Map 中
          uniqueVideos.push(item); // 添加到唯一列表中
        }
      });

      if (uniqueVideos.length === 0) {
        console.log("没有符合分类的影片");
        return res
          .status(404)
          .json({ success: false, message: "没有符合分类的影片" });
      }
    } else {
      console.log("没有视频数据");
      return res.status(404).json({ success: false, message: "没有视频数据" });
    }

    return res.status(200).json({ success: true, data: uniqueVideos });
  } catch (error) {
    // 捕获并处理所有其他错误
    console.error(error); // 打印错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});
router.post("/search", async (req, res) => {
  const { title } = req.body;
  try {
    let videoEpisodes = [];
    const videos = await Video.findAll();
    // 使用正则表达式匹配包含该 title 的其他视频
    const regex = new RegExp(title, "i"); // 'i' 表示不区分大小写
    videoEpisodes = videos.filter((item) => regex.test(item.title));
    const seenTitles = new Map();
    videoEpisodes = videoEpisodes.reduce((unique, item) => {
      if (!seenTitles.has(item.title)) {
        seenTitles.set(item.title, true);
        unique.push(item);
      }
      return unique;
    }, []);
    res.json(videoEpisodes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/recommended", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token is required" });
  }

  try {
    // 解码 token 获取用户 ID
    const decoded = jwt.verify(token, config.jwtSecretKey);
    const userId = decoded.id;

    // 查询该用户的观看历史记录
    const historyRecords = await History.findAll({
      where: { uid: userId },
    });

    // 如果用户没有观看记录，返回空的推荐列表
    if (historyRecords.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // 提取用户观看过的所有视频 ID 和标题
    const watchedVideoIds = historyRecords.map((record) => record.vid);
    const watchedTitles = historyRecords.map((record) => record.title);

    // 获取这些视频的分类信息
    const watchedVideos = await Video.findAll({
      where: { id: watchedVideoIds },
      attributes: ["id", "title", "classify"],
    });

    // 提取视频的分类，并去重
    const watchedClassifications = [
      ...new Set(watchedVideos.map((video) => video.classify)),
    ];

    // 查询推荐视频，排除用户已经观看过的视频
    const recommendedVideos = await Video.findAll({
      where: {
        classify: watchedClassifications,
        id: { [Op.notIn]: watchedVideoIds },
      },
      limit: 10,
    });

    // 根据标题去重推荐视频，同时排除用户已观看的标题
    const uniqueRecommendedVideos = [];
    const seenTitles = new Set();

    for (const video of recommendedVideos) {
      if (
        !seenTitles.has(video.title) &&
        !watchedTitles.includes(video.title)
      ) {
        // 检查历史记录中的标题
        seenTitles.add(video.title);
        uniqueRecommendedVideos.push(video);
      }
    }

    // 返回去重后的视频列表
    res.json({
      success: true,
      data: uniqueRecommendedVideos,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching recommended videos",
    });
  }
});
router.post("/del", async (req, res) => {
  const { id } = req.body;

  if (id) {
    try {
      const result = await Video.destroy({
        where: {
          id: id,
        },
      });

      if (result) {
        res.status(200).json({ message: "Data deleted successfully" });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting data" });
    }
  } else {
    res.status(400).json({ message: "ID is required" });
  }
});
module.exports = router;
