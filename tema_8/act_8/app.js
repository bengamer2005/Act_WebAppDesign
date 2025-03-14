const express = require("express");
const mongoose = require("mongoose")
const Superhero = require("./models/superhero.model.js")
const superheroRoute = require("./routes/superhero.route.js")
const path = require("path");
const app = express();

//middleware
app.use(express.json());

//rutas
app.use("/api/superheros", superheroRoute)


//trae el index.html
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
})

//seleccion de puerto a usar
const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//conexion a mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Act8", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));
