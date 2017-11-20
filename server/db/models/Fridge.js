const Sequelize = require('sequelize');
const db = require('../db');

const Fridge = db.define('fridge', {
  quantity: Sequelize.INTEGER,

});

module.exports = Fridge;
