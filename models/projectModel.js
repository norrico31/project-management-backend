'use strict';

export default (sequelize, DataTypes) => {
    const Project = sequelize.define('projects', {
        // TODO project_id allowaNull: true
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
        lead_dev: {
            type: DataTypes.JSON,
            // type: DataTypes.UUID,
            // allowNull: true,
            // references: {
            //     model: 'users',
            //     key: 'id',
            // },
            // onUpdate: 'CASCADE',
            // onDelete: 'SET NULL'
        },
        devs: {
            type: DataTypes.JSON,
        },
        qa: {
            type: DataTypes.JSON,
        },
        dev_sched: {
            type: DataTypes.STRING,
        },
        total_working_hrs: {
            type: DataTypes.INTEGER,
        },
        actual_working_hrs: {
            type: DataTypes.INTEGER,
        },
        agency_review: {
            type: DataTypes.STRING,
        },
        design_link: {
            type: DataTypes.STRING,
        },
        client_review: {
            type: DataTypes.STRING,
        },
        site_launched: {
            type: DataTypes.DATE,
        },
        cms_doc: {
            type: DataTypes.STRING,
        },
        stage_wpe_acct: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },
        stage_git_username: {
            type: DataTypes.STRING,
        },
        stage_git_password: {
            type: DataTypes.STRING,
        },
        stage_wp_admin_username: {
            type: DataTypes.STRING,
        },
        stage_wp_admin_password: {
            type: DataTypes.STRING,
        },
        stage_basic_auth_username: {
            type: DataTypes.STRING,
        },
        stage_basic_auth_password: {
            type: DataTypes.STRING,
        },
        stage_branch: {
            type: DataTypes.STRING,
        },
        stage_pipelines: {
            type: DataTypes.STRING,
        },
        prod_git_username: {
            type: DataTypes.STRING,
        },
        prod_git_password: {
            type: DataTypes.STRING,
        },
        prod_wp_admin_username: {
            type: DataTypes.STRING,
        },
        prod_wp_admin_password: {
            type: DataTypes.STRING,
        },
        prod_basic_auth_username: {
            type: DataTypes.STRING,
        },
        prod_basic_auth_password: {
            type: DataTypes.STRING,
        },
        prod_branch: {
            type: DataTypes.STRING,
        },
        prod_pipelines: {
            type: DataTypes.STRING,
        },
        client_site_name: {
            type: DataTypes.STRING,
        },
        client_url: {
            type: DataTypes.STRING,
        },
        client_username: {
            type: DataTypes.STRING,
        },
        client_password: {
            type: DataTypes.STRING,
        },
        client_site_name2: {
            type: DataTypes.STRING,
        },
        client_url2: {
            type: DataTypes.STRING,
        },
        client_username2: {
            type: DataTypes.STRING,
        },
        client_password2: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: true,
        sequelize,
        modelName: 'Projects',
    });
    return Project
}