const connection = require('../db-config');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const Users = dbConnection.define('users', {
      email: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      password: {
          type: DataTypes.STRING
      },
      full_name : {
          type: DataTypes.STRING
      },
      date_of_birth : {
          type: DataTypes.DATE
      },
      phone_number : {
          type:  DataTypes.STRING
      },
      registration_date: {
          type:  DataTypes.DATE
      }
},
{
    freezeTablename: true,
    timestamps: false
});

// Cek apakah username sudah ada
const isUsernameExist = async (email) => {
    try {
      const existingUser = await Users.findOne({ where: { email } });
      return existingUser !== null;
    } catch (error) {
      console.error('Error checking username existence:', error.message);
      throw error;
    }
  };

  // Insert user baru
  const insertUser = async (email, full_name, hashedPassword) => {
    try {
      const newUser = await Users.create({ email, full_name, password: hashedPassword });
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

module.exports = { Users, isUsernameExist, insertUser};
