'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'Progresses',
            'User_Id'
        )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
