const User = require("../models/User.model")
const sendEmail = require("../services/email.service")

const register = async (req, res) => {
    const { username, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: "La contraseña debe contener al menos 6 caracteres" })
    }

    try {
        const user = await User.create({ username, password })
        req.session.user = user
        
        await sendEmail(username, "Bienvenido a Comic Verse", "¡Gracias por registrarte en nuestra plataforma!")

        res.status(200).json({ message: "Usuario creado con éxito", user })
    } catch (error) {
        res.status(401).json({ message: "El usuario no fue creado", error: error.message })
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Datos no proporcionados" })
    }

    try {
        const user = await User.findOne({ username, password })
        if (!user) {
            return res.status(401).json({ message: "Inicio de sesión no exitoso", error: "Usuario no encontrado" })
        } else {
            req.session.user = user

            await sendEmail(username, "Alerta de inicio de sesión", "Se ha iniciado sesión en tu cuenta.")

            return res.status(200).json({ message: "Inicio de sesión exitoso", user })
        }
    } catch (error) {
        return res.status(400).json({ message: "Ocurrió un error", error: error.message })
    }
};


const deleteUser = async (req, res) => {
    const {id} = req.body
    if (!id) {
        return res.status(400).json({ message: "ID no proporcionado" })
    }

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        res.status(200).json({ message: "Usuario eliminado con éxito" })

    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error", error: error.message })
    }
}

module.exports = {
    register,
    login,
    deleteUser
}
