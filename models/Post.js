const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    id: {
        type: Object,
        require: true,

        user: {
          type: Object,
          require: true,
        },

        text: {
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
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);