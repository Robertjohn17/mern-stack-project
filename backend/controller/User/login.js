const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    let user;
    if (isAdmin) {
      user = await User.findOne({ email, isAdmin: true });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
        error: true,
        success: false,
      });
    }
    if (user.banned) {
      return res.status(403).json({
        message:
          "Your account has been banned. Please contact support for assistance.",
        error: true,
        success: false,
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
        error: true,
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.json({
      message: "Login Successful",
      token,
      user: {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage,
        banned: user.banned,
        fullname: user.fullname,
        address: user.address,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = loginController;
