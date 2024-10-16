const User = require("../../models/userModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profileImage");


const editProfile = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { id } = req.user;
      const { username, fullname, email, address, phoneNumber } = req.body;
      let profileImage;

      // Check if req.file exists before accessing its properties
      if (req.file) {
        profileImage = req.file.filename;
      }

      const updatedFields = {
        username: username,
        fullname: fullname,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
      };

      // Only add profileImage to updatedFields if it exists
      if (profileImage) {
        updatedFields.profileImage = profileImage;
      }

      const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "Profile updated successfully", updatedUser });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = editProfile;
