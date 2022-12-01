// GET /user/balance
const getBalance = (req, res, next) => {
  res.json({message: "GET BALANCE"});
};

module.exports = {
  getBalance,
};
