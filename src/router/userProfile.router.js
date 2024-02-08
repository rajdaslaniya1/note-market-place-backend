const express = require("express");
const multer = require("multer");

const { userAuthenticate } = require("../middleware/authentication");
const {
  createOrUpdateUserProfile,
  getUserDetails,
} = require("../controller/userProfile.controller");

const router = express.Router();
const upload = multer();

router.post(
  "/user-profile",
  userAuthenticate,
  upload.single("profilePicture"),
  createOrUpdateUserProfile
);

router.get("/user-profile", userAuthenticate, getUserDetails);

module.exports = router;
