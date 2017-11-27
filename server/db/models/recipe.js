const Sequelize = require('sequelize');
const db = require('../db');

const Recipe = db.define('recipe', {
  name: Sequelize.STRING,
  steps: Sequelize.TEXT,
  calories: Sequelize.STRING,
  fat: Sequelize.STRING,
  carbohydrates: Sequelize.STRING,
  sugar: Sequelize.STRING,
  sodium: Sequelize.STRING,
  image: Sequelize.STRING,
});

module.exports = Recipe;
