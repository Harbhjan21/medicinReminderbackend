const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes whitespace from the beginning and end
    },
    email: {
      type: String,
      required: true,
      unique: true, //
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    medicin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicindetail",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("MedicinUser", userSchema);

module.exports = User;
