const express = require("express");
const router = express.Router(); 
const User = require("../models/Users");


router.post("/register", (req, res) => {
    const user = new User({
        username:"octavio",
        email:"octa@gmail.com",
        password:"123456"
    })

    user.save();
    res.send("ok")
});

module.exports = router;
