const express = require("express");
const mongoose = require("mongoose");
const { createUser, getUsers } = require("./controllers/userController");
const { createPost, getPosts, updatePost, deletePost } = require("./controllers/postController"); // Importar funciones para posts

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Tarea7", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// **Rutas para Usuarios**
app.post("/api/users", createUser);
app.get("/api/users", getUsers);

// **Rutas para Posts**
app.post("/api/datos", createPost);
app.get("/api/datos", getPosts);
app.put("/api/datos/:id", updatePost);
app.delete("/api/datos/:id", deletePost);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
