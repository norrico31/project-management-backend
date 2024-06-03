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
   // NOTE: ADD MORE FOR SCREEN SIZES
    await queryInterface.bulkInsert('devices', [
      {
        id: uuidv4(),
        name: 'Chrome MAC',
        description: 'chrome mac ios'
      },
      {
        id: uuidv4(),
        name: 'Chrome WINDOWS',
        description: 'chrome windows android'
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
