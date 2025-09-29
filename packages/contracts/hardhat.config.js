require("@nomiclabs/hardhat-ethers");
require("hardhat-multibaas-plugin"); // integrates with MultiBaas

module.exports = {
  solidity: "0.8.19",
  networks: {
    multibaas: {
      url: process.env.MB_RPC_URL || "http://localhost:8545",
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : []
    }
  },
  multibaas: {
    // optional plugin config: baseUrl (console REST) and apiKey helps auto-register
    apiKey: process.env.MB_API_KEY,
    baseUrl: process.env.MB_BASE_URL
  }
};
