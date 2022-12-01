// GET /user/transactions
const getTransactions = (req, res, next) => {
  res.json({ message: "GET TRANSACTIONS" });
};

module.exports = {
  getTransactions,
};
