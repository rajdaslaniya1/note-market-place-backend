"use strict";
const { Model } = require("sequelize");

const Users = require("./index").Users;
module.exports = (sequelize, DataTypes) => {
  class RefData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.createdUserAssociation = this.belongsTo(models.Users, {
        foreignKey: "createdBy",
        as: "created_by_user",
      });
      this.updatedUserAssociation = this.belongsTo(models.Users, {
        foreignKey: "updatedBy",
        as: "updated_by_user",
      });
    }
  }
  RefData.init(
    {
      value: { type: DataTypes.STRING, allowNull: false },
      dataValue: { type: DataTypes.STRING, allowNull: false },
      refCategory: { type: DataTypes.STRING, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: "id",
        },
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RefData",
    }
  );
  return RefData;
};
