const User = require('./user');
const FridgeItems = require('./FridgeItems');
const Fridge = require('./Fridge')
const Test = require('./test')


// FridgeItems.belongsToMany(User, { through: Fridge });
Test.belongsTo(User);
Test.belongsToMany(FridgeItems, { through: Fridge });


module.exports = {
  User,
  FridgeItems,
  Fridge,
  Test,
};
