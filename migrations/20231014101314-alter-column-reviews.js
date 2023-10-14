'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Reviews', 'text', 'reviewText');

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Reviews', 'reviewText', 'text');

  }
};
