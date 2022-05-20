const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
      },
      comment: {
        type: String,
        required: true,
        max: 500,
      },
      emotion:{
          type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);