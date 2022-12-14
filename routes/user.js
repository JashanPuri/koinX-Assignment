const express = require("express");

const userController = require('../controllers/user')

const router = express.Router();

router.get('/:userAddress/balance', userController.getBalance)

module.exports = router;