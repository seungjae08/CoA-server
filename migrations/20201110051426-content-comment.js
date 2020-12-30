'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Comments",{
      fields: ['contentID'],
      type: 'foreign key',
      name: 'ConmmentsID_ApiID',
      references: {
        table: 'Contents',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
   })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Comments', 'ConmmentsID_ApiID');

  }
};
