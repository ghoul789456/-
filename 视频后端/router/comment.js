const express = require("express");
const Comment = require("../database/comment");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
// 获取所有视频评论信息的路由
router.post("/cinfo", async (req, res) => {
  const { vid } = req.body;
  try {
    const comments = await Comment.findAll({ where: { vid } });

    // 返回视频数据
    res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);

    // 如果查询出现错误，返回 500 状态码和错误信息
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching comments information",
    });
  }
});
router.post("/comments", async (req, res) => {
  const { pic, vid, content, date } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "未提供 token，访问被拒绝" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecretKey);

    // 创建新评论
    const comment = await Comment.create({
      nickname: decoded.nickname,
      pic,
      vid,
      content,
      date,
      uid: decoded.id,
    });

    return res.status(201).json({ message: "视频评论成功", comment });
  } catch (error) {
    console.error(error); // 打印错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});

module.exports = router;
