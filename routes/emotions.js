const express = require("express");
const router = express.Router();
const { parseEmotionToColor } = require("../utils");
const { postEmotion } = require("../api/emotions");

// Calls the API to get back the emotion array to then
// parse it into a single color (closest emotion detected)
router.post("/", async (req, res) => {
  try {
    let emotions = await postEmotion(req.body.text);
    console.log(emotions);
    emotions = JSON.parse(emotions);
    const emotion = parseEmotionToColor(emotions.emotion);
    res.status(200).send(emotion);
  } catch {
    res.status(500);
  }
});

module.exports = router;
