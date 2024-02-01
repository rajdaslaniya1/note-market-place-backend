const express = require("express");
const { userAuthenticate } = require("../middleware/authentication");
const {
  getRefData,
  createRefData,
  deleteRefData,
  updateRefData,
} = require("../controller/refData.controller");

const router = express.Router();

router.get("/ref-data", userAuthenticate, getRefData);
router.post("/ref-data", userAuthenticate, createRefData);
router.delete("/ref-data/:id", userAuthenticate, deleteRefData);
router.patch("/ref-data/:id", userAuthenticate, updateRefData);

module.exports = router;
