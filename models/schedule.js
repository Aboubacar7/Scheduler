const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Schedule extends Model {}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'schedule', // Explicitly set table name to match the database
    modelName: 'Schedule',
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    underscored: true,
    timestamps: false,
  }
);

module.exports = Schedule;
