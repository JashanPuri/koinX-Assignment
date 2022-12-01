const express = require("express");

const userController = require('../controllers/user')

const router = express.Router();

router.get('/transactions', userController.getTransactions)

router.get('/balance', userController.getBalance)

module.exports = router;