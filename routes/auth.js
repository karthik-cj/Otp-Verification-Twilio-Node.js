const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const accountSid = "Paste Your Twilio AccountSid Here";
const authToken = "Paste Your Twilio AuthToken Here";
const client = require("twilio")(accountSid, authToken);

let OTP, user;
authRouter.post("/signup", async (req, res) => {
  try {
    const { username, number } = req.body;

    const existingUser = await User.findOne({ number });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same number already exists!" });
    }

    user = new User({
      username,
      number,
    });

    let digits = "0123456789";
    OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    await client.messages
      .create({
        body: `Your otp verification for VEcare user ${username} is ${OTP}`,
        messagingServiceSid: "Paste Your Twilio MessagingServiceSid Here",
        to: `+91${number}`,
      })
      .then(() => res.status(200).json({ msg: "Message Sent" }))
      .done();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/signup/verify", async (req, res) => {
  try {
    const { otp } = req.body;
    if (otp != OTP) {
      return res.status(400).json({ msg: "Incorrect Otp." });
    }
    user = await user.save();
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.status(200).json({ token, ...user._doc });
    OTP = "";
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

let signinUser;
authRouter.post("/signin", async (req, res) => {
  try {
    const { number } = req.body;

    signinUser = await User.findOne({ number });
    if (!signinUser) {
      return res.status(400).json({ msg: "This number does not Exists!!!" });
    }

    let digits = "0123456789";
    OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    await client.messages
      .create({
        body: `Your otp verification for VEcare user ${signinUser.username} is ${OTP}`,
        messagingServiceSid: "Paste Your Twilio MessagingServiceSid Here",
        to: `+91${number}`,
      })
      .then((message) => res.status(200).json({ msg: "Message Sent" }))
      .done();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/signin/verify", async (req, res) => {
  try {
    const { otp } = req.body;
    if (otp != OTP) {
      return res.status(400).json({ msg: "Incorrect Otp." });
    }
    const token = jwt.sign({ id: signinUser._id }, "passwordKey");
    res.status(200).json({ token, ...signinUser._doc });
    OTP = "";
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
