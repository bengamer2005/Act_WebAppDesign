const mongoose = require("mongoose")

const actividadSchema = new mongoose.Schema({

    tipoActividad: {
        type: String,
        required: true 
    },

    calificacion: {
        type: Number,
        required: true 
    },

    fecha: {
        type: Date,
        required: false 
    },

    calificacionOpcional: {
        type: Number,
        required: false 
    }
    
})

module.exports = mongoose.model("Actividad", actividadSchema);