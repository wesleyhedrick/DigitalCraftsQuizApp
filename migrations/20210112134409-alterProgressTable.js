'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
        // queryInterface.addColumn(
        //   'Progresses',
        //   'User_Id',
        //    Sequelize.INTEGER
        //  ),
        // queryInterface.addColumn(
        //   'Progresses',
        //   'Missed_Question_Id',
        //   Sequelize.INTEGER, 
        //   ),
        queryInterface.addColumn(
          'Progresses',
          'Player_Selection',
          Sequelize.STRING, 
          ),
        queryInterface.addColumn(
          'Progresses',
          'Remaining_Question_Ids',
          Sequelize.STRING, 
          ),
        

      
      ]);

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
