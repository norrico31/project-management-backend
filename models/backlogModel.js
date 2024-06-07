'use strict';

export default (sequelize, DataTypes) => {
    const Development = sequelize.define('backlogs', {
        // TODO project_id allowaNull: true
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        project_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'projects',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        issue_type_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'issue_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        severity_type_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'severity_types',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        qa_reference: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        status_id: {
            type: DataTypes.UUID,
            references: {
                model: 'statuses',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        date_added: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_fixed: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        fixed_by: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
        },
        completed_by: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
        },
        device_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'devices',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        issues: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expeted_outcome: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        screenshots: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
        sequelize,
        modelName: 'Backlogs',
    });
    return Development
}