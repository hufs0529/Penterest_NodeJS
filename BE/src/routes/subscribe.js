const express = require('express');
const router = express.Router();


const { Subscriber } = require("../models/Subscriber");


router.post("/subscribeNumber", (req, res) => {
    // Subscriber Schema 중 어떠한 유저에 일치하는 객체 수 추출
    Subscriber.find({ "userTo": req.body.userTo })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err)

        res.status(200).json({ success: true, subscribeNumber: subscribe.length  })
    })

});



router.post("/subscribed", (req, res) => {
    // Subscriber Schema에 구독 From To 관계 조회
    Subscriber.find({ "userTo": req.body.userTo , "userFrom": req.body.userFrom })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(subscribe.length !== 0) {
            result = true
        }

        res.status(200).json({ success: true, subcribed: result  })
    })

});



router.post("/subscribe", (req, res) => {

    const subscribe = new Subscriber(req.body);
    // 새 Subscribe 객체 생성해서 저장
    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/unSubscribe", (req, res) => {

    console.log(req.body)

    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({ success: false, err});
            res.status(200).json({ success: true, doc })
        })
});



module.exports = router;