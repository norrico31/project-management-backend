'use strict';

export default (sequelize, DataTypes) => {
    const Reports = sequelize.define('reports', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
            onUpdate: 'ON UPDATE',
            onDelete: 'SET NULL'
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        actual_time_spent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
        sequelize,
        modelName: 'Report',
    });
    return Reports
}