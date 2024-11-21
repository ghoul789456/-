const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Comment = sequelize.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    pic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    vid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "videos", // 关联的表名
        key: "id", // 关联的字段
      },
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
    comment: "评论信息表",
  }
);

Comment.sync()
  .then(() => console.log("数据库模型同步成功"))
  .catch((err) => console.log(err));

module.exports = Comment;
