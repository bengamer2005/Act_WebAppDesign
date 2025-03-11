const mongoose = require("mongoose");
const User = require("./User");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Post", PostSchema);
