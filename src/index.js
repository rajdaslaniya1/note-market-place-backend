require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./db/models");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
// const routes = require("./src/router");

// app.use(routes);

// middleware
// const notFoundMiddleware = require("./src/middleware/not-found");

// app.use(notFoundMiddleware);

const connection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await db.sequelize.sync();
    console.log("DB connected ");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Something went to wrong please try again", error);
  }
};

connection();

module.exports = app;
