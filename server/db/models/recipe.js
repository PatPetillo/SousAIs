const Sequelize = require('sequelize');
const db = require('../db');

const Recipe = db.define('recipe', {
  name: Sequelize.STRING,
  ingredientAmount: Sequelize.TEXT,
  readyIn: Sequelize.INTEGER,
  diets: Sequelize.TEXT,
  servings: Sequelize.INTEGER,
  spoonacularScore: Sequelize.INTEGER,
  steps: Sequelize.TEXT,
  calories: Sequelize.STRING,
  fat: Sequelize.STRING,
  carbohydrates: Sequelize.STRING,
  cholesterol: Sequelize.STRING,
  sugar: Sequelize.STRING,
  sodium: Sequelize.STRING,
  protein: Sequelize.STRING,
  image: Sequelize.STRING,
  currentStep: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Recipe;
