'use strict';

export default (sequelize, DataTypes) => {
    const Statuses = sequelize.define('statuses', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
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