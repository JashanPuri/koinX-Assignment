const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: String,
    balance: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
