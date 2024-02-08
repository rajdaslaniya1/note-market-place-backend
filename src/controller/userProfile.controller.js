const { uploadImageToFireBase } = require("../utils/common");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { createOrUpdateUserProfileSchema } = require("../utils/validation");
const UserProfiles = require("../db/models/index").UserProfiles;
const Users = require("../db/models/index").Users;
const Country = require("../db/models/index").Country;
const RefData = require("../db/models/index").RefData;

const sequelize = require("sequelize");

const createOrUpdateUserProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      dob,
      genderId,
      phoneNumber,
      address1,
      address2,
      city,
      state,
      zipCode,
      countryId,
      university,
      college,
    } = req.body;
    const profilePicture = req.file;
    const { user_id } = req.headers;
    const { error } = createOrUpdateUserProfileSchema.validate({
      firstName,
      lastName,
      email,
      dob,
      genderId,
      phoneNumber,
      profilePicture,
      address1,
      address2,
      city,
      state,
      zipCode,
      countryId,
      university,
      college,
    });

    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }
    let imageUrl = "";
    if (profilePicture) {
      const timestamp = Date.now();
      const name = profilePicture.originalname.split(".")[0];
      const type = profilePicture.originalname.split(".")[1];
      const fileName = `profile_picture/${user_id}_${name}_${timestamp}.${type}`;
      imageUrl = await uploadImageToFireBase(profilePicture, fileName);
    }
    await Users.update(
      {
        firstName,
        lastName,
        updatedBy: user_id,
      },
      { where: { id: user_id } }
    );
    const userProfile = await UserProfiles.findOne({
      where: { userId: user_id },
    });
    if (userProfile) {
      await UserProfiles.update(
        {
          dob,
          genderId,
          state,
          countryId,
          zipCode,
          college,
          address1,
          address2,
          university,
          phoneNumber,
          profilePicture:
            imageUrl !== "" ? imageUrl : userProfile.profilePicture,
          city,
          updatedBy: user_id,
        },
        { where: { userId: user_id } }
      );
      const userDetails = await UserProfiles.findOne({
        attributes: [
          "userId",
          "dob",
          "genderId",
          "phoneNumber",
          "profilePicture",
          "address1",
          "address2",
          "city",
          "state",
          "zipCode",
          "countryId",
          "university",
          "college",
          [sequelize.literal('"user_details"."firstName"'), "firstName"],
          [sequelize.literal('"user_details"."lastName"'), "lastName"],
          [sequelize.literal('"user_details"."email"'), "email"],
        ],
        where: { userId: user_id },
        include: { model: Users, as: "user_details", attributes: [] },
      });

      return sendSuccessResponse(res, userDetails, "User Details updated");
    } else {
      await UserProfiles.create({
        userId: user_id,
        dob,
        genderId,
        phoneNumber,
        profilePicture: imageUrl ?? null,
        address1,
        address2,
        city,
        state,
        countryId,
        zipCode,
        college,
        university,
        createdBy: user_id,
        updatedBy: user_id,
      });
      const userDetails = await UserProfiles.findOne({
        attributes: [
          "userId",
          "dob",
          "genderId",
          "phoneNumber",
          "profilePicture",
          "address1",
          "address2",
          "city",
          "state",
          "zipCode",
          "countryId",
          "university",
          "college",
          [sequelize.literal('"user_details"."firstName"'), "firstName"],
          [sequelize.literal('"user_details"."lastName"'), "lastName"],
          [sequelize.literal('"user_details"."email"'), "email"],
        ],
        where: { userId: user_id },
        include: { model: Users, as: "user_details", attributes: [] },
      });
      return sendSuccessResponse(
        res,
        userDetails,
        "User created successfully."
      );
    }
  } catch (error) {
    console.log("createOrUpdateUserProfile-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { user_id } = req.headers;
    const userDetails = await UserProfiles.findOne({
      attributes: [
        "userId",
        "dob",
        "genderId",
        "phoneNumber",
        "profilePicture",
        "address1",
        "address2",
        "city",
        "state",
        "zipCode",
        "countryId",
        "university",
        "college",
        [sequelize.literal('"user_details"."firstName"'), "firstName"],
        [sequelize.literal('"user_details"."lastName"'), "lastName"],
        [sequelize.literal('"user_details"."email"'), "email"],
      ],
      where: { userId: user_id },
      include: { model: Users, as: "user_details", attributes: [] },
    });
    const country = await Country.findAll({
      attributes: ["id", "name"],
      where: { isActive: true },
    });

    const gender = await RefData.findAll({
      attributes: ["id", "value"],
      where: { isActive: true, refCategory: "Gender" },
    });

    if (userDetails) {
      return sendSuccessResponse(
        res,
        { country, gender, userDetails },
        "User details"
      );
    } else {
      return sendSuccessResponse(
        res,
        {
          country,
          gender,
          userDetails: {
            firstName: "",
            lastName: "",
            dob: "",
            email: "",
            gender: "",
            phoneNumber: "",
            profilePicture: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
            countryId: -1,
            university: "",
            college: "",
          },
        },
        "User details"
      );
    }
  } catch (error) {
    console.log("getUserDetails-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

module.exports = { createOrUpdateUserProfile, getUserDetails };
