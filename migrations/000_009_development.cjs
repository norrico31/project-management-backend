'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('developments', {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
        },
        user_id: {
            type: Sequelize.JSON,
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        finish_date: {
            type: Sequelize.DATE,
        },
        deadline: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        duration: {
            type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('developments');
  }
};