const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvitationSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    sent_to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    meeting_id: { type: Schema.Types.ObjectId, ref: 'Meeting', required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    accepted_at: { type: Date },
    declined_at: { type: Date },
    deleted_at: { type: Date }
})

mongoose.model('Invitation', InvitationSchema)

module.exports = mongoose.model('Invitation')