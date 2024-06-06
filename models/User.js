const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/index'); // Ajusta la ruta según sea necesario

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
    unique: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
