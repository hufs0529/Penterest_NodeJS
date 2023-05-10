const express = require('express');
const router = express.Router();

const { Gif } = require("../models/Gif");
//const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");



router.post("/uploadGif", async(req, res, next) => {
    try {
        const gif = new Gif(req.body);
        await gif.save();
        return res.sendStatus(200);
    } catch (error) {
        next(error)
    }
})


// 개인이 업로드한 Gif 노출
router.get("/getGifs", (req, res) => {

    Gif.find()
        .populate('writer')
        .exec((err, Gifs) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, Gifs })
        })

});

// 유저가 구독한 다른 유저 노출
router.post("/getSubscriptionGifs", (req, res) => {

    // userFrom을 통해서 어떤 유저부터로의 구독인지    
    Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscribers)=> {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i)=> {
            // userTo를 통해 리스트에 구독중인 유저 넣기 
            subscribedUser.push(subscriber.userTo)
        })

        // Gif 생성의 주체가 리스트에 있는지 확인하고
        Gif.find({ writer: { $in: subscribedUser }})
            .populate('writer')
            // 주체들이 생성한 Gif들 반환
            .exec((err, gifs) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, gifs })
            })
    })
});

router.post("/upView", async (req, res) => {
    try {
      const gif = await Gif.findOne({ '_id': req.body.gifId });
      if (!gif) {
        return res.status(404).send("GIF not found");
      }
    
      await gif.save();
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });

router.get('/:id/views', async(req, res) => {
    try {
        const { id } = req.params;
        const gif = await Gif.findById(id);
        if (!gif) {
            return res.status(404).json({ success: false, error: 'GIF not found' });
          }
          return res.status(200).json({ success: true, views: gif.views });

    } catch (error) {
        console.error(erro);
        res.status(500).json({success: false, error: 'Server error'});
    }
})

module.exports = router;