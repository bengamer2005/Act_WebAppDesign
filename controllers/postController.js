const Post = require("../models/Post");

// Crear un nuevo post
exports.createPost = async (req, res) => {
    try {
        const { title, content, user } = req.body;

        // Verifica si el usuario existe antes de crear el post
        const validUser = await require("../models/User").findById(user);
        if (!validUser) {
            return res.status(400).json({ error: "El usuario no existe" });
        }

        const post = new Post({ title, content, user });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        res.status(200).json({ message: "Post eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
