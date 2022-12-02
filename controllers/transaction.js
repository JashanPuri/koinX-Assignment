const { BadRequestError, CustomAPIError } = require("../errors/index");
const { fetchTransactionsFromEtherScan } = require("../services/etherscan");
const { storeTransactions } = require("../services/transaction");

// GET /user/transactions
const getTransactions = async (req, res, next) => {
  try {
    const userAddress = req.query.userAddress;

    if (!userAddress || !userAddress.trim()) {
      const error = new BadRequestError("User address not provided");
      throw error;
    }

    // fetching transactions from etherscan
    const startblock =
      (req.query.startblock && parseInt(req.query.startblock)) || 0;

    const endblock =
      (req.query.endblock && parseInt(req.query.endblock)) || 99999999;

    const offset = (req.query.offset && parseInt(req.query.offset)) || 20;
    const page = (req.query.page && parseInt(req.query.page)) || 1;

    const response = await fetchTransactionsFromEtherScan(
      userAddress,
      startblock,
      endblock,
      page,
      offset
    );

    if (response.message === "NOTOK") {
      const error = new CustomAPIError(response.result);
      error.statusCode = 500;
      throw error;
    }

    // Storing transactions in mongo DB
    const transactions = response.result.map((transaction) => {
      transaction._id = transaction.hash;
      return transaction;
    });

    const storedTransactions = await storeTransactions(transactions);

    res.json({ transactions: storedTransactions });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTransactions,
};
