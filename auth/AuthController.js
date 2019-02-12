const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const passport = require('passport')
const hasSession = require('../middleware/hasSession')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name 
    })
})

router.get('/', hasSession, (req,res) =>{
    res.status(200).send({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    })
})

router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).send('logout successful');
})

module.exports = router