const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose')
//const User = require('./models/User');
const { createUser, getUsers, updatePost, deletePost } = require('./controllers/createUser');

//var nuevoItem = {};
app.use(express.json());

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});
//Mongo DB conexión
mongoose.connect('mongodb://localhost:27017/Tarea7', {
    useNewUrlParser: true,
})
.then (() => console.log(' Conexion a MongoDB establecida '))
.catch((error) => console.error("No existe la base de datos", error));

// Proceso de solicitudes de EndPoints

app.post('/api/datos', createUser);
app.get('/api/datos', getUsers);
app.put('/api/datos/:id', updatePost);
app.delete('/api/datos/:id', deletePost);



app.get('/', (req, res) => {
    res.send('Bienvenido al Backend!');
});

app.post('/api/crear', (req,res) => {
    const nuevoItem = req.body;

res.status(201).json({
    message: 'Llegaste, que bueno',
    item: nuevoItem
});
});

app.get('/api/juegos', (req, res) => {
    res.json(nuevoItem)
});

app.put('/api/juegos/:id', (req, res) =>{
    const { id } = req.params;
    const itemActualizado = req.body;

    res.json({
        Mensaje: `Ya se actualizo ${id}`,
        item: itemActualizado
    });
});

app.delete('/api/juegos/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        mensaje: `Listo, ya se eliminó el item ${id}`
    });
});


