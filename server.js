
const dotenv = require('dotenv')
const express = require('express')
dotenv.load();
require('./db')

const app = express()

const AgendaController = require('./agenda/AgendaController')
const MeetingController = require('./meeting/MeetingController')
const UserController = require('./user/UserController')

app.use('/agenda', AgendaController)
app.use('/meeting', MeetingController)
app.use('/user', UserController)

app.listen(3000)

