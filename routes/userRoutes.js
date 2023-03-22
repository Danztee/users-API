const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUsers).post(addUser);
router.route("/:id").delete(deleteUser).put(updateUser);

module.exports = router;
