const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const async = require('async');


router.get('/auth', auth, async (req, res, next) => {

    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })
})

router.post('/Signup', async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        // 존재하는 유저인지 체크
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Auth failed, email not found");
        }
        // 비밀번로가 올바른 것인지 체크
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send('Wrong password');
        }
        const payload = {
            userId: user._id.toHexString(),
        }
        // token을 생성
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.json({ user, accessToken })
    } catch (error) {
        next(error)
    }
})

router.post("/history", auth, async (req, res) => {
    try {
      const gif = await Gif.findOne({ _id: req.body.gifId });
      if (!gif) {
        return res.status(404).send("GIF not found");
      }
  
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const queueItem = { gif: gif };
      if (user.history.length > 5) {
        user.history.pop();
      }else {
        user.history.unshift(queueItem);
      }
      await user.save();
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  });
  
  
router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


module.exports = router