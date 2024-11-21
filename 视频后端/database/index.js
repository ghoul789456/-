//创建sequelize对象，访问数据库mydb01
const Sequelize = require("sequelize");

const sequelize = new Sequelize("video", "root", "dgzdeng0812", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false, //关闭日志输出
});

sequelize
  .authenticate()
  .then(() => {
    console.log("连接成功");
  })
  .catch((err) => {
    console.log("连接失败", err);
  });
module.exports = sequelize;
