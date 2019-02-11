const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true, minlength: 10, unique: true },
    password: { type: String, required: true },
    meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
    created_at: { type: Date, default: Date.now }
})

UserSchema.methods = {
    verifyPassword: function(password) {
        return bcrypt.compare(password, this.password)
    }
}

UserSchema.pre('save', function(next) {
    console.log('pre save');
    console.log(this.password)
    const plaintext = this.password;
    bcrypt.hash(plaintext, 10, (err, hash) => {
        console.log(hash);
        this.password = hash;
        next();
    })
})



mongoose.model('User', UserSchema)


module.exports = mongoose.model('User')