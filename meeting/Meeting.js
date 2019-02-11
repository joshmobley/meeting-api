const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MeetingSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    agenda_items: [{ type: Schema.Types.ObjectId, ref: 'Agenda' }],
    invitation_items: [{ type: Schema.Types.ObjectId, ref: 'Invitation' }],
    title: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now }
})

mongoose.model('Meeting', MeetingSchema)

module.exports = mongoose.model('Meeting')