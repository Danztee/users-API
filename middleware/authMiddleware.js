const jwt = require("jsonwebtoken");
const Auth = require("../models/authSchema");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Auth.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  } else {
    res.status(401).json({
      message: "no token",
    });
  }
};

module.exports = { protect };
