"use strict";

/** @type {import('sequelize-cli').Migration} */
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
    return queryInterface.bulkInsert("UserRoles", [
      {
        name: "Super Admin",
        description: "This roles for super admin user",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        name: "Admin",
        description: "This roles for admin users",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        name: "Member",
        description: "This roles for member users",
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
    return queryInterface.bulkDelete("UserRoles", null, {});
  },
};
