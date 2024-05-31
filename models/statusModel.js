'use strict';

export default (sequelize, DataTypes) => {
    const Statuses = sequelize.define('statuses', {
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
        modelName: 'Statuses',
    });

    return Statuses
}