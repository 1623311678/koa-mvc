// asset.js
const { DataTypes } = require('sequelize');

const sequelize = require('../dbConn');

const Asset = sequelize.define(
  'asset',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // 其他资产属性...
  },
  {
    timestamps: true,
    tableName: 'asset',
  }
);
// Asset.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
module.exports = Asset;
