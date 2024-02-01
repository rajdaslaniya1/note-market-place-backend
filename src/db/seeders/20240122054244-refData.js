"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("RefData", [
      {
        value: "Male",
        dataValue: "Male",
        refCategory: "Gender",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Female",
        dataValue: "Female",
        refCategory: "Gender",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Unknown",
        dataValue: "Unknown",
        refCategory: "Gender",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Paid",
        dataValue: "Paid",
        refCategory: "Selling Mode",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Free",
        dataValue: "Free",
        refCategory: "Selling Mode",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Draft",
        dataValue: "Draft",
        refCategory: "Gender",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Submitted For Review",
        dataValue: "Submitted For Review",
        refCategory: "Notes Status",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "In Review",
        dataValue: "In Review",
        refCategory: "Notes Status",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Published",
        dataValue: "Approved",
        refCategory: "Notes Status",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Rejected",
        dataValue: "Rejected",
        refCategory: "Notes Status",
        createdAt: new Date(),
        isActive: true,
        updatedAt: new Date(),
        createdBy: 1,
        updatedBy: 1,
      },
      {
        value: "Removed",
        dataValue: "Removed",
        refCategory: "Notes Status",
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
    return queryInterface.bulkDelete("RefData", null, {});
  },
};
