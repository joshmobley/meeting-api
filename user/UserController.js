const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('./User')
const mongoose = require('mongoose')
const hasSession = require('../middleware/hasSession')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/', (req, res) => {
    const body = req.body;
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        ...body
    })

    newUser.save().then( user => {
        res.send(user)
    }).catch( err => {
        res.status(400).send(err.message)
    })
})

router.get('/:id', hasSession, (req, res) => {
    const userId = req.params.id

    User.findById(userId).then( user => {
        res.send(user);
    }).catch( err => {
        res.status(400).send(err.message)
    })
})

module.exports = router