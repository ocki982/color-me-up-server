const express = require("express");
const router = express.Router(); 
const User = require("../models/Users");
const bcrypt = require("bcrypt");


router.post("/register", (req, res) => {
try{
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("Please enter the required fields.");
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
    });

    newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
