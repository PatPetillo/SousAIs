const User = require('./user');
const FridgeItems = require('./FridgeItems');
const Fridge = require('./Fridge');
const Recipe = require('./recipe');

Fridge.belongsTo(User);
Fridge.belongsTo(FridgeItems);
Recipe.belongsToMany(User);


module.exports = {
  User,
  FridgeItems,
  Fridge,
  Recipe,
};
