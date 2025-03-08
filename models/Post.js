const mongoose = require('mongoose');
const User = require('./User')

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, // Asegura que sea ObjectId
        ref: "User", // Asegura que referencia a la colección 'users'
        required: true
    }
});


module.exports = mongoose.model('Post', PostSchema);
