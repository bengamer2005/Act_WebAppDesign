const User = require("../models/User");

// Función para crear un usuario
async function createUser(req, res) {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el usuario" });
    }
}

// Función para obtener todos los usuarios
async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
}

// Exportar funciones correctamente
module.exports = { createUser, getUsers };
