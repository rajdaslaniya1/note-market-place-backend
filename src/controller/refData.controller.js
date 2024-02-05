const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { createRefDataSchema } = require("../utils/validation");
const RefData = require("../db/models/index").RefData;

const getRefData = async (req, res) => {
  try {
    const data = await RefData.findAll({ where: { isActive: true } });
    return sendSuccessResponse(res, data, "RefData list ");
  } catch (error) {
    console.log("getRefData-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const createRefData = async (req, res) => {
  try {
    const { error } = createRefDataSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }

    const { value, dataValue, refCategory } = req.body;

    const data = await RefData.create({
      value,
      dataValue,
      refCategory,
      createdBy: req.headers.user_id,
      updatedBy: req.headers.user_id,
    });
    return sendSuccessResponse(res, data, "Ref data created successfully");
  } catch (error) {
    console.log("createRefData-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const deleteRefData = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const findRefData = await RefData.findOne({
      where: { id, isActive: true },
    });
    if (!findRefData) {
      return sendErrorResponse(res, "Record is not present in database", 404);
    }
    await RefData.update(
      { isActive: false, updatedBy: user_id },
      { where: { id } }
    );
    return sendSuccessResponse(res, null, "RefData is deleted successfully");
  } catch (error) {
    console.log("deleteRefData-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const updateRefData = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const { error } = createRefDataSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }
    const findRefData = await RefData.findOne({
      where: { id },
    });
    if (!findRefData) {
      return sendErrorResponse(res, "Record is not present in database", 404);
    }
    const { value, dataValue, refCategory } = req.body;
    await RefData.update(
      { value, dataValue, refCategory, updatedBy: user_id },
      { where: { id } }
    );
    return sendSuccessResponse(
      res,
      null,
      "RefData record updated successfully"
    );
  } catch (error) {
    console.log("updateRefData-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const getSingleRefData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const data = await RefData.findOne({ where: { id } });
    if (!data) {
      return sendErrorResponse(res, "No record found in database", 404);
    }
    return sendSuccessResponse(res, data, "RefData record");
  } catch (error) {
    console.log("getSingleRefData-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

module.exports = {
  getRefData,
  createRefData,
  deleteRefData,
  updateRefData,
  getSingleRefData,
};
