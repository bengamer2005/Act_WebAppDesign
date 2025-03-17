const Tema = require("../models/temas.model")

//llamar TODAS las temas
const getTemas = async (req, res) => {
    try {
        const temas = await Tema.find({})
        res.status(200).json(temas)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//llamar SOLO una tema
const getTema = async (req, res) => {
    try {
        const {id} = req.params
        const tema = await Tema.findById(id)
        res.status(200).json(tema)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//crear NUEVA tema
const postTema = async (req, res) => {
    try {
        const tema = await Tema.create(req.body)
        res.status(200).json(tema)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//ACTUALIZAR una tema
const putTema = async (req, res) => {
    try {
        const {id} = req.params
        const tema = await Tema.findByIdAndUpdate(id)

        if(!tema) {
            return res.status(404).json({message: "No se encontro el tema"})
        }

        const updateTema = await Tema.findById(id)
        res.status(200).json(updateTema)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//ELIMINAR actividad
const deleteTema = async (req, res) => {
    try {
        const {id} = req.params
        const tema = await Tema.findByIdAndDelete(id)

        if(!tema) {
            return res.status(404).json({message: "No se encontro el tema a eliminar"})
        }

        res.status(200).json({message: "Tema eliminado con exito"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getTema,
    getTemas,
    postTema,
    putTema,
    deleteTema
}