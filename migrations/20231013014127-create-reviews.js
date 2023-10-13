'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      reviewiId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      businessId: {
        allowNull: true,
        references: {
          model: 'Business',
          key: 'businessId'
        },
        type: Sequelize.INTEGER
      },
      stars: {
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      hasPicture: {
        type: Sequelize.BOOLEAN
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};