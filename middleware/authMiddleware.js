const jwt = require("jsonwebtoken");
const Auth = require("../models/authSchema");

const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
    } catch (error) {}
  }

  next();
};

module.exports = { protect };
