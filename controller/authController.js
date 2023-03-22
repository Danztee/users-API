const Auth = require("../models/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      throw new Error("please fill in all required fields");

    const userExists = await Auth.findOne({ email });
    if (userExists) throw new Error("User already exists");

    // hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = generateJWT(user._id);

    const user = await Auth.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user created successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) throw new Error("User not found");

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) throw new Error("incorrect email or password");

    const token = generateJWT(user._id);

    if (user && pass) {
      res.status(200).json({
        message: "user logged in",
        token,
        user: {
          id: user._id,
          user: user.fullName,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { register, login };
