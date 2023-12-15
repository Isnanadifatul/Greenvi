const Sequelize = require('sequelize');

// database connection
const connection = new Sequelize(
  'login', //databaseName
  'root', //username
  'Isna02#', //password
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
);

module.exports = connection;