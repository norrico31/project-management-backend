'use strict';

export default (sequelize, DataTypes) => {
    const SeverityType = sequelize.define('severity_types', {
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
        modelName: 'SeverityType',
    });
    return SeverityType
}