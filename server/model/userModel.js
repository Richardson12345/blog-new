var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
})

var userModel = mongoose.model('User', userSchema)

module.exports = userModel