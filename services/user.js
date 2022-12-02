const Transaction = require("../models/transaction");
const User = require("../models/user");

const doesUserExist = async (userAddress) => {
  return await User.exists({ _id: userAddress });
};

// Store balance in DB
const storeUserBalance = async (userAddress, balance) => {
  const user = {
    _id: userAddress,
    balance,
  };
  await User.updateOne({ _id: userAddress }, user, { upsert: true });
};

// Fetch balance from DB
const getUserBalanceService = async (userAddress) => {
  const user = await User.findById(userAddress);
  if (!user) {
    return null;
  }

  return user.balance;
};

// Calculate balance from transactions
const calculateUserBalanceService = async (userAddress) => {
  const credit = await Transaction.aggregate([
    { $match: { to: "0xce94e5621a5f7068253c42558c147480f38b5e0d" } },
    { $group: { _id: "$to", value: { $sum: "$value" } } },
  ]).exec();

  const debit = await Transaction.aggregate([
    { $match: { from: userAddress } },
    { $group: { _id: "$from", value: { $sum: "$value" } } },
  ]).exec();

  let totalCredit = 0;
  let totalDebit = 0;

  if (credit.length != 0) {
    totalCredit = credit[0].value;
  }

  if (debit.length != 0) {
    totalDebit = debit[0].value;
  }

  return totalCredit - totalDebit;
};

module.exports = {
  doesUserExist,
  calculateUserBalanceService,
  getUserBalanceService,
  storeUserBalance,
};
