const { default: axios } = require("axios");
const { setIntervalAsync, clearIntervalAsync } = require("set-interval-async");
const EthereumPrice = require("../models/ethereum-price");

const fetchPrice = async (currency = "inr") => {
  const uri = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=${currency}`;

  const response = await axios.get(uri);
  const data = response.data.slice(3, response.data.length - 1);
  const result = JSON.parse(data);

  return result;
};

const fetchAndUpdatePriceHelper = async () => {
  console.log("Fetching price");
  const result = await fetchPrice();
  const priceInINR = result.ethereum.inr;
  console.log("Fetched price", priceInINR);

  console.log("Storing in DB");
  await EthereumPrice.updateOne(
    { currency: "INR" },
    { $set: { price: priceInINR } },
    { upsert: true }
  );
  console.log("Stored in DB");
};

const fetchAndUpdateEthereumPriceJob = async () => {
  await fetchAndUpdatePriceHelper();
  setIntervalAsync(async () => {
    try {
      await fetchAndUpdatePriceHelper();
    } catch (error) {
      console.log(error);
    }
  }, 600000);
};


module.exports = fetchAndUpdateEthereumPriceJob;
