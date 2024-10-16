const User = require("../../models/userModel");

const banUser = async (req, res) => {
  try {
    const { id } = req.params;
    const bannedUser = await User.findByIdAndUpdate(
      id,
      { banned: true },
      { new: true }
    );
    if (!bannedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User is Banned" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports =  banUser;
