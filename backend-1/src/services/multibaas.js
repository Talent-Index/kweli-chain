const axios = require("axios");
require("dotenv").config();

const api = axios.create({
  baseURL: process.env.MB_BASE_URL,
  headers: { "X-API-Key": process.env.MB_API_KEY }
});

// Call contract function via MultiBaas REST
async function callContract(functionName, args, from) {
  const res = await api.post(`/contracts/${process.env.CONTRACT_ID}/call`, {
    function: functionName,
    args,
    from
  });
  return res.data;
}

async function sendTx(functionName, args, from) {
  const res = await api.post(`/contracts/${process.env.CONTRACT_ID}/send`, {
    function: functionName,
    args,
    from
  });
  return res.data;
}

module.exports = { callContract, sendTx };
