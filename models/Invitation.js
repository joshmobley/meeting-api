const Sequelize = require('sequelize')
const sequelize = require('../db')
const Meeting = require('./Meeting')
const User = require('./User')
const belongsToUser = require('../scopes/definitions/belongsToUser')
const sentToUser = require('../scopes/definitions/sentToUser')

const Invitation = sequelize.define('invitation', {
    accepted_at: { type: Sequelize.DATE },
    declined_at: { type: Sequelize.DATE }
}, {
    underscored: true,
    scopes: [
        belongsToUser,
        sentToUser
    ]
})

Invitation.belongsTo(Meeting)
Invitation.belongsTo(User)
Invitation.belongsTo(User, { as: 'recipient' })

module.exports = Invitation