const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
    created_at: { type: Date, default: Date.now }
})

mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')