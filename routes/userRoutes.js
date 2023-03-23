const express = require("express");
const { getMe } = require("../controller/authController");
const router = express.Router();

const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUsers).post(protect, addUser);
router.route("/:id").delete(protect, deleteUser).put(protect, updateUser);

router.get("/me", protect, getMe);

module.exports = router;
