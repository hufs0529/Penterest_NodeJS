const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }, 
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Gif'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    content: {
        type: String
    }

}, { timestamps: true })


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }