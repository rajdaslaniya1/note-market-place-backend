const express = require("express");
const { userAuthenticate } = require("../middleware/authentication");
const {
  getCountry,
  createCountry,
  deleteCountry,
  updateCountry,
} = require("../controller/country.controller");

const router = express.Router();

router.get("/country", userAuthenticate, getCountry);
router.post("/country", userAuthenticate, createCountry);
router.delete("/country/:id", userAuthenticate, deleteCountry);
router.patch("/country/:id", userAuthenticate, updateCountry);

module.exports = router;
