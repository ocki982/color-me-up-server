const express = require("express");
const router = express.Router(); 
const Post = require("../models/Post");

router.post("/", (req, res) => {
    const newPost = new Post(req.body);
    try {
        newPost.save();
        res.status(200).send("Posted!");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;