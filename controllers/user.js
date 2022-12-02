const { BadRequestError } = require("../errors/index");
const EthereumPrice = require("../models/ethereum-price");
const {
  doesUserExist,
  calculateUserBalanceService,
  getUserBalanceService,
  storeUserBalance,
} = require("../services/user");

// GET /user/:userAddress/balance
const getBalance = async (req, res, next) => {
  try {
    const userAddress = req.params.userAddress;
    if (!userAddress) {
      const error = new BadRequestError("User address not provided");
      throw error;
    }

    const ethereum = await EthereumPrice.findOne({ currency: "INR" });
    const etherPrice = ethereum.price;
    // console.log(etherPrice);

    const isUserPresent = await doesUserExist(userAddress);

    let balance;

    if (isUserPresent) {
      console.log("FOUND");
      balance = await getUserBalanceService(userAddress);
    } else {
      // calculate balance
      console.log("CALCULATING");
      balance = await calculateUserBalanceService(userAddress);
      await storeUserBalance(userAddress, balance);
    }

    res.json({
      userAddress,
      balance,
      etherPrice: { price: etherPrice, currency: "INR" },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBalance,
};
