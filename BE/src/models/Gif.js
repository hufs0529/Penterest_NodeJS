const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gifSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    caption: {
        type: String,
    },
    gifUrl : {
        type: String,
    },
    views : {
        type: Number,
        default: 0 
    },
    createdDate: {
        type: Date,
    },
})


const Gif = mongoose.model('Gif', gifSchema);

module.exports = { Gif }