const express = require("express")
const mongoose = require("mongoose")
const Actividad = require("./models/actividad.model")
const Tema = require("./models/temas.model")
const actividadRoute = require("./routes/actividad.route")
const temasRoute = require("./routes/tema.route")

const path = require("path")
const app = express()

app.use(express.json())

//Rutas
app.use("/api/actividad", actividadRoute)
app.use("/api/tema", temasRoute)

//Trae el index.html
app.use(express.static(path.join(__dirname, "views")))

app.get ("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

//Se define el puerto
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en https://localhost:${PORT}`)
})

// Se hace la conexion a la base de datos y crea un tema por default
mongoose.connect("mongodb://127.0.0.1:27017/Tarea5", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("MongoDB conectado")

    // Agregar un tema automáticamente si no hay ninguno
    const temaExistente = await Tema.findOne({ tema: "Matemáticas" })
    if (!temaExistente) {
        await Tema.create({ tema: "Matemáticas" })
        console.log("Tema 'Matemáticas' agregado")
    }

    const temaExistente2 = await Tema.findOne({ tema: "Español" })
    if (!temaExistente2) {
        await Tema.create({ tema: "Español" })
        console.log("Tema 'Español' agregado")
    }
}).catch(error => console.error(error))
