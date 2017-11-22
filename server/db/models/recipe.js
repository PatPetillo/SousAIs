const Sequelize = require('sequelize');
const db = require('../db');

const Recipe = db.define('recipe', {
  name: Sequelize.STRING,
  steps: Sequelize.TEXT,
});

module.exports = Recipe;
