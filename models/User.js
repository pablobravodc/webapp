const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js'); // Importa la instancia de Sequelize

const User = sequelize.define('User', {
  // Definir los campos del modelo
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // El correo debe ser único
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // El nombre de usuario debe ser único
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
