'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('backlogs', {
        id: {
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        project_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'projects',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        issue_type_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'issue_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        severity_type_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'severity_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        qa_reference_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        status_id: {
            type: Sequelize.UUID,
            references: {
                model: 'statuses',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        date_added: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        date_fixed: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        fixed_by_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
        },
        completed_by_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
        },
        device_id: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'devices',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        url: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        issues: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        expeted_outcome: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        screenshots: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: true,
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
    await queryInterface.dropTable('Backlogs');
  }
};