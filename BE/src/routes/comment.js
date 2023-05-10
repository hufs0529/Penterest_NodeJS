const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");


// 댓글 저장하기
router.post("/saveComment", (req, res) => {

    // req 바탕으로 comment 생성
    const comment = new Comment(req.body)
    // comment 저장해주기
    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })
        // 그냥 populate하면 _id만 가져오므로 금방 생성한 comment id의 writer을 가져와야 한다
        Comment.find({ '_id': comment._id })
            // comment에 writer값 포함
            .populate('writer')
            // exec을 통해 result 저장
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
/* '무'상태에서 writer정보를 포함하는 Gif 업로드와는 다르게 Comment의 경우 기존 존재하는 '유'상태의 객체에 업로드 하므로 Comment.find 과정 필요  */
})

// 댓글 가져오기
router.post("/getComments", (req, res) => {
    // 
    Comment.find({ "postId": req.body.gifId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});




module.exports = router;