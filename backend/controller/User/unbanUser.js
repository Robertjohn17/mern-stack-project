const User = require("../../models/userModel");

const unbanUser = async (req, res) => {
  try {
    const { id } = req.params;
    const unbannedUser = await User.findByIdAndUpdate(
      id,
      { banned: false },
      { new: true }
    );
    if (!unbannedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User is Unbanned" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = unbanUser;