const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new Error("Authentication failed: Token is missing");
    }
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    if (!decoded.userId) {
      throw new Error("Authentication failed: Invalid token");
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("Authentication failed: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = auth;
