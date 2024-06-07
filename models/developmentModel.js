'use strict';

export default (sequelize, DataTypes) => {
    const Development = sequelize.define('developments', {
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
        name: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.JSON,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        finish_date: {
            type: DataTypes.DATE,
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
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
    }, {
        timestamps: true,
        sequelize,
        modelName: 'Developments',
    });
    return Development
}