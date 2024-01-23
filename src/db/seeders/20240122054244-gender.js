"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Gender", [
      {
        name: "Male",
        description: "male",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        name: "Female",
        description: "female",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        name: "Unknown",
        description: "unknown",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
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
    return queryInterface.bulkDelete("Gender", null, {});
  },
};
