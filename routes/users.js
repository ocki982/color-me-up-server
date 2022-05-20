const express = require("express");
const router = express.Router(); 
const authenticate = require('../middleware/authenticate');
const User = require("../models/Users");


// get a user

router.get('/current', authenticate, async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        // filters password and unrelated data on response
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
});

// delete user

router.delete("/delete", authenticate, async (req, res) => {
      try {
        await User.deleteOne({ _id: req.user._id });
        res.status(200).send("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
  });

module.exports = router;
