require("dotenv").config();
//const HDWalletProvider = require("truffle-hdwallet-provider");
const { INFURA_LINK } = process.env;
const Web3 = require("web3");

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(INFURA_LINK);
  web3 = new Web3(provider);
}

module.exports = {
  web3: web3
};
