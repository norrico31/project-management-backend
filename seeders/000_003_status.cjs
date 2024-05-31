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
      await queryInterface.bulkInsert('statuses', [
        {
          id: uuidv4(),
          name: 'Open',
          description: 'open'
        },
        {
          id: uuidv4(),
          name: 'Reopen',
          description: 're open'
        },
        {
          id: uuidv4(),
          name: 'Completed',
          description: 'completed'
        },
        {
          id: uuidv4(),
          name: "Can't Replicate",
          description: "can't replicate"
        },
        {
          id: uuidv4(),
          name: "Dev Note",
          description: "dev note"
        },
        {
            id: uuidv4(),
            name: 'In Progress',
            description: 'in progress'
          },
        {
            id: uuidv4(),
          name: 'Bug Fixing',
          description: 'bug fixing'
      },
        {
          id: uuidv4(),
          name: 'Client Review',
          description: 'client review'
      },
      {
          id: uuidv4(),
          name: 'For QA',
          description: 'for qa'
      },
      {
          id: uuidv4(),
          name: 'QA Note',
          description: 'qa note'
      },
      {
        id: uuidv4(),
        name: 'On Going QA',
        description: 'on going qa'
      },
        {
          id: uuidv4(),
          name: 'For Bug Fix',
          description: 'for bug fix'
        },
        {
          id: uuidv4(),
          name: 'For Dev Review',
          description: 'for dev review'
        },
        {
          id: uuidv4(),
          name: 'Fixed On Dev',
          description: 'fixed on dev'
        },
        {
          id: uuidv4(),
          name: 'Need Info',
          description: 'need info'
        },
        {
          id: uuidv4(),
          name: 'Repeated Log',
          description: 'repeated log'
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
