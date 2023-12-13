const Sequelize = require('sequelize');

// database connection
const connection = new Sequelize(
  'login',
  'root',
  'Isna02#',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
);

module.exports.connect = connection;