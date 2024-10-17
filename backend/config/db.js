const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://robertjohn17:robertjohn17@ecommerceapp.pv3gn.mongodb.net/?retryWrites=true&w=majority&appName=EcommerceApp"
    );
    console.log("DB connected successfully");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
