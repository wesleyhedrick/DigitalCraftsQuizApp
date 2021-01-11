'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Question: {
        type: Sequelize.STRING
      },
      Correct_Answer: {
        type: Sequelize.STRING
      },
      Wrong_Answer_1: {
        type: Sequelize.STRING
      },
      Wrong_Answer_2: {
        type: Sequelize.STRING
      },
      Wrong_Answer_3: {
        type: Sequelize.STRING
      },
      Submitted: {
        type: Sequelize.BOOLEAN
      },
      Category_ID: {
        type: Sequelize.INTEGER
      },
      Question_Type_Id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questions');
  }
};