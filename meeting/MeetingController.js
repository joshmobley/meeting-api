const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Meeting = require('./Meeting')
const mongoose = require('mongoose')
const hasSession = require('../middleware/hasSession')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post("/", hasSession, (req, res) => {
    const body = req.body;
    const newMeeting = new Meeting({
        _id: new mongoose.Types.ObjectId(),
        ...body
    });

    newMeeting.save().then( meeting => {
        res.send(meeting)
    }).catch( err => {
        res.status(400).send(err.message)
    })
})

router.get('/:id', hasSession, (req, res) => {
    const meetingId = req.params.id

    Meeting.findById(meetingId).populate('created_by').then( meeting => {
        res.send(meeting)
    }).catch( err => {
        res.status(400).send(err.message)
    })
})

router.get('/', hasSession, (req, res) => {
        Meeting.find().populate('created_by').then( meeting => {
            res.send(meeting)
        }).catch( err => {
            res.status(400).send(err.message)
        })
})

module.exports = router