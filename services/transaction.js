const Transaction = require("../models/transaction");
const User = require("../models/user");

const storeTransactions = async (transactions, userAddress) => {
  const filteredTransactions = [];

  for (let index in transactions) {
    const shouldWrite = !(await Transaction.exists({
      _id: transactions[index]._id,
    }));

    if (shouldWrite) {
      filteredTransactions.push(transactions[index]);
    }
  }
  console.log(filteredTransactions.length);
  if (filteredTransactions.length > 0) {
    const storedTransactions = await Transaction.insertMany(
      filteredTransactions
    );

    console.log("DELETING USER");
    await User.findByIdAndDelete(userAddress);
  }
};

module.exports = { storeTransactions };
