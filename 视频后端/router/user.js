const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../database/user");
const config = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();

// 注册路由
router.post("/register", async (req, res) => {
  const { account, password } = req.body;
  console.log("Received account:", account);
  try {
    // 检查是否已经存在用户
    const userExists = await User.findOne({ where: { account } });
    if (userExists) {
      // 如果用户已经存在，返回 400 状态码和错误信息
      return res.status(400).json({ message: "账号已经存在" });
    }

    if (account && password) {
      // 哈希密码
      const hashedPassword = await bcrypt.hash(password, 10);

      // 创建用户
      const user = await User.create({
        account,
        password: hashedPassword,
        isAdmin: 0,
      });

      // 成功注册，返回 201 状态码和用户信息
      return res.status(201).json({ message: "用户注册成功", user });
    } else {
      // 如果请求中缺少必要字段，返回 400 状态码
      return res.status(400).json({ message: "账号和密码不能为空" });
    }
  } catch (error) {
    // 捕获并处理所有其他错误
    console.error(error); // 打印错误信息
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});

// 登录路由
router.post("/login", async (req, res) => {
  const { account, password } = req.body;

  try {
    // 查找用户
    const user = await User.findOne({ where: { account } });

    if (user) {
      // 使用 bcrypt 比较明文密码和哈希密码
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // 生成 JWT
        const tokenStr = jwt.sign(
          {
            id: user.id,
            account: user.account,
            nickname: user.nickname,
            isAdmin: user.isAdmin,
          },
          config.jwtSecretKey,

          {
            expiresIn: config.expiresIn,
          }
        );
        return res
          .status(200)
          .json({ message: "登录成功", token: "Bearer " + tokenStr });
      } else {
        return res.status(401).json({ message: "密码错误" });
      }
    } else {
      return res.status(404).json({ message: "用户不存在" });
    }
  } catch (error) {
    console.error("服务器错误:", error);
    return res
      .status(500)
      .json({ message: "服务器错误", error: error.message || error });
  }
});

module.exports = router;
