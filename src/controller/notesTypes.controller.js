const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { createNotesTypesSchema } = require("../utils/validation");
const NotesTypes = require("../db/models/index").NotesTypes;
const Users = require("../db/models/index").Users;
const { literal } = require("sequelize");

const getNotesTypes = async (req, res) => {
  try {
    const data = await NotesTypes.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "isActive",
        "createdAt",
        [literal('"created_by_user"."firstName"'), "firstName"],
        [literal('"created_by_user"."lastName"'), "lastName"],
      ],
      include: {
        model: Users,
        required: true,
        as: "created_by_user",
        attributes: [],
      },
    });
    return sendSuccessResponse(res, data, "NotesType list ");
  } catch (error) {
    console.log("getNotesTypes-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const createNoteTypes = async (req, res) => {
  try {
    const { error } = createNotesTypesSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }

    const { name, description } = req.body;

    const data = await NotesTypes.create({
      name,
      description,
      createdBy: req.headers.user_id,
      updatedBy: req.headers.user_id,
    });
    return sendSuccessResponse(res, data, "NotesTypes created successfully");
  } catch (error) {
    console.log("createNoteTypes-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const deleteNotesTypes = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const findNotesTypes = await NotesTypes.findOne({
      where: { id, isActive: true },
    });
    if (!findNotesTypes) {
      return sendErrorResponse(res, "Record is not present in database", 404);
    }
    await NotesTypes.update(
      { isActive: false, updatedBy: user_id },
      { where: { id } }
    );
    return sendSuccessResponse(res, null, "NotesTypes is deleted successfully");
  } catch (error) {
    console.log("deleteNotesTypes-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const updateNotesTypes = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const { error } = createNotesTypesSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }
    const findNotesTypes = await NotesTypes.findOne({
      where: { id },
    });
    if (!findNotesTypes) {
      return sendErrorResponse(res, "Record is not present in database", 404);
    }
    const { name, description } = req.body;
    await NotesTypes.update(
      { name, description, updatedBy: user_id, isActive: true },
      { where: { id } }
    );
    return sendSuccessResponse(
      res,
      null,
      "NotesTypes record updated successfully"
    );
  } catch (error) {
    console.log("updateNotesTypes-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const getSingleNotesTypes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const data = await NotesTypes.findOne({ where: { id } });
    if (!data) {
      return sendErrorResponse(res, "No record found in database", 404);
    }
    return sendSuccessResponse(res, data, "NotesTypes record");
  } catch (error) {
    console.log("getSingleNotesTypes-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

module.exports = {
  getNotesTypes,
  createNoteTypes,
  deleteNotesTypes,
  updateNotesTypes,
  getSingleNotesTypes,
};
