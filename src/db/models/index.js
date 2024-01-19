// models/index.js

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");
const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const models = {};

// Read all model files in the current directory and import them
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    models[model.name] = model;
  });

// Associate models if needed (for example, if you have associations defined)

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Export the sequelize instance and models
module.exports = {
  sequelize,
  ...models,
};
