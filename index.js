const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { userRoute, authRoute, postRoute, emotionsRoute } = require("./routes");
const Post = require("./models/Post");
const uuidv4 = require("uuid").v4;

// Configuration
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// Mongoose middleware to connect to the Mongo DB
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Routes
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/emotions", emotionsRoute);

// Connecting to socket server (must match with frontend)
const io = new Server(http, {
  cors: {
    origin: process.env.FRONT_LOCAL_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Gets messages to render on the HomePage (on the socket)
io.on("connection", (socket) => {
  Post.find().then((result) => {
    socket.emit("output-messages", result);
  });
  // Send the new messages to the Data Base
  socket.on("message", ({ text, emotion, user }) => {
    const message = {
      id: uuidv4(),
      user,
      text,
      emotion,
    };
    io.emit("message", message);
    const newMessage = new Post(message);
    newMessage.save();
  });
});

http.listen(process.env.PORT, () => {
  console.log("listening on port 4000");
});
