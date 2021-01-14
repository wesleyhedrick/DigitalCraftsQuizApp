"use strict";
const { Model, DataTypes } = require("sequelize"); // explicitly import datatypes from the module.exports()
const sequelize = require("../config/sequelize"); // being imported from sequelize.js file
module.exports = () => {
  class Leaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leaderboard.init(
    {
      // Model attributes are defined here
      User_Id: DataTypes.INTEGER,
      Score: DataTypes.INTEGER,
      Badge_Id: DataTypes.INTEGER,
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Leaderboard", // We need to choose the model name
    }
  );
  return Leaderboard;
};