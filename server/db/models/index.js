const User = require('./user');
const FridgeItems = require('./FridgeItems');
const Fridge = require('./Fridge');

Fridge.belongsTo(User);
Fridge.belongsTo(FridgeItems);


module.exports = {
  User,
  FridgeItems,
  Fridge,
};
