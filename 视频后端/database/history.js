const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const History = sequelize.define(
  "histories",
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    comment: "历史观看信息表",
  }
);

History.sync()
  .then(() => console.log("数据库模型同步成功"))
  .catch((err) => console.log(err));

module.exports = History;
