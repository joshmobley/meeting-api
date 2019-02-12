const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.load();

const uri = process.env.MONGO_URL;

mongoose.connect(uri).catch( err => console.log(err));