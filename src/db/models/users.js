"use strict";
const { Model } = require("sequelize");
const Users = require("./index").Users;
const UserRoles = require("./index").UserRoles;

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.belongsTo(models.UserRoles, {
        foreignKey: "roleId",
        as: "user_roles",
      });
    }
  }
  Users.init(
    {
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: "id",
        },
        allowNull: false,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      isEmailVerify: { type: DataTypes.BOOLEAN, defaultValue: false },
      password: { type: DataTypes.STRING, allowNull: false },
      createdBy: {
        type: DataTypes.INTEGER,
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      updatedBy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
