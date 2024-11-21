const express = require("express");
const app = express();

// 解决跨域
const cors = require("cors");
app.use(cors());

//解析表单
app.use(express.urlencoded({ extended: false }));
// 解析 JSON 格式的请求体
app.use(express.json());
//导入token
const config = require("./config");
const { expressjwt: jwt } = require("express-jwt");
//指定不需要验证的接口
app.use(
  jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/api\//],
  })
);

//捕获错误的中间件
app.use((err, req, res, next) => {
  //身份认证失败后的错误
  if (err.name === "UnauthorizedError") console.log(err);

  return res.status(401).json({ message: "身份认证错误" });
});

// 导入路由
const useRouter = require("./router/user");
app.use("/api", useRouter);

const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);

const videoRouter = require("./router/video");
app.use("/v", videoRouter);

const collectRouter = require("./router/collect");
app.use("/c", collectRouter);

const historyRouter = require("./router/history");
app.use("/h", historyRouter);

const newsRouter = require("./router/news");
app.use("/n", newsRouter);

const commentRouter = require("./router/comment");
app.use("/cm", commentRouter);

const subRouter = require("./router/subscription");
app.use("/s", subRouter);
app.listen(3007, () => console.log("Server running on http://127.0.0.1:3007"));
