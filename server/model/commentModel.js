var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

var commentModel = mongoose.model('Comment', commentSchema)
module.exports = commentModel