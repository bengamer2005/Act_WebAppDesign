const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const path = require("path");
//modelos
const Superhero = require("./models/superhero.model.js");
const User = require("./models/User.model");
//requiere rutas
const superheroRoute = require("./routes/superhero.route.js");
const UserRoute = require("./routes/User.route");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

//middleware
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "views")))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configuración de la sesión
app.use(session({
  secret: "secretito",
  resave: false,
  saveUninitialized: true,
}))

//ruta de auth
app.use("/api/auth", UserRoute);

// Ruta de la página de registro
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"))
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"))
});

app.get("/main.html", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "views_main", "main.html"))
})

//rutas
app.use("/api/superheros", superheroRoute)

//selección de puerto a usar
const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

//conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/tema_9", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(error => console.error(error))
