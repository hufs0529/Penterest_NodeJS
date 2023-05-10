const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       default: null
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment',
   },
   gifId: {
       type: Schema.Types.ObjectId,
       ref: 'Gif',
   }

}, { timestamps: true })


const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }