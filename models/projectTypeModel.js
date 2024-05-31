'use strict';
 
 export default (sequelize, DataTypes) => {
     const ProjectType = sequelize.define('project_types', {
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
         modelName: 'ProjectType',
     });

     return ProjectType
}