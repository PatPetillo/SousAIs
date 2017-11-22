const User = require('./user');
const db = require('../db');
const FridgeItems = require('./FridgeItems');
const Fridge = require('./Fridge');
const Recipe = require('./recipe');

const RecipeUser = db.define('RecipeUser', {});

Fridge.belongsTo(User);
Fridge.belongsTo(FridgeItems);
Recipe.belongsToMany(User, { through: RecipeUser });
User.belongsToMany(Recipe, {through: RecipeUser });

module.exports = {
  User,
  FridgeItems,
  Fridge,
  Recipe,
  RecipeUser,
};
