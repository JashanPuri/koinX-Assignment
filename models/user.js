const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
