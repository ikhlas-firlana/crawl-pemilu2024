'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('election_votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      info: Sequelize.DataTypes.STRING,
      name: Sequelize.DataTypes.STRING,
      url: Sequelize.DataTypes.STRING,
      progress: Sequelize.DataTypes.STRING,
      candidate_1: Sequelize.DataTypes.STRING,
      candidate_2: Sequelize.DataTypes.STRING,
      candidate_3: Sequelize.DataTypes.STRING,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('election_votes');
  }
};
