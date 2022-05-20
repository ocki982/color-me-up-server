const express = require("express");
const app = express();
const http = require('http').createServer(app)
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");



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




const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})



http.listen(4000, function() {
  console.log('listening on port 4000')
})