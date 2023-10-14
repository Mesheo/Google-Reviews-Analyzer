'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.renameColumn('Reviews', 'hasPicture', 'hasPhoto');
   await queryInterface.renameColumn('Reviews', 'reviewiId', 'reviewId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Reviews', 'hasPhoto', 'hasPicture');
    await queryInterface.renameColumn('Reviews', 'reviewId','reviewiId');
  }
};
