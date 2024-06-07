'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('optimizations', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      project_id: {
        type: Sequelize.UUID,
        references: {
            model: 'projects',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    gt_metrix_score_a: {
        type: Sequelize.STRING,
    },
    desktop_90: {
        type: Sequelize.STRING,
    },
    desktop_80: {
        type: Sequelize.STRING,
    },
    user_id: {
        type: Sequelize.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    date_tested: {
        type: Sequelize.DATE,
    },
    notes: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('optimizations');
  }
};