'use strict';

export default (sequelize, DataTypes) => {
    const IssueType = sequelize.define('issue_types', {
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
        modelName: 'IssueType',
    });
    return IssueType
}