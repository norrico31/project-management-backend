# Project Management (Backend)

Simple overview of use/purpose.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependency Tools

* Nodejs Express
* Sequelize ORM (MySQL)

### Installing

* Forked the repository
```
git clone https://github.com/norrico31/project-management-backend.git
```
* cd into the repo
* Install node_modules
```
npm install
```

### Setup the config.json file for database connection

### NOTE
* This app automatically create database based on your configuration (No configuration complexity). 
* Run (Xampp / Wampp / Laragon) for Mysql localhost server
* Check the username, password and port of localhost server for sequelize config.json
* Create .env file and setup config base on your local server (see .env.sample)
* Go to config.json and name your database.


### Database scripts
* DROP database 
```
npm run db:drop
```
* CREATE database 
```
npm run db:create
```
* Migration
```
npm run db:migrate
```
* Undo migration
```
npm run db:migrate:undo
```
* Seeder
```
npm run db:seed
```
* Undo seed
```
npm run db:seed:undo
```
* RESET DATABASE ALL (MIGRATIONS AND SEEDERS)
```
npm run reset-db
```

### Executing program
* To run the program
```
npm run dev
```
* To run the program in production (MUST SETUP IN HOST CONFIGURATION)
```
npm run start
```
<!-- 
## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
``` -->

## Authors

Contributors names and contact info

Bricksoft Web Solutions