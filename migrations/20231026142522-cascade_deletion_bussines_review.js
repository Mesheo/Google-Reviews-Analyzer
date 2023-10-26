'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('Reviews', {
      fields: ['businessId'],
      type: 'foreign key',
      name: 'business_cascade_review', // nome da restricao
      references: { 
        table: 'Business', 
        field: 'businessId', 
      },
      onDelete: 'CASCADE', 
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Reviews', 'business_cascade_review');
  }
};
