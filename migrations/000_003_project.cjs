'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
		unique: true,
    },
	lead_dev: {
		type: Sequelize.UUID,
		allowNull: true,
		references: {
			model: 'users',
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL'
	},
    devs: {
		type: Sequelize.JSON,
	},
	qa: {
		type: Sequelize.JSON,
	},
	dev_sched: {
		type: Sequelize.STRING,
	},
	total_working_hrs: {
		type: Sequelize.INTEGER,
	},
	actual_working_hrs: {
		type: Sequelize.INTEGER,
	},
	agency_review: {
		type: Sequelize.STRING,
	},
	design_link: {
		type: Sequelize.STRING,
	},
	client_review: {
		type: Sequelize.STRING,
	},
	site_launched: {
		type: Sequelize.DATE,
	},
	cms_doc: {
		type: Sequelize.STRING,
	},
	stage_wpe_acct: {
		type: Sequelize.STRING,
	},
	url: {
		type: Sequelize.STRING,
	},
	stage_git_username: {
		type: Sequelize.STRING,
	},
	stage_git_password: {
		type: Sequelize.STRING,
	},
	stage_wp_admin_username: {
		type: Sequelize.STRING,
	},
	stage_wp_admin_password: {
		type: Sequelize.STRING,
	},
	stage_basic_auth_username: {
		type: Sequelize.STRING,
	},
	stage_basic_auth_password: {
		type: Sequelize.STRING,
	},
	stage_branch: {
		type: Sequelize.STRING,
	},
	stage_pipelines: {
		type: Sequelize.STRING,
	},
	prod_git_username: {
		type: Sequelize.STRING,
	},
	prod_git_password: {
		type: Sequelize.STRING,
	},
	prod_wp_admin_username: {
		type: Sequelize.STRING,
	},
	prod_wp_admin_password: {
		type: Sequelize.STRING,
	},
	prod_basic_auth_username: {
		type: Sequelize.STRING,
	},
	prod_basic_auth_password: {
		type: Sequelize.STRING,
	},
	prod_branch: {
		type: Sequelize.STRING,
	},
	prod_pipelines: {
		type: Sequelize.STRING,
	},
	client_site_name: {
		type: Sequelize.STRING,
	},
	client_url: {
		type: Sequelize.STRING,
	},
	client_username: {
		type: Sequelize.STRING,
	},
	client_password: {
		type: Sequelize.STRING,
	},
	client_site_name2: {
		type: Sequelize.STRING,
	},
	client_url2: {
		type: Sequelize.STRING,
	},
	client_username2: {
		type: Sequelize.STRING,
	},
	client_password2: {
		type: Sequelize.STRING,
	},
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') 
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};