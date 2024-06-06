require('dotenv').config(); // Asegúrate de tener dotenv configurado
const { Sequelize } = require('sequelize');


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

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('nombre_basedatos', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql', // El dialecto puede variar según el tipo de base de datos que estés utilizando (mysql, postgres, sqlite, etc.)
  });
  
  // Verificar la conexión a la base de datos
  async function authenticate() {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  }
  
  // Exportar la instancia de Sequelize y la función de autenticación
  module.exports = {
    sequelize,
    authenticate
  };