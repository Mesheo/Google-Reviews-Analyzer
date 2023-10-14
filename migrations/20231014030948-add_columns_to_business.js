'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Business', 'ratingsAverage', {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn('Business', 'numberOfReviews', {
      type: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Business', 'ratingsAverage');
    await queryInterface.removeColumn('Business', 'numberOfReviews');
  }
};
