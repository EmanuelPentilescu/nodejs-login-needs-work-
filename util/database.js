const dotenv= require("dotenv");
dotenv.config({path: './.env'});

const Sequelize = require('sequelize');

// --- DATA BASE CONNECTION ---
const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST
});

module.exports = sequelize;
