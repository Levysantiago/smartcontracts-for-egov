# About

This is the server side of this project, an API that communicates with the Smart Contracts

# Dependences

All the dependences are listed on package.json file, here they are:

```
"dependencies": {
    "dotenv": "^7.0.0",
    "express": "^4.16.4",
    "fstream": "^1.0.12",
    "ganache-cli": "^6.2.3",
    "mocha": "^5.2.0",
    "mysql": "^2.16.0",
    "solc": "^0.4.23",
    "tar": "^4.4.8",
    "truffle-hdwallet-provider": "0.0.3",
    "typedarray-to-buffer": "^3.1.5",
    "web3": "^1.0.0-beta.35",
    "yaeti": "^0.0.6"
  }
```

# Frameworks

- [Express.js](https://expressjs.com/): An Node.js web application to create REST APIs;
- [Web3.js](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html): Framework to connect to Ethereum network;
- [Mocha.js](https://mochajs.org/): A framework for testing;
- [Ganache-cli](https://github.com/trufflesuite/ganache-cli/blob/master/README.md): A framework which creates local Ethereum accounts for testing;
- [Solc](https://www.npmjs.com/package/solc): A Solidity compiler.

# Endpoints

| Endpoint                  | Method | Description                                                                                           |
| ------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| /enrollment/create        | POST   | create a new enrollment proof                                                                         |
| /enrollment/edit          | POST   | edit an existing enrollment proof                                                                     |
| /enrollment/allow         | POST   | allow an account to have access to an enrollment proof by the contract address or the student address |
| /enrollment/allowed       | POST   | verify if an account has access to some enrollment proof                                              |
| /enrollment/disallow      | POST   | disallow an account to have access to an enrollment proof                                             |
| /enrollment/list          | GET    | get a list of all enrollment proofs registered                                                        |
| /enrollment/info          | POST   | get an enrollment proof information by the enrollment proof contract address                          |
| /enrollment/infoByStudent | POST   | get an enrollment by the student addresss                                                             |
| /enrollment/add/subject   | POST   | add a new subject to certain enrollment proof contract                                                |
| /enrollment/subjects      | POST   | get the list of subjects by the enrollment proof contract address                                     |
| /isStudent                | POST   | verify if certain address is an student                                                               |
| /isCollegiate             | POST   | verify if certain address is a collegiate address                                                     |

# Getting Started

Here are some instructions that show how to set up the project and running on your local machine for development and testing purposes.

## Installing Dependences

To install all dependences just type:

```
$ npm install
```

## Config File

Before you continue with anything, you need to create a _.env_ file, this is where you config all the contracts addresses and your Ethereum Testnet. So you will create this file on server folder and set up all the constants, for example:

_.env_

```
MNEMONIC_WORDS="your mnemonic words"
INFURA_LINK="https://your_testnet.infura.io/v3/your_project_key"
MTMSK_ACCOUNT="0x0000000000000000000000000000000000000000"
GAS="3000000"
VACCINE_CONTROLLER="0x0000000000000000000000000000000000000000"
ENROLLMENT_CONTROLLER="0x0000000000000000000000000000000000000000"
IMMOBILE_CONTROLLER="0x0000000000000000000000000000000000000000"
```

**Definitions**

- **MNEMONIC_WORDS:** These are words given by Metamask after creating an account;
- **INFURA_LINK:** This is you project link created on [Infura.io](https://infura.io/), an Ethereum node;
- **MTMSK_ACCOUNT:** The metamask account which will communicate with the smart contract, it has to be necessarily the smart contract owner;
- **GAS:** Is the maximum gas you are disposed to spend;
- **VACCINE_CONTROLLER, ENROLLMENT_CONTROLLER and IMMOBILE_CONTROLLER:** Are the smart contracts addresses in the testnet used (Ropsten, Rinkeby, ...).

# Running

To run the server:

```
$ npm run server
```

Done, the server will be running on localhost:5000.
