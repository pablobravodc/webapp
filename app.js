const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();


const db = require('./models'); // Asegúrate de que la ruta sea correcta

const User = require('./models/User');
const sequelize = require('./config/config');

// Sincronizar modelos y base de datos
db.sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Error connecting to the database: ', err);
  });





// Configurar middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar la conexión a la base de datos MySQL
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) throw err;
//     console.log('Conectado a la base de datos MySQL');
// });

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
app.post('/register', async (req, res) => {
    const { nombre, cedula, correo, telefono, usuario, clave } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(clave, 8);
        const newUser = await db.User.create({
            nombre,
            cedula,
            correo,
            telefono,
            usuario,
            clave: hashedPassword
        });
        res.status(200).send('Usuario registrado con éxito');
    } catch (error) {
        console.error('Error en el proceso de registro:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta de inicio de sesión de usuarios
app.post('/login', async (req, res) => {
    const { usuario, clave } = req.body;

    try {
        const user = await db.User.findOne({ where: { usuario } });
        if (!user) return res.status(404).send('Usuario no encontrado');

        const passwordIsValid = await bcrypt.compare(clave, user.clave);
        if (!passwordIsValid) return res.status(401).send('Clave incorrecta');

        const token = jwt.sign({ id: user.id }, 'supersecreto', {
            expiresIn: 86400 // 24 horas
        });

        res.status(200).send({ auth: true, token });
    } catch (error) {
        console.error('Error en el proceso de inicio de sesión:', error);
        res.status(500).send('Error en el servidor');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
