'use strict';

export default (sequelize, DataTypes) => {
    const Development = sequelize.define('optimizations', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        project_id: {
            type: DataTypes.UUID,
            references: {
                model: 'projects',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gt_metrix_score_a: {
            type: DataTypes.STRING,
        },
        desktop_90: {
            type: DataTypes.STRING,
        },
        desktop_80: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        date_tested: {
            type: DataTypes.DATE,
        },
        notes: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: true,
        sequelize,
        modelName: 'Optimizations',
    });
    return Development
}