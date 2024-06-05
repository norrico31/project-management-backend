'use strict';
 
 export default (sequelize, DataTypes) => {
    const ProjectType = sequelize.define('project_types', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        description: {
             type: DataTypes.STRING,
        },
     }, {
         timestamps: true,
         sequelize,
         modelName: 'ProjectType',
     });

     return ProjectType
}