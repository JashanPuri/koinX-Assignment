const Transaction = require("../models/transaction");

const storeTransactions = async (transactions) => {
  const filteredTransactions = [];

  for (let index in transactions) {
    const shouldWrite = !(await Transaction.exists({
      _id: transactions[index]._id,
    }));

    if (shouldWrite) {
      filteredTransactions.push(transactions[index]);
    }
  }

  const storedTransactions = await Transaction.insertMany(filteredTransactions);
  return storeTransactions
};

module.exports = { storeTransactions };
