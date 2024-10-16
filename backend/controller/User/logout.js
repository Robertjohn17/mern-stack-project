const logoutController = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logout Successful", success: true });
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = logoutController;
