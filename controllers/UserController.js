const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/User')
const hasSession = require('../middleware/hasSession')
const bcrypt = require('bcrypt')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

User.sync()

router.post('/', async (req, res) => {
    const body = req.body;
    
    const userExists = await User.findOne({ where: { email: body.email }})

    if( userExists ) {
        res.status(401).send('User already exists with this email address')
    } else {
        User.create({
            ...body,
            password: await bcrypt.hash(body.password, 10)
        })
        .then( user => res.send(user) )
        .catch( err => res.status(401).send(err.message) )
    }
    
    
})

router.get('/:id', hasSession, (req, res) => {
    const userId = req.params.id

    User.findByPk(userId).then( user => {
        res.send(user);
    }).catch( err => {
        res.status(400).send(err.message)
    })
})

module.exports = router