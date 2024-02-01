// routes.js
const express = require("express");
const userRouter = require("./user.router");
const countryRouter = require("./country.router");

const router = express.Router();

router.use("/v1", userRouter);
router.use("/v1", countryRouter);

module.exports = router;
