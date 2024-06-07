'use strict';
import { Sequelize } from 'sequelize';
import process from 'process';

const env = process.env.NODE_ENV || 'development';
import configJson from '../config/config.json' assert {type: "json"};
const config = configJson[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// MAIN MODULE
import User from './userModel.js';
import Role from './roleModel.js';
import Report from './reportsModel.js';
import Project from './projectModel.js';
import Development from './developmentModel.js';
import Backlog from './backlogModel.js';
import Optimization from './optimizationsModel.js';

// SYSTEM SETTINGS
import IssueType from './issueTypeModel.js';
import ProjectType from './projectTypeModel.js';
import Schedule from './scheduleModel.js';
import Statuses from './statusModel.js';
import SeverityType from './severityTypeModel.js';
import Device from './deviceModel.js';

db.User = User(sequelize, Sequelize.DataTypes);
db.Role = Role(sequelize, Sequelize.DataTypes);
db.Project = Project(sequelize, Sequelize.DataTypes);
db.Report = Report(sequelize, Sequelize.DataTypes);
db.Development = Development(sequelize, Sequelize.DataTypes);
db.Backlog = Backlog(sequelize, Sequelize.DataTypes);
db.Optimization = Optimization(sequelize, Sequelize.DataTypes);

db.IssueType = IssueType(sequelize, Sequelize.DataTypes);
db.ProjectType = ProjectType(sequelize, Sequelize.DataTypes);
db.Schedule = Schedule(sequelize, Sequelize.DataTypes);
db.Statuses = Statuses(sequelize, Sequelize.DataTypes);
db.SeverityType = SeverityType(sequelize, Sequelize.DataTypes);
db.Device = Device(sequelize, Sequelize.DataTypes);


// ==================
//* ASSOCIATIONS
// ==================

// Role -> User
db.User.belongsTo(db.Role, { foreignKey: 'role_id', sourceKey: 'id' });
db.Role.hasOne(db.User, { foreignKey: 'role_id', sourceKey: 'id' });

// User -> Report
db.Report.belongsTo(db.User, { foreignKey: 'user_id', sourceKey: 'id' });
db.User.hasOne(db.Report, { foreignKey: 'user_id', sourceKey: 'id' });

// (Statuses && User) -> Development 
db.Development.belongsToMany(db.User, { through: 'DevelopmentUsers', sourceKey: 'id' });
db.User.hasOne(db.Development, { through: 'DevelopmentUsers', sourceKey: 'id' });
db.Development.belongsTo(db.Statuses, { foreignKey: 'status_id', sourceKey: 'id' });
db.Statuses.hasOne(db.Development, { foreignKey: 'status_id', sourceKey: 'id' });

// TODO: ASSOC FOR PROJECT AND OTHER MAIN MODULES

export default db;