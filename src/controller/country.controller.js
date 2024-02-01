const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { createCountrySchema } = require("../utils/validation");
const Country = require("../db/models/index").Country;
const { Op } = require("sequelize");

const getCountry = async (req, res) => {
  try {
    const data = await Country.findAll({ where: { isActive: true } });
    return sendSuccessResponse(res, data, "Country list ");
  } catch (error) {
    console.log("getCountry-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const createCountry = async (req, res) => {
  try {
    const { error } = createCountrySchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }

    const { name, countryCode } = req.body;
    const checkDataAlreadyPresent = await Country.findOne({
      where: { [Op.or]: [{ name }, { countryCode }] },
    });
    if (checkDataAlreadyPresent) {
      if (checkDataAlreadyPresent.name === name) {
        return sendErrorResponse(res, "Please pass unique name value", 404);
      }
      return sendErrorResponse(
        res,
        "Please pass unique country code value",
        404
      );
    }
    const data = await Country.create({
      name,
      countryCode,
      createdBy: req.headers.user_id,
      updatedBy: req.headers.user_id,
    });
    return sendSuccessResponse(res, data, "Country created successfully");
  } catch (error) {
    console.log("createCountry-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const findCountry = await Country.findOne({
      where: { id, isActive: true },
    });
    if (!findCountry) {
      return sendErrorResponse(res, "Record is not present in database", 404);
    }
    await Country.update(
      { isActive: false, updatedBy: user_id },
      { where: { id } }
    );
    return sendSuccessResponse(res, null, "Country is deleted successfully");
  } catch (error) {
    console.log("deleteCountry-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const { error } = createCountrySchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }
    const findCountry = await Country.findOne({
      where: { id },
    });
    if (!findCountry) {
      return sendErrorResponse(res, "Record is not present in database", 404);
    }
    const { name, countryCode } = req.body;
    await Country.update(
      { name, countryCode, updatedBy: user_id },
      { where: { id } }
    );
    return sendSuccessResponse(
      res,
      null,
      "Country record updated successfully"
    );
  } catch (error) {
    console.log("updateCountry-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

module.exports = {
  getCountry,
  createCountry,
  deleteCountry,
  updateCountry,
};
