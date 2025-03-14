const mongoose = require("mongoose");

const SuperheroSchema = new mongoose.Schema({

    superheroName: { 
        type: String, 
        required: true 
    },

    superheroRealName: { 
        type: String, 
        required: true 
    },

    superheroUrl: { 
        type: String, 
        required: true, 
    },

    superheroInfo: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model("Superhero", SuperheroSchema);