const express = require("express");
const router = express.Router(); 
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


// Register
router.post("/register", (req, res) => {
try{
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("Please enter the required fields.");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

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

// Login
router.post("/login", async (req, res) => {
 
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword =  await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password");

    if (user) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
        },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
      );

      return res.json({ status: "ok", user: token})
    } else {
      return res.json({ status: "error", user: false})
    }

});


module.exports = router;
