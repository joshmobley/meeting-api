const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../User/User')

const Meeting = sequelize.define('meeting', {
    title: { type: Sequelize.STRING, allowNull: false },
    start_time: { type: Sequelize.DATE, allowNull: false },
    end_time: { type: Sequelize.DATE, allowNull: false }
})

Meeting.belongsTo(User)

module.exports = Meeting
