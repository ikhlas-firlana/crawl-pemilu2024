'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      parent: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      level: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
      info: Sequelize.DataTypes.STRING,
      total_dpt: Sequelize.DataTypes.STRING,
      total_dptb: Sequelize.DataTypes.STRING,
      total_dpk: Sequelize.DataTypes.STRING,
      total_dpt_dptb_dpk: Sequelize.DataTypes.STRING,
      candidate_1: Sequelize.DataTypes.STRING,
      candidate_2: Sequelize.DataTypes.STRING,
      candidate_3: Sequelize.DataTypes.STRING,
      total_valid: Sequelize.DataTypes.STRING,
      total_invalid: Sequelize.DataTypes.STRING,
      total_valid_invalid: Sequelize.DataTypes.STRING,
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

  async down (queryInterface) {
    await queryInterface.dropTable('votes');
  }
};
