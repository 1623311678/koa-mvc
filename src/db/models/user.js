// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConn');
const Asset = require('./asset');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 其他用户属性...
  },
  {
    timestamps: true,
    tableName: 'user',
  }
);

// 在用户模型中定义与资产模型的关联关系
// 用户内查询携带资产信息
User.hasMany(Asset, { foreignKey: 'creatorId', as: 'assets' });
//资产内查询携带用户信息
Asset.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
module.exports = User;

