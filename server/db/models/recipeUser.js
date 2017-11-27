const Sequelize = require('sequelize');
const db = require('../db');

const RecipeUser = db.define('recipeUser', {
  saved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = RecipeUser;
