const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const passport = require('passport')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send('auth successful')
})

module.exports = router