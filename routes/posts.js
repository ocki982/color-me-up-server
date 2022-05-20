const express = require("express");
const router = express.Router(); 
const Post = require("../models/Post");
const authenticate = require('../middleware/authenticate');

// post a new comment

router.post("/", (req, res) => {
    const newPost = new Post(req.body);
    try {
        newPost.save();
        res.status(200).send("Posted!");
    } catch (err) {
      res.status(500).json(err);
    }
  });


// delete a post if user is logged in

router.delete("/delete", authenticate, async (req, res) => {
    try {
      await Post.deleteOne({ user: req.user.username});
      res.status(200).send("Post has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
});

// like a comment

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

// get all comments

module.exports = router;