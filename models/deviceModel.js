'use strict';

export default (sequelize, DataTypes) => {
    const Devices = sequelize.define('devices', {
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
        modelName: 'Devices',
    });
    return Devices
}