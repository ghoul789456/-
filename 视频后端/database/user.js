const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    comment: "用户信息表",
  }
);
User.sync()
  .then(() => console.log("数据库模型同步成功"))
  .catch((err) => console.log(err));
module.exports = User;
