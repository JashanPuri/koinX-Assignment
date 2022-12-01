const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  from: mongoose.Schema.Types.ObjectId,
  to: mongoose.Schema.Types.ObjectId,
  value: Number,
  timeStamp: String,
  blockNumber: String,
  hash: String,
  nonce: String,
  blockHash: String,
  gasUsed: String,
});

module.exports = mongoose.model("Transaction", transactionSchema);
