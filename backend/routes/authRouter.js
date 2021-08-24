const express = require('express')
const router = express.Router()
const UserSchema = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Sign-in
router.post("/signin", async (req, res, next) => {
  user = await UserSchema.findOne({ gsm: req.body.gsm })
  if (!user) {
    res.status(201).json({ status: false, msg: process.env.msgUserAuthNotFindFr })
    return
  }

  if (!user.banned) {
    res.status(201).json({ status: false, msg: process.env.msgUserBanned })
    return
  }

  passwordCompare = await bcrypt.compare(req.body.password, user.password)
  if (!passwordCompare) {
    res.status(201).json({ status: false, msg: process.env.msgPasswordCompare })
    return
  } else {
    user['password'] = undefined;
    user = JSON.parse(JSON.stringify(user));
  }

  if (user && passwordCompare) {
    let jwtToken = jwt.sign({ gsm: user.gsm, userId: user._id }, process.env.SecrectCodeJwt, { expiresIn: '7d' });
    res.status(200).json({
      token: jwtToken,
      expiresIn: 3600,
      data: user,
      status: true
    });
  }

});

//Verify Connexion
router.post("/verifyToken", async (req, res, next) => {
  try {
 
    res.status(201).json(jwt.verify(req.body.token, process.env.SecrectCodeJwt));
  } catch (error) {
    res.status(201).json(false);
  }
})


router.post("/verifyUserBanned", async (req, res, next) => {
  try {

    user = await UserSchema.findOne({ gsm: req.body.gsm })
    if (!user) {
      res.status(201).json({ status: false, msg: process.env.msgUserAuthNotFindFr })
      return
    }

    if (!user.banned) {
      res.status(201).json({ status: false, msg: process.env.msgUserBanned })
      return
    }

  } catch (error) {
    res.status(201).json({ status: false});
  }
})




module.exports = router