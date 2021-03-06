'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Like_Users",{
      fields: ['contentID'],
      type: 'foreign key',
      name: 'Like_Users_ApiID',
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
    await queryInterface.removeConstraint('Like_Users', 'Like_Users_ApiID');

  }
};
