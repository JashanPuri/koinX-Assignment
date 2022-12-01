// GET /user/transactions
const getTransactions = (req, res, next) => {
  res.json({message: "GET TRANSACTIONS"});
};

// GET /user/balance
const getBalance = (req, res, next) => {
  res.json({message: "GET BALANCE"});
};

module.exports = {
  getTransactions,
  getBalance,
};
