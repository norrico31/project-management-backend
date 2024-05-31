'use strict';

export default (sequelize, DataTypes) => {
    return sequelize.define('schedules', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: true,
        sequelize,
        modelName: 'Schedules',
    });
}