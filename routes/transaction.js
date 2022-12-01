const express = require("express");

const transactionController = require("../controllers/transaction");

const router = express.Router();

router.get("/user-transactions", transactionController.getTransactions);

module.exports = router;
