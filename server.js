const express = require('express')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')

require('./db')

const corsOptions = {

  origin: 'http://localhost:3001',
  credentials: true
  
}

const app = express()
app.use(cors(corsOptions))

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize())
app.use(passport.session())

require('./passport')

// const AgendaController = require('./agenda/AgendaController')
const AuthController = require('./controllers/AuthController')
const MeetingController = require('./controllers/MeetingController')
const UserController = require('./controllers/UserController')

// app.use('/agenda', AgendaController)
app.use('/auth', AuthController)
app.use('/meeting', MeetingController)
app.use('/user', UserController)

app.listen(3000)

