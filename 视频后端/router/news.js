const express = require("express");
const News = require("../database/news");
const User = require("../database/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
//发送消息
router.post("/sendmsg", async (req, res) => {
  const { topic, content } = req.body;
  try {
    // 获取当前日期时间
    const currentDate = new Date();
    // 查询所有用户
    const users = await User.findAll({ attributes: ["id"] });

    // 构建消息数组
    const messages = users.map((user) => ({
      uid: user.id,
      topic,
      content,
      date: currentDate,
    }));

    // 批量插入消息
    const createdMessages = await News.bulkCreate(messages);
    return res
      .status(201)
      .json({ message: "消息发送成功", count: createdMessages.length });
  } catch (error) {
    console.error("发送消息时发生错误:", error); // 更具体的错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});

router.get("/receive", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "未提供 token，访问被拒绝" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);
    const news = await News.findAll({ where: { uid: decoded.id } });
    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news:", error);

    // 如果查询出现错误，返回 500 状态码和错误信息
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
});

module.exports = router;
