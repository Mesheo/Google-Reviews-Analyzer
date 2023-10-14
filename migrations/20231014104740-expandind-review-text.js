'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Reviews', 'reviewText', {
      type: Sequelize.STRING(1000),
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Reviews', 'reviewText', {
      type: Sequelize.STRING,
    });
  }
};
