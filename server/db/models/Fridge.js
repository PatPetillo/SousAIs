const Sequelize = require('sequelize');
const db = require('../db');

// quantity is a weight in ounces or grams
const Fridge = db.define('fridge', {
  quantity: Sequelize.FLOAT,
});

module.exports = Fridge;
