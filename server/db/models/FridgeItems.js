const Sequelize = require('sequelize');
const db = require('../db');

const FridgeItems = db.define('fridgeItems', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
  },

});

module.exports = FridgeItems;
