//const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.load();
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_ENDPOINT,
    dialect: process.env.DB_DIALECT
});

module.exports = sequelize;