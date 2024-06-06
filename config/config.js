require('dotenv').config(); // Asegúrate de tener dotenv configurado

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  // Puedes agregar configuraciones para otros entornos (test, production)
};
