const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authenticate = require("../middleware/authenticate");
const { postEmotion } = require("../api/emotions");

// Post a new message
router.post("/", async (req, res) => {
  try {
    const emotion = await postEmotion(req.body.text);
    res.status(200).send(emotion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a message if user is logged in (not used yet)
router.delete("/delete", authenticate, async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.user._id });
    res.status(200).send("Post has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Like a comment (not used yet)
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.user)) {
      await post.updateOne({ $push: { likes: req.body.user } });
      res.status(200).json("The post has been liked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comments for user
router.get("/user/all", authenticate, (req, res) => {
  try {
    Post.find({ user: req.user.username }, function (_err, users) {
      res.send(users);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all comments
router.get("/all", (_req, res) => {
  try {
    Post.find({}, function (_err, users) {
      res.send(users);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
