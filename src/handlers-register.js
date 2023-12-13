const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const {DataTypes} = require('sequelize');
const {insertUser, isUsernameExist} = require('../models/users');




async function registerHandler(request, h) {
  try {
    const { email, full_name, password } = request.payload;

    // Validasi input
    const schema = Joi.object({
      email: Joi.string().pattern(new RegExp('^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    const { error } = schema.validate({ email, password });
    if (error) {
      return h.response(error.details[0].message).code(400);
    }
    
    // Cek apakah email sudah ada
const usernameExist = await isUsernameExist(email);
if (usernameExist) {
return h.response('email already exists.').code(400);
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Insert user baru
await insertUser(email, full_name, hashedPassword);

return h.response('Registration successful!').code(201);
} catch (error) {
console.error(error);
return h.response('Internal Server Error').code(500);
}



}







module.exports = {registerHandler};

