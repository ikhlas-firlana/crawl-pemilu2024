'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      title: Sequelize.DataTypes.STRING,
      subtitle: Sequelize.DataTypes.STRING,
      content: Sequelize.DataTypes.STRING,
      categories: Sequelize.DataTypes.STRING,
      author: Sequelize.DataTypes.STRING,
      link: Sequelize.DataTypes.STRING,
      created_time: {
        type: Sequelize.DATE
      },
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
    await queryInterface.dropTable('articles');
  }
};
