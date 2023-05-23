'use strict';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [{
      fullName: 'Bregsi Paling Admin',
      email: 'superadmin@gmail.com',
      password: await bcrypt.hash('stepout0325', 10),
      token: jwt.sign({
        email: 'superadmin@gmail.com',
        password: bcrypt.hash('stepout0325', 10),
        fullName: 'Bregsi Paling Admin'
      }, 'superadmin'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
