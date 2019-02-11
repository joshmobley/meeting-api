const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Agenda = require('./Agenda')
const mongoose = require('mongoose')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post("/", (req, res) => {
    const body = req.body;
    const newAgenda = new Agenda({
        _id: new mongoose.Types.ObjectId(),
        ...body
    })

    newAgenda.save().then( agenda => {
        res.send(agenda);
    }).catch( err => {
        res.status(400).send(err.message)
    })
})

module.exports = router