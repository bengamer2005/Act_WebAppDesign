const Actividad = require("../models/actividad.model")

//llamar TODAS las actividades
const getActividades = async (req, res) => {
    try {
        const actividad = await Actividad.find({})
        res.status(200).json(actividad)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//llamar SOLO una actividad
const getActividad = async (req, res) => {
    try {
        const {id} = req.params
        const actividad = await Actividad.findById(id)
        res.status(200).json(actividad)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//crear NUEVA actividad
const postActividad = async (req, res) => {
    try {
        const actividad = await Actividad.create(req.body)
        res.status(200).json(actividad)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//ACTUALIZAR una actividad
const putActividad = async (req, res) => {
    try {
        const { id } = req.params
        const { tipoActividad, calificacion, calificacionOpcional } = req.body

        if (!tipoActividad || !calificacion) {
            return res.status(400).json({ message: "Faltan datos obligatorios" })
        }

        const actividad = await Actividad.findByIdAndUpdate(
            id,
            { tipoActividad, calificacion, calificacionOpcional },
            { new: true }  
        )

        if (!actividad) {
            return res.status(404).json({ message: "No se encontró la actividad" })
        }

        res.status(200).json(actividad)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//ELIMINAR actividad
const deleteActividad = async (req, res) => {
    try {
        const {id} = req.params
        const actividad = await Actividad.findByIdAndDelete(id)

        if(!actividad) {
            return res.status(404).json({message: "No se encontro la actividad a eliminar"})
        }

        res.status(200).json({message: "Actividad eliminada con exito"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getActividad,
    getActividades,
    postActividad,
    putActividad,
    deleteActividad
}