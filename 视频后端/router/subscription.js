const express = require("express");
const Subscription = require("../database/subscription");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
// 获取所有视频信息的路由
router.get("/sub", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "未提供 token，访问被拒绝" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);
    const subscriptions = await Subscription.findAll({
      where: { uid: decoded.id },
    });

    // 返回视频数据
    res.json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);

    // 如果查询出现错误，返回 500 状态码和错误信息
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching subscription information",
    });
  }
});
router.post("/addsub", async (req, res) => {
  const { title, pic, vid } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "未提供 token，访问被拒绝" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);

    // 查找是否已经订阅该视频
    const videoExists = await Subscription.findOne({
      where: { uid: decoded.id, title },
    });

    if (videoExists) {
      return res.status(400).json({ message: "视频已经存在" });
    }

    // 创建新订阅
    const video = await Subscription.create({
      title,
      uid: decoded.id,
      pic,
      vid,
    });

    return res.status(201).json({ message: "视频订阅成功", video });
  } catch (error) {
    console.error(error); // 打印错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});
router.post("/delsub", async (req, res) => {
  const { vid } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "未提供 token，访问被拒绝" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);
    const videoExists = await Subscription.findOne({
      where: { uid: decoded.id, vid },
    });

    if (videoExists) {
      await videoExists.destroy(); // 删除找到的记录
    }
    return res.status(201).json({ message: "视频删除成功" });
  } catch (error) {
    console.error(error); // 打印错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});

module.exports = router;
