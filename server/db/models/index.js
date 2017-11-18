const User = require('./user');
const FridgeItems = require('./FridgeItems');

FridgeItems.belongsToMany('User');
module.exports = {
  User,
  FridgeItems,
};
