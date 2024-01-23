const { verifyToken } = require("../utils/common");
const { sendErrorResponse } = require("../utils/response");

const User = require("../../models").User;

const userAuthenticate = async (req, res, next) => {
  try {
    const { authtoken } = req.headers;
    if (!authtoken) {
      return sendErrorResponse(res, "Please passed token", 400);
    }
    const userDetail = verifyToken(authtoken);
    const user = await User.findOne({
      where: {
        id: userDetail.user_id,
        email: userDetail.email,
      },
    });
    if (user) {
      req.headers.user_id = user.id;
      req.headers.email = user.email;
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

module.exports = { userAuthenticate };
