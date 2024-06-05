'use strict';

export default (sequelize, DataTypes) => {
    const Development = sequelize.define('developments', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        finish_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'statuses',
                key: 'id',
            },
            onUpdate: 'ON UPDATE',
            onDelete: 'SET NULL'
        },
    }, {
        timestamps: true,
        sequelize,
        modelName: 'Developments',
    });
    return Development
}