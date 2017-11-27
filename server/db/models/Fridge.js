const Sequelize = require('sequelize');
const db = require('../db');

// quantity is a weight in grams
const Fridge = db.define('fridge', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Fridge;
