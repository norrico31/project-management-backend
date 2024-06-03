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
    const users = await queryInterface.sequelize.query(
      `SELECT * FROM users;`
    );
    const userMap = users[0].reduce((acc, role) => {
        acc[role.first_name] = role.id;
        return acc;
    }, {});
    
    // console.log('users: ', userMap)

    await queryInterface.bulkInsert('reports', [
      {
        id: uuidv4(),
        user_id: userMap['norrico gerald'],
        date: new Date(),
        description: 'reports sample description',
        actual_time_spent: 8,
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
