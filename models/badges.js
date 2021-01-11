'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Badges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        
     
    }
  };
  Badges.init({
    Badge_Name: DataTypes.STRING,
    Badge_Image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Badges',
  });
  return Badges;
};