const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const News = sequelize.define(
  "news",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // 关联的表名
        key: "id", // 关联的字段
      },
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    comment: "用户消息表",
  }
);
News.sync()
  .then(() => console.log("数据库模型同步成功"))
  .catch((err) => console.log(err));
module.exports = News;
