'use strict';

export default (sequelize, DataTypes) => {
    const SeverityType = sequelize.define('severity_types', {
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
        modelName: 'SeverityType',
    });
    return SeverityType
}