const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const {Users} = require('../models/users');


const loginHandler = async (request, h) => {
  try {
    const { email, password } = request.payload;

    const users = await Users.findOne({ where: { email } });
    if (!users) {
      return h.response('email or password is incorrect').code(401);
    }

    const isValidPassword = await bcrypt.compare(password, users.password);
    if (!isValidPassword) {
      return h.response('email or password is incorrect').code(401);
    }

    // Set cookie untuk sesi
    h.state('userSession', { email });

    return h.response('Login successful!').code(200);
  } catch (error) {
    console.error(error);
    return h.response('Internal Server Error').code(500);
  }
};

module.exports = { loginHandler };
