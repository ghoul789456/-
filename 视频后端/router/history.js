const express = require("express");
const History = require("../database/history");
const Video = require("../database/video");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const { where } = require("sequelize");
// 获取视频信息
router.get("/htinfo", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "未提供 token，访问被拒绝" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);
    const history = await History.findAll({ where: { uid: decoded.id } });

    // 返回视频数据
    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error("Error fetching history:", error);

    // 如果查询出现错误，返回 500 状态码和错误信息
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching history information",
    });
  }
});
router.post("/history", async (req, res) => {
  const { vid, date } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);
    const hvideos = await History.findAll({ where: { uid: decoded.id } });
    const hvideo = await Video.findOne({ where: { id: vid } });
    // 检查 hvideos 中是否有相同的 title
    const videoExists = hvideos.find((video) => video.title === hvideo.title);

    if (videoExists) {
      // 如果视频已经存在，更新 date 字段
      videoExists.date = new Date(); // 或者使用当前时间的 ISO 格式
      await videoExists.save(); // 保存更新
      return res.status(200).json({ message: "视频观看记录已更新" });
    }

    // 如果没有相同的 title，则保存为新数据
    if (date && vid) {
      const video = await History.create({
        title: hvideo.title,
        uid: decoded.id,
        pic: hvideo.pic,
        vid,
        date,
      });

      return res.status(201).json({ message: "观看视频", video });
    } else {
      return res.status(400).json({ message: "未观看视频" });
    }
  } catch (error) {
    console.error(error); // 打印错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});

module.exports = router;
