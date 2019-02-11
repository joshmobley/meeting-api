const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AgendaSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    meeting_id: { type: Schema.Types.ObjectId, ref: 'Meeting', required: true },
    assigned_to: { type: Schema.Types.ObjectId, ref: 'User' },
    start_time: { type: Date },
    end_time: { type: Date },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now }
})

mongoose.model('Agenda', AgendaSchema)

module.exports = mongoose.model('Agenda')