const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Video = sequelize.define(
  "videos",
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
    video_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    classify: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    landscape: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    comment: "视频信息表",
  }
);
Video.sync()
  .then(() => console.log("数据库模型同步成功"))
  .catch((err) => console.log(err));

module.exports = Video;
