const Sequelize = require('sequelize')
const sequelize = require('../db')
const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
    name: Sequelize.STRING,
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false, require: true }
})

User.prototype.validatePassword = function(offeredPassword) {
    return bcrypt.compare(offeredPassword, this.password)
}

module.exports = User
    


