const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Invitation = require('./Invitation')
const mongoose = require('mongoose')
const hasSession = require('../middleware/hasSession')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post("/", hasSession, (req, res) => {
    const body = req.body;
    const newInvitation = new Invitation({
        _id: new mongoose.Types.ObjectId(),
        ...body
    })

    newInvitation.save().then( agenda => {
        res.send(agenda);
    }).catch( err => {
        res.status(400).send(err.message)
    })
})

module.exports = router