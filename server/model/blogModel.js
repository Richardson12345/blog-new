var mongoose = require('mongoose')
var Schema = mongoose.Schema

var blogSchema = new Schema ({
    imgUrl: {
        type: String,
        required: true
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

var blogModel = mongoose.model('Blog', blogSchema)

module.exports = blogModel
// module.exports = blogSchema;
