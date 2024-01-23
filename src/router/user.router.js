const express = require("express");
const {
  signUpUserMember,
  loginUser,
  forgotPassword,
} = require("../controller/user.controller");
const router = express.Router();

router.post("/sign-up", signUpUserMember);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

module.exports = router;
