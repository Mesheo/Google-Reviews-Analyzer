'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reviews', 'businessHash', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Business', 'businessHash');

  }
};
