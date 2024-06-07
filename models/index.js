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
      connectTimeout: 60000 // Aumentar el tiempo de espera a 60 segundos (valor en milisegundos)
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/User')(sequelize, Sequelize.DataTypes);

module.exports = db;
