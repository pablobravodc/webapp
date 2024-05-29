const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1992',
    database: 'webapp'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Ruta de registro de usuarios
app.post('/register', (req, res) => {
    const { nombre, cedula, correo, telefono, usuario, clave } = req.body;
    const hashedPassword = bcrypt.hashSync(clave, 8);

    const query = 'INSERT INTO users (nombre, cedula, correo, telefono, usuario, clave) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, cedula, correo, telefono, usuario, hashedPassword], (err, result) => {
        if (err) return res.status(500).send('Error en el servidor');
        res.status(200).send('Usuario registrado con éxito');
    });
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

        res.status(200).send({ auth: true, token });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
