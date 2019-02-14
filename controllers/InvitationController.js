const asyncAction = require('../utils/asyncAction')
const createResource = require('../utils/createResource')
const Invitation = require('../models/Invitation')
const User = require('../models/User')

const belongsToUser = require('../scopes/actions/belongsToUser')
const sentToUser = require('../scopes/actions/sentToUser')


Invitation.sync()

const findRecipient = async (req, res, emailAddress) => {
    const findRecipient = User.find({ where: { email: emailAddress } })
    return await asyncAction(req, res, findRecipient)
}

const readAll = async (req, res) => {
    const findAllInvitations = Invitations.findAll()
    const allInvitations = await asyncAction(req, res, findAllInvitations)
    res.send(allInvitations)
}

const create = async (req, res) => {
    const body = req.body;

    const recipient = findRecipient(req, res, body.recipient_email)
    if(!recipient) res.status(400).send('no recipient found at that email address')

    const createInvitation = Invitation.create({
        meeting_id: body.meeting_id,
        recipient_id: recipient.id,
        user_id: req.user.id
    })  
    const newInvitation = await asyncAction(req, res, createInvitation)

    res.send(newInvitation);
}

const read = async (req, res) => {
    const findInvitation = Invitation.find(req.params.id)
    const invitation = await asyncAction(req, res, findInvitation)
    res.send(invitation)
}

const update = async (req, res) => {
    const updateData = req.body;

    const action = Invitation.findByPk(req.params.id)
    const invitation = await asyncAction(req, res, action)

    if( updateData.recipient_email ) {
        const recipient = await findRecipient(req, res, updateData.recipient_email)
        if(!recipient) res.status(400).send('no recipient found at that email address')
        updateData['recipient_id'] = recipient.id
    }

    const updateInvitation = invitation.update({ 
        ...updateData
    })
    const updatedInvitation = await asyncAction(req, res, updateInvitation)
    res.send(updatedInvitation)
}

const del = async (req, res) => {
    const action = Invitation.scope(belongsToUser(req.user.id)).findByPk(req.params.id)
    const invitation = await asyncAction(req, res, action)
    invitation.destroy()
    res.send('invitation deleted')
}

const routes = createResource(
    readAll,
    create,
    read,
    update,
    del
)

module.exports = routes