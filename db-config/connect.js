const Sequelize = require('sequelize');

// database connection
const connection = new Sequelize(
  'database_api',
  'root',
  '',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
);

module.exports = connection;
