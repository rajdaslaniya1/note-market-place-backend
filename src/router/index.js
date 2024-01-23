// routes.js
const express = require("express");
const userRouter = require("./user.router");

const router = express.Router();

router.use("/v1", userRouter);

module.exports = router;
