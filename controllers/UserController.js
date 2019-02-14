const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/User')
const hasSession = require('../middleware/hasSession')
const bcrypt = require('bcrypt')
const asyncAction = require('../utils/asyncAction')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

User.sync()

const createUser = async (req, res) => {
    const body = req.body;
    
    const findExistingUser = User.findOne({ where: { email: body.email }})
    const userExists = await asyncAction(req, res, findExistingUser)

    if( userExists ) res.status(401).send('User already exists with this email address')
    
    const createUser = User.create({
        ...body,
        password: await bcrypt.hash(body.password, 10)
    })
    const newUser = await asyncAction(req, res, createUser)

    res.send(newUser)
}

const getUser = async (req, res) => {
    const userId = req.params.id
    const findUser = User.findByPk(userId)
    const user = await asyncAction(req, res, findUser)

    res.send(user)
}

router.post('/', createUser)
router.get('/:id', hasSession, getUser)

module.exports = router