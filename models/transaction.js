const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    _id: String,
    from: String,
    to: String,
    value: Number,
    timeStamp: String,
    blockNumber: String,
    hash: String,
    nonce: String,
    blockHash: String,
    gasUsed: String,
  },
  { _id: false }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
