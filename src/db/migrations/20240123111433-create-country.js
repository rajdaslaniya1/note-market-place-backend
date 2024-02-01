"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Countries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      countryCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Countries");
  },
};
