'use strict';
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

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
    const roles = await queryInterface.sequelize.query(
      `SELECT * FROM roles WHERE name IN ('Administrator', 'Employee');`
    );

    const roleMap = roles[0].reduce((acc, role) => {
      acc[role.name] = role.id;
      return acc;
    }, {});

    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        role_id: roleMap['Administrator'],
        first_name: 'Administrator',
        last_name: 'Administrator',
        middle_name: 'Administrator',
        age: 99,
        phone_no: '639982246506',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('secret123', await bcrypt.genSalt(10)),
        status: 'ACTIVE',
      },
      {
        id: uuidv4(),
        role_id: roleMap['Employee'],
        first_name: 'norrico gerald',
        last_name: 'biason',
        middle_name: 'mendones',
        age: 30,
        phone_no: '639982246506',
        email: 'norricobiason31@gmail.com',
        password: await bcrypt.hash('secret123', await bcrypt.genSalt(10)),
        status: 'ACTIVE',
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
