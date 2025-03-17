const mongoose = require("mongoose")

const temaSchema = new mongoose.Schema({

    tema: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Tema", temaSchema);