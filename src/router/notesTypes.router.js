const express = require("express");
const {
  userAuthenticate,
  roleAdminAuthenticate,
} = require("../middleware/authentication");
const {
  getNotesTypes,
  createNoteTypes,
  deleteNotesTypes,
  getSingleNotesTypes,
  updateNotesTypes,
} = require("../controller/notesTypes.controller");

const router = express.Router();

router.get(
  "/notes-types",
  userAuthenticate,
  roleAdminAuthenticate,
  getNotesTypes
);
router.get(
  "/notes-types/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  getSingleNotesTypes
);
router.post(
  "/notes-types",
  userAuthenticate,
  roleAdminAuthenticate,
  createNoteTypes
);
router.delete(
  "/notes-types/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  deleteNotesTypes
);
router.patch(
  "/notes-types/:id",
  userAuthenticate,
  roleAdminAuthenticate,
  updateNotesTypes
);

module.exports = router;
