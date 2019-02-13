//const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.load();
const Sequelize = require('sequelize')


const sequelize = new Sequelize('clearer_meetings', 'admin', 'uAl8m&CKPMILOD7U', {
    host: 'meetings-test.ctb4576y9mt2.us-west-2.rds.amazonaws.com',
    dialect: 'mysql'
});

module.exports = sequelize;
//const uri = process.env.MONGO_URL;

//mongoose.connect(uri).catch( err => console.log(err));