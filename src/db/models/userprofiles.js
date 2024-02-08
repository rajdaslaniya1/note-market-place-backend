"use strict";
const { Model } = require("sequelize");
const { RefDataValue } = require("../../utils/common");
const Users = require("./index").Users;
const RefData = require("./index").RefData;
const Country = require("./index").Country;

module.exports = (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.createdUserAssociation = this.belongsTo(models.Users, {
        foreignKey: "createdBy",
        as: "created_by_user",
      });
      this.updatedUserAssociation = this.belongsTo(models.Users, {
        foreignKey: "updatedBy",
        as: "updated_by_user",
      });
      this.userAssociation = this.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user_details",
      });
      this.genderAssociation = this.belongsTo(models.RefData, {
        foreignKey: "genderId",
        as: "gender_details",
      });
      this.countryAssociation = this.belongsTo(models.Country, {
        foreignKey: "countryId",
        as: "country_details",
      });
    }
  }
  UserProfiles.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
      },
      genderId: {
        type: DataTypes.INTEGER,
        references: {
          model: RefData,
          key: "id",
        },
        where: {
          refCategory: RefDataValue.Gender,
          isActive: true,
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
      secondaryEmail: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
      address1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryId: {
        type: DataTypes.INTEGER,
        references: {
          model: Country,
          key: "id",
        },
        where: {
          isActive: 1,
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
      university: {
        type: DataTypes.STRING,
      },
      college: {
        type: DataTypes.STRING,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserProfiles",
    }
  );
  return UserProfiles;
};
