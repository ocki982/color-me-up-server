const express = require("express");
const router = express.Router();
const { postEmotion } = require("../api/emotions");

router.post("/", async (req, res) => {
  try {
    const emotion = await postEmotion(req.body.text);
    res.status(200).send(emotion);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { router };
