const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const hasSession = require('../middleware/hasSession')
const belongsToUser = require('../scopes/actions/belongsToUser')
const Meeting = require('../models/Meeting')
const User = require('../models/User')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

Meeting.sync()

router.post("/", hasSession, (req, res) => {
    const body = req.body;
    Meeting.create({
        ...body,
        user_id: req.user.id
    })
    .then( meeting => res.send(meeting))
    .catch( err => res.status(401).send(err.message));
})

router.get('/:id', hasSession, (req, res) => {
    const meetingId = req.params.id

    Meeting.scope(belongsToUser(req.user.id))
        .findAll({
            where: { 
                id: meetingId
            },
            include: [{
                model: User,
                attributes: [ 'name' ],
            }]
        })
        .then( meeting => {
            res.send(meeting)
        })
        .catch( err => {
            res.status(400).send(err.message)
        })
})

router.get('/', hasSession, (req, res) => {
    Meeting
        .scope(belongsToUser(req.user.id))
        .findAll({ 
            include: [{
                model: User,
                attributes: [ 'name' ],
            }]
        })
        .then( meeting => {
            res.send(meeting)
        })
        .catch( err => {
            res.status(400).send(err.message)
        })
})

module.exports = router