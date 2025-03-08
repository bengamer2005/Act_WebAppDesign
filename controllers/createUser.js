const Post = require('../models/Post');

exports.createUser = async (req, res) => {
    try {
        const { title, content, user } = req.body;

        // Verifica si el usuario existe en la base de datos
        const mongoose = require('mongoose');

const validUser = await require('../models/User').findById(
    mongoose.isValidObjectId(user) ? user : new mongoose.Types.ObjectId(user)
);

        
        if (!validUser) {
            return res.status(400).json({ error: "El usuario no existe" });
        }

        // Crea el post con referencia al usuario
        const post = await Post.create({ title, content, user });

        res.status(201).json(post);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const posts = await Post.find().populate('user'); // Hace populate del usuario
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ error: "Element Not Found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => { // Corregí 'delatePost' a 'deletePost'
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Element Not Found" });
        }
        res.status(200).json({ message: "Post Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
