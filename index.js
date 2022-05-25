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

dotenv.config();

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

const defaultUser = {
  id: "anon",
  name: "Anonymous",
};

const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  Post.find().then((result) => {
    socket.emit("output-messages", result);
  });
  socket.on("message", ({ text, emotion }) => {
    const message = {
      id: uuidv4(),
      user: defaultUser,
      text,
      emotion,
    };
    io.emit("message", message);
    const newMessage = new Post(message);
    newMessage.save()
  });
});

http.listen(4000, function () {
  console.log("listening on port 4000");
});
