const express = require("express");
const {
  userAuthenticate,
  roleAdminAuthenticate,
} = require("../middleware/authentication");
const {
  getCountry,
  createCountry,
  deleteCountry,
  updateCountry,
  getSingleCountry,
} = require("../controller/country.controller");

const router = express.Router();

router.get("/country", userAuthenticate, roleAdminAuthenticate, getCountry);
router.post("/country", userAuthenticate, roleAdminAuthenticate, createCountry);
router.delete(
  "/country/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  deleteCountry
);
router.patch(
  "/country/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  updateCountry
);
router.get(
  "/country/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  getSingleCountry
);

module.exports = router;
