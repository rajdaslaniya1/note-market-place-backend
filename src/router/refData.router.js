const express = require("express");
const {
  userAuthenticate,
  roleAdminAuthenticate,
} = require("../middleware/authentication");
const {
  getRefData,
  createRefData,
  deleteRefData,
  updateRefData,
  getSingleRefData,
} = require("../controller/refData.controller");

const router = express.Router();

router.get("/ref-data", userAuthenticate, roleAdminAuthenticate, getRefData);
router.post(
  "/ref-data",
  userAuthenticate,
  roleAdminAuthenticate,
  createRefData
);
router.delete(
  "/ref-data/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  deleteRefData
);
router.patch(
  "/ref-data/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  updateRefData
);
router.get(
  "/ref-data/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  getSingleRefData
);

module.exports = router;
