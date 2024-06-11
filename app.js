const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();

const db = require('./db'); // Usar la conexión a través de mysql2

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'login.html'));
});

// Ruta de registro de usuarios
app.post('/register', (req, res) => {
    const { nombre, cedula, correo, telefono, usuario, clave } = req.body;

    console.log('Datos recibidos:', { nombre, cedula, correo, telefono, usuario, clave });

    if (!clave) {
        return res.status(400).send('Clave requerida');
    }

    const saltRounds = 8;

    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(clave, salt);

        const query = 'INSERT INTO users (nombre, cedula, correo, telefono, usuario, clave) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [nombre, cedula, correo, telefono, usuario, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).send('Error en el servidor');
            }
            res.status(200).send('Usuario registrado con éxito');
        });
    } catch (err) {
        console.error('Error en el proceso de hash:', err);
        res.status(500).send('Error en el proceso de hash de contraseña');
    }
});

// Ruta de inicio de sesión de usuarios
app.post('/login', (req, res) => {
    const { usuario, clave } = req.body;

    const query = 'SELECT * FROM users WHERE usuario = ?';
    db.query(query, [usuario], (err, results) => {
        if (err) return res.status(500).send('Error en el servidor');
        if (results.length === 0) return res.status(404).send('Usuario no encontrado');

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(clave, user.clave);
        if (!passwordIsValid) return res.status(401).send('Clave incorrecta');

        const token = jwt.sign({ id: user.id }, 'supersecreto', {
            expiresIn: 86400 // 24 horas
        });
        console.log('Bienvenido ', user.nombre);

        res.status(200).send({ auth: true, token});
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
