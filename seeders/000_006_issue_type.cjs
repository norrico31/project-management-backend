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
    await queryInterface.bulkInsert('issue_types', [
      {
        id: uuidv4(),
        name: 'Request',
        description: 'request'
      },
      {
        id: uuidv4(),
        name: 'Functionality',
        description: 'functionality'
      },
      {
        id: uuidv4(),
        name: 'Optimization',
        description: 'optimization'
      },
      {
        id: uuidv4(),
        name: 'Content',
        description: 'content'
      },
      {
        id: uuidv4(),
        name: 'Style',
        description: 'style'
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
