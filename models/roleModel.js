'use strict';

export default (sequelize, DataTypes) => {
    const Role = sequelize.define('roles', {
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
        modelName: 'Roles',
    });
    return Role
}