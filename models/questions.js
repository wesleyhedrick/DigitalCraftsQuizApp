'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   // define association here
    //   Questions.belongsTo(models.Category, {
    //     foreignKey: 'CategoryId'
    //   });
    //   Contact.hasMany(models.Types, {
    //     foreignKey: 'type_id'
    //   });
    }
  };
  Questions.init({
    Question: DataTypes.STRING,
    Correct_Answer: DataTypes.STRING,
    Wrong_Answer_1: DataTypes.STRING,
    Wrong_Answer_2: DataTypes.STRING,
    Wrong_Answer_3: DataTypes.STRING,
    Submitted: DataTypes.BOOLEAN,
    Category_ID: DataTypes.INTEGER,
    Question_Type_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};