const User = require('./user');
const FridgeItems = require('./FridgeItems');

FridgeItems.belongsToMany(User, { through: 'userItems' });
module.exports = {
  User,
  FridgeItems,
};
