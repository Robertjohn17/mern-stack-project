const User = require("../../models/userModel");

const registerController = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (!username) {
      throw new Error("Please provide Username");
    }
    if (!email) {
      throw new Error("Please provide Email");
    }
    if (!password) {
      throw new Error("Please provide Password");
    }

    const newUser = new User({ username, email, password, isAdmin });
    await newUser.save();
    res.status(201).json({
      data: newUser,
      success: true,
      error: false,
      message: "Account Created Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = registerController;
