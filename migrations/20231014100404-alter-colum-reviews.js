'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Reviews', 'date', 'reviewDate');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Reviews', 'ReviewDate', 'date');
  }
};
