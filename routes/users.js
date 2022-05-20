const express = require("express");
const router = express.Router(); 
const authenticate = require('../middleware/authenticate');
const User = require("../models/Users");


// get a user

router.get('/:id', authenticate, async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;
