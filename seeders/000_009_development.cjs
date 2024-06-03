'use strict';
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const users = await queryInterface.sequelize.query(
      `SELECT * FROM users;`
    );

    const statuses = await queryInterface.sequelize.query(
      `SELECT * FROM statuses;`
    );

    const userMap = users[0].reduce((acc, role) => {
        acc[role.first_name] = role.id;
        return acc;
    }, {});

    const statusesMap = statuses[0].reduce((acc, itm) => {
        acc[itm.name] = itm.id;
        return acc;
    }, {});
    
    // console.log('userMap: ', userMap)
    // console.log('status: ', statusesMap)

    await queryInterface.bulkInsert('developments', [
      {
        id: uuidv4(),
        name: 'Sprint 1',
        user_id: JSON.stringify([userMap['norrico gerald'], userMap['Administrator']]),
        start_date: new Date(),
        finish_date: new Date(),
        deadline: new Date(),
        duration: 60,
        status_id: statusesMap['In Progress'],
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
