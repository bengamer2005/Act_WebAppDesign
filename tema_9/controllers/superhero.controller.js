const Superhero = require("../models/superhero.model")

//llamar a TODOS los superhero
const getSuperheros = async (req, res) => {
      try {
        const superhero = await Superhero.find({})
        res.status(200).json(superhero)
      } catch (error) {
        res.status(500).json({messege: error.messege})
      }
}

//llamar a un SOLO superhero
const getSuperhero = async (req, res) => {
    try{
        const {id} = req.params
        const superhero = await Superhero.findById(id)
        res.status(200).json(superhero)
    } catch (error) {
        res.status(500).json({messege: error.messege})
    }
}

//crear nuevo superhero
const postSuperheros = async (req, res) => {
    try {
        const superhero = await Superhero.create(req.body)
        res.status(200).json(superhero)
    } catch (error) {
        res.status(500).json({messege: error.messege})
    }
}


const putSuperheros = async (req, res) => {
    try{
    const {id} = req.params 
    const superhero = await Superhero.findByIdAndUpdate(id, req.body, { new: true })

    if(!superhero) {
        return res.status(404).json({messege: "No se encontro dicho Superhero"})
    }

    const updateSuperhero = await Superhero.findById(id)
    res.status(200).json(updateSuperhero)

    }catch (error){
    res.status(500).json({messege: error.messege})
    }
}

//eliminar superhero
const deleteSuperheros = async (req, res) => {
      try {
        const {id} = req.params
        const superhero = await Superhero.findByIdAndDelete(id)
    
        if(!superhero) {
          return res.status(404).json({messege: "No se encontro dicho Superhero"})
        }
        
        res.status(200).json({messege: "Superhero eliminado correctamente"})
    
      } catch (error) {
        res.status(500).json({messege: error.messege})
      }
}

module.exports = {
    getSuperheros,
    getSuperhero,
    postSuperheros,
    putSuperheros,
    deleteSuperheros
}