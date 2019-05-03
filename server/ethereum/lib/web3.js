require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const { MNEMONIC_WORDS, INFURA_LINK, SERVER_MTMSK_ACCOUNT, GAS } = process.env;
const Web3 = require("web3");
//const provider = new HDWalletProvider(MNEMONIC_WORDS, INFURA_LINK);
//const web3 = new Web3(provider);

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new HDWalletProvider(MNEMONIC_WORDS, INFURA_LINK);
  web3 = new Web3(provider);
}

module.exports = {
  web3: web3
};
