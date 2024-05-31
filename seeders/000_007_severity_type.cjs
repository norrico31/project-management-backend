'use strict';
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('severity_types', [
      {
        id: uuidv4(),
        name: 'Critical',
        description: 'critical'
      },
      {
        id: uuidv4(),
        name: 'High',
        description: 'high'
      },
      {
        id: uuidv4(),
        name: 'Medium',
        description: 'medium'
      },
      {
        id: uuidv4(),
        name: 'Low',
        description: 'low'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
