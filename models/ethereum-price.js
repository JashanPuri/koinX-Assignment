const mongoose = require("mongoose");

const ethereumPriceSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      default: "INR",
      unique: true,
    },
    price: Number,
  },
  { timestamps: true }
);

const EthereumPrice = mongoose.model("ethereum_price", ethereumPriceSchema);

module.exports = EthereumPrice;
