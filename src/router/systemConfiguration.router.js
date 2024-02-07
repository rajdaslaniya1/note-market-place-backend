const express = require("express");
const {
  userAuthenticate,
  roleSuperAdminAuthenticate,
} = require("../middleware/authentication");
const {
  getSystemConfiguration,
  createSystemConfiguration,
} = require("../controller/systemConfiguration.controller");
const router = express.Router();

router.get(
  "/system-configuration",
  userAuthenticate,
  roleSuperAdminAuthenticate,
  getSystemConfiguration
);

router.post(
  "/system-configuration",
  userAuthenticate,
  roleSuperAdminAuthenticate,
  createSystemConfiguration
);

module.exports = router;
