const { User } = require('../models');
const { Op } = require("sequelize");

module.exports = {
  findUser(email) {
    return User.findOne({
      where: { email }
    });
  },

  findUserByToken(token) {
    return User.findOne({
      where: { token }
    });
  },

  createUser(fullName, email, password, token) {
    return User.create({
      fullName,
      email,
      password,
      token
    });
  }
};