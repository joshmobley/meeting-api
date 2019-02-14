const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const passport = require('passport')
const hasSession = require('../middleware/hasSession')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const authAction = (req, res) => {
    res.status(200).send({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    })
}

const loginAction = (req, res) => {
    res.status(200).send({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name 
    })
}

const logoutAction = (req, res) => {
    req.logout();
    res.status(200).send('logout successful');
}

router.get('/', hasSession, authAction)
router.post('/login', passport.authenticate('local'), loginAction)
router.get('/logout', logoutAction)

module.exports = router