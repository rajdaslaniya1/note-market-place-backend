const express = require("express");
const {
  signUpUserMember,
  loginUser,
  forgotPassword,
  changePassword,
} = require("../controller/user.controller");
const { userAuthenticate } = require("../middleware/authentication");

const router = express.Router();

router.post("/sign-up", signUpUserMember);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", userAuthenticate, changePassword);

module.exports = router;
