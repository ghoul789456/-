const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");
const router = express.Router();
const User = require("../database/user");
//获取全部用户
router.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();

    // 返回视频数据
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    // 如果查询出现错误，返回 500 状态码和错误信息
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user information",
    });
  }
});
// 获取用户信息
router.get("/userinfo", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // 获取请求头中的token
  try {
    // 验证并解码token
    const decoded = jwt.verify(token, config.jwtSecretKey);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) return res.status(404).json({ message: "用户未找到" });
    // 返回用户信息
    res.status(200).json({
      id: user.id,
      account: user.account,
      nickname: user.nickname,
      pic: user.pic,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("JWT验证失败:", error);
    return res.status(401).json({ message: "无效的 token" });
  }
});
//修改信息
router.post("/userinfo", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { id, nickname, pic } = req.body;

  // 检查前端是否提供了 id
  const userId =
    id || (token ? jwt.verify(token, config.jwtSecretKey).id : null);

  if (!userId) {
    return res
      .status(401)
      .json({ message: "未提供用户 ID 或 token，访问被拒绝" });
  }

  User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "用户未找到" });
      }
      // 更新用户的 nickname 和 pic
      user.nickname = nickname;
      user.pic = pic;
      // 保存更新后的用户信息
      return user.save();
    })
    .then((updatedUser) => {
      res.status(200).json({
        message: "用户信息更新成功",
        nickname: updatedUser.nickname,
        pic: updatedUser.pic,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "更新用户信息时出错", error: error.message });
    });
});

module.exports = router;
