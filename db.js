
const dotenv = require('dotenv')
const Sequelize = require('sequelize')

dotenv.load();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_ENDPOINT,
    dialect: process.env.APP_ENV === 'test' ? 'sqlite' : process.env.DB_DIALECT
});

module.exports = sequelize;