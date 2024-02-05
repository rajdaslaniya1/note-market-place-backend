const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { createNotesCategoriesSchema } = require("../utils/validation");
const NotesCategories = require("../db/models/index").NotesCategories;
const Users = require("../db/models/index").Users;
const { literal } = require("sequelize");

const getNotesCategories = async (req, res) => {
  try {
    const data = await NotesCategories.findAll({
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
    return sendSuccessResponse(res, data, "NotesCategories list ");
  } catch (error) {
    console.log("getNotesCategories-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const createNotesCategories = async (req, res) => {
  try {
    const { error } = createNotesCategoriesSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }

    const { name, description } = req.body;

    const data = await NotesCategories.create({
      name,
      description,
      createdBy: req.headers.user_id,
      updatedBy: req.headers.user_id,
    });
    return sendSuccessResponse(res, data, "Ref data created successfully");
  } catch (error) {
    console.log("createNotesCategories-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const deleteNotesCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const findNotesCategories = await NotesCategories.findOne({
      where: { id, isActive: true },
    });
    if (!findNotesCategories) {
      return sendErrorResponse(res, "Record is not present in database", 404);
    }
    await NotesCategories.update(
      { isActive: false, updatedBy: user_id },
      { where: { id } }
    );
    return sendSuccessResponse(
      res,
      null,
      "NotesCategories is deleted successfully"
    );
  } catch (error) {
    console.log("deleteNotesCategories-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const updateNotesCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.headers;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const { error } = createNotesCategoriesSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message, 400);
    }
    const findNotesCategories = await NotesCategories.findOne({
      where: { id },
    });
    if (!findNotesCategories) {
      return sendErrorResponse(res, "Record is not present in database", 404);
    }
    const { name, description } = req.body;
    await NotesCategories.update(
      { name, description, updatedBy: user_id, isActive: true },
      { where: { id } }
    );
    return sendSuccessResponse(
      res,
      null,
      "NotesCategories record updated successfully"
    );
  } catch (error) {
    console.log("updateNotesCategories-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

const getSingleNotesCategories = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendErrorResponse(res, "Please passed id", 404);
    }
    const data = await NotesCategories.findOne({ where: { id } });
    if (!data) {
      return sendErrorResponse(res, "No record found in database", 404);
    }
    return sendSuccessResponse(res, data, "NotesCategories record");
  } catch (error) {
    console.log("getSingleNotesCategories-error", error);
    return sendErrorResponse(res, "Interval server error", 500);
  }
};

module.exports = {
  getNotesCategories,
  createNotesCategories,
  deleteNotesCategories,
  updateNotesCategories,
  getSingleNotesCategories,
};
