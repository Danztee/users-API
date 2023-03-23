const User = require("../models/userSchema");

const addUser = async (req, res) => {
  const { name, age } = req.body;
  try {
    const data = await User.create({ user: req.user._id, name, age });
    res.status(201).json({ message: "user created successfully", data });
  } catch (error) {
    res
      .status(401)
      .json({ message: "error creating user", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await User.find({ user: req.user._id });
    res.status(200).json({
      message: "users gotten successfully",
      length: data.length,
      data,
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "error getting all users", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { age } = req.body;
    const data = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "user updated successfully", data });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "error updating user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) throw new Error("user not found");

    if (!req.user.id) throw new Error("not authorized");

    if (user.user.toString() === req.user.id) await User.findByIdAndDelete(id);
    else throw new Error("you can not delete cuz you're not the creator");
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }

  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = { getUsers, addUser, updateUser, deleteUser };
