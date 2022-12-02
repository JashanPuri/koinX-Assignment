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
      const newTrans = {};
      newTrans._id = transaction.hash;
      newTrans.from = transaction.from;
      newTrans.to = transaction.to;
      newTrans.value = transaction.value;
      newTrans.timeStamp = transaction.timeStamp;
      newTrans.blockNumber = transaction.blockNumber;
      newTrans.hash = transaction.hash;
      newTrans.nonce = transaction.nonce;
      newTrans.blockHash = transaction.blockHash;
      newTrans.gasUsed = transaction.gasUsed;

      return newTrans;
    });

    await storeTransactions(transactions, userAddress);

    res.json({ transactions });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getTransactions,
};
