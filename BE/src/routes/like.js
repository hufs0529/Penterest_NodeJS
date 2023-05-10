const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


router.post("/getLikes", (req, res) => {

    let variable = {}
    // request된 것이 gifId라면
    if (req.body.gifId) {
        // 프론트에서 gifId로 설정
        variable = { gifId: req.body.gifId }
    // request된 것이 commentId라면        
    } else {
        variable = { commentId: req.body.commentId }
    }
    // gifId 혹은 commentId로 조회
    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })


})


router.post("/getDislikes", (req, res) => {

    let variable = {}
    // request된 것이 gifId라면    
    if (req.body.gifId) {
        variable = { gifId: req.body.gifId }
    // request된 것이 commentId라면
    } else {
        variable = { commentId: req.body.commentId }
    }
    // gifId 혹은 commentId로 조회
    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })

})


router.post("/upLike", (req, res) => {

    let variable = {}
    if (req.body.gifId) {
        variable = { gifId: req.body.gifId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }
    
    const like = new Like(variable)
    // like 정보 저장
    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err });
        // Dislike이 이미 클릭되있다면, Dislike 1 감소
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })

})

router.post("/unLike", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }
    // 변경된 like 정보
    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })

})


router.post("/unDisLike", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })
    })


})



router.post("/upDisLike", (req, res) => {

    let variable = {}
    if (req.body.videoId) {
        variable = { videoId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId , userId: req.body.userId }
    }

    const disLike = new Dislike(variable)
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err });
        // Like이 이미 클릭되있다면, Like 1 감소
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if (err) return res.status(400).json({ success: false, err });
                res.status(200).json({ success: true })
            })
    })


})
module.exports = router;