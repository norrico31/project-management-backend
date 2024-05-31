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
    await queryInterface.bulkInsert('project_types', [
      {
        id: uuidv4(),
        name: 'React',
        description: 'react'
      },
      {
        id: uuidv4(),
        name: 'Wordpress',
        description: 'wordpress'
      },
      {
        id: uuidv4(),
        name: 'Webflow',
        description: 'webflow'
      },
      {
        id: uuidv4(),
        name: 'Drupal',
        description: 'drupal'
      },
      {
        id: uuidv4(),
        name: 'Craft',
        description: 'craft'
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
