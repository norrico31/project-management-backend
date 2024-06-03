'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Developments', {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
          },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.JSON,
            allowNull: true,
            // references: {
            //     model: 'Users',
            //     key: 'id',
            // },
            // onUpdate: 'CASCADE',
            // onDelete: 'SET NULL'
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        finish_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        deadline: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status_id: {
            type: Sequelize.UUID,
            references: {
                model: 'Statuses',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Developments');
  }
};