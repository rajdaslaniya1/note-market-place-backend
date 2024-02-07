const { verifyToken } = require("../utils/common");
const { sendErrorResponse } = require("../utils/response");

const Users = require("../db/models").Users;

const userAuthenticate = async (req, res, next) => {
  try {
    const { authtoken } = req.headers;
    if (!authtoken) {
      return sendErrorResponse(res, "Please passed token", 400);
    }
    const userDetail = verifyToken(authtoken);
    const user = await Users.findOne({
      where: {
        id: userDetail.user_id,
        email: userDetail.email,
      },
    });
    if (user) {
      req.headers.user_id = user.id;
      req.headers.email = user.email;
      req.headers.roleId = user.roleId;
      return next();
    }
  } catch (error) {
    return sendErrorResponse(
      res,
      "Unauthorized user for perform this task",
      409
    );
  }
};

const roleAdminAuthenticate = async (req, res, next) => {
  try {
    const { roleId } = req.headers;
    console.log(roleId);
    if (roleId === 1 || roleId === 2) {
      return next();
    }
    new throwError();
  } catch (error) {
    return sendErrorResponse(
      res,
      "Unauthorized user for perform this task",
      409
    );
  }
};

const roleSuperAdminAuthenticate = async (req, res, next) => {
  try {
    const { roleId } = req.headers;
    console.log(roleId);
    if (roleId === 1) {
      return next();
    }
    new throwError();
  } catch (error) {
    return sendErrorResponse(
      res,
      "Unauthorized user for perform this task",
      409
    );
  }
};

module.exports = {
  userAuthenticate,
  roleAdminAuthenticate,
  roleSuperAdminAuthenticate,
};
