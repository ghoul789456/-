const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Collect = sequelize.define(
  "collects",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "videos", // 关联的表名
        key: "id", // 关联的字段
      },
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // 关联的表名
        key: "id", // 关联的字段
      },
    },
  },
  {
    timestamps: false,
    comment: "收藏信息表",
  }
);

Collect.sync()
  .then(() => console.log("数据库模型同步成功"))
  .catch((err) => console.log(err));

module.exports = Collect;
