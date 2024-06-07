const { Sequelize } = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 120000 // Aumentar el tiempo de espera a 60 segundos (valor en milisegundos)
    },
    logging: console.log // Habilitar loggin
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;
