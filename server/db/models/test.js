const Sequelize = require('sequelize');
const db = require('../db');

const Test = db.define('test', {
  quantity: Sequelize.INTEGER,

});

module.exports = Test;
