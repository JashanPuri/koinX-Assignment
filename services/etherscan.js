const axios = require("axios");
const { json } = require("body-parser");

const fetchTransactionsFromEtherScan = async (
  userAddress,
  startblock,
  endblock,
  page,
  offset
) => {
  const apiKey =
    process.env.ETHERSCAN_API_KEY || "VBISYVA4QUKKU75FWTK29W51C55FDRCM12";

  const uri = `https://api.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=asc&apikey=${apiKey}`;

  const response = await axios.get(uri);

  return response.data
};

module.exports = {
  fetchTransactionsFromEtherScan,
};
