const {
  passwordHashing,
  passwordCompare,
  createToken,
  generatePassword,
} = require("../utils/common");
const {
  sendForgotPasswordMail,
  sendVerificationMail,
} = require("../utils/mail-template");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const {
  signUpSchema,
  loginSchema,
  forgotPasswordSchema,
  changePasswordSchema,
} = require("../utils/validation");

const sequelize = require("sequelize");

const Users = require("../db/models").Users;
const UserRoles = require("../db/models").UserRoles;

const signUpUserMember = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const { error } = signUpSchema.validate(req.body);

    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }

    const data = await Users.findOne({ where: { email } });

    if (data) {
      return sendErrorResponse(res, "User email is already in used", 400);
    }

    const roleId = await UserRoles.findOne({ where: { name: "Member" } });

    const hashPassword = await passwordHashing(password);

    const user = await Users.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      roleId: roleId.id,
    });

    await sendVerificationMail(email, firstName);

    return sendSuccessResponse(
      res,
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      "Please verify your email. you received link via mail"
    );
  } catch (error) {
    console.log("signUpUserMember-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }

    const { email, password } = req.body;

    const userEmail = await Users.findOne({
      where: { email, isActive: true },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "password",
        "email",
        "isEmailVerify",
        [sequelize.literal('"user_roles"."id"'), "roleId"],
        [sequelize.literal('"user_roles"."name"'), "name"],
      ],
      include: {
        model: UserRoles,
        required: true,
        as: "user_roles",
        attributes: [],
      },
    });

    if (userEmail) {
      const isMatch = await passwordCompare(password, userEmail.password);
      if (!userEmail.isEmailVerify) {
        return sendErrorResponse(
          res,
          "Please verify your email before login",
          400
        );
      }
      if (isMatch) {
        const token = createToken(userEmail.id, userEmail.email);
        return sendSuccessResponse(
          res,
          {
            id: userEmail.id,
            firstName: userEmail.firstName,
            lastName: userEmail.lastName,
            email: userEmail.email,
            roleId: userEmail.roleId,
            roleName: userEmail.dataValues.name,
          },
          "User login successfully",
          token
        );
      }
    }
    return sendErrorResponse(res, "Invalid email or password", 400);
  } catch (error) {
    console.log("loginUser-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { error } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }
    const { email } = req.body;
    const findUser = Users.findOne({ where: { email } });
    if (findUser) {
      const generatedPassword = generatePassword();
      const hashPassword = await passwordHashing(generatedPassword);
      await Users.update(
        { password: hashPassword },
        {
          where: {
            email,
          },
        }
      );
      await sendForgotPasswordMail(email, generatedPassword);
      return sendSuccessResponse(
        res,
        null,
        "Password is updated successfully. check your mail"
      );
    }
    return sendErrorResponse(res, "User email is not present", 404);
  } catch (error) {
    console.log("forgotPassword-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const changePassword = async (req, res) => {
  try {
    const { user_id } = req.headers;
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }
    const { password, newPassword } = req.body;
    const findUser = await Users.findOne({ where: { id: user_id } });
    console.log(findUser.password, password);
    if (findUser) {
      const isMatch = await passwordCompare(password, findUser.password);
      console.log(isMatch, "IsMatch");
      if (isMatch) {
        const newHashPassword = await passwordHashing(newPassword);
        await Users.update(
          { password: newHashPassword },
          { where: { id: user_id } }
        );
        return sendSuccessResponse(
          res,
          null,
          "User password successfully updated"
        );
      }
      return sendErrorResponse(res, "You have entered wrong password", 400);
    }
    return sendErrorResponse(res, "User is nor present", 404);
  } catch (error) {
    console.log("changePassword-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

module.exports = {
  signUpUserMember,
  loginUser,
  forgotPassword,
  changePassword,
};
