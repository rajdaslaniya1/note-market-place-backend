"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Raj",
        lastName: "Daslaniya",
        roleId: 1,
        email: "rajdaslaniya1234@gmail.com",
        password:
          "$2a$10$qY.c0cQlQrkr8ND7omzZZODzmtYWK3/96HAesip3lGUlt6YnOIAza",
        isEmailVerify: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
