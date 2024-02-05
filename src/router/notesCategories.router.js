const express = require("express");
const {
  userAuthenticate,
  roleAdminAuthenticate,
} = require("../middleware/authentication");
const {
  getNotesCategories,
  getSingleNotesCategories,
  createNotesCategories,
  deleteNotesCategories,
  updateNotesCategories,
} = require("../controller/notesCategories.controller");

const router = express.Router();

router.get(
  "/notes-list",
  userAuthenticate,
  roleAdminAuthenticate,
  getNotesCategories
);
router.get(
  "/notes-list/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  getSingleNotesCategories
);
router.post(
  "/notes-list",
  userAuthenticate,
  roleAdminAuthenticate,
  createNotesCategories
);
router.delete(
  "/notes-list/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  deleteNotesCategories
);
router.patch(
  "/notes-list/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  updateNotesCategories
);

module.exports = router;
