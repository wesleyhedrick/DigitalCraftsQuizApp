'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Progress.init({
    Score: DataTypes.INTEGER,
    Missed_Question_Id: DataTypes.INTEGER,
    Player_Selection: DataTypes.STRING,
    Remaining_Question_Ids: DataTypes.STRING,
    User_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Progress',
  });
  return Progress;
};