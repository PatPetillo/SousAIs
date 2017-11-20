const User = require('./user');
const FridgeItems = require('./FridgeItems');
const Fridge = require('./Fridge')



FridgeItems.belongsToMany(User, { through: Fridge });
Fridge.belongsTo(FridgeItems);



module.exports = {
  User,
  FridgeItems,
  Fridge,
};
