'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Reviews', 'hash', 'reviewHash');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Reviews', 'reviewHash', 'hash');
  }
};
