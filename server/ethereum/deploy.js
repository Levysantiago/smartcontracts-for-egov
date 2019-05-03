const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const vaccine_controller = require("./build/VaccinationController.json");
const enrollment_controller = require("./build/EnrollmentController.json");
const immobile_controller = require("./build/ImmobileController.json");
require("dotenv").config();
const { MNEMONIC_WORDS, INFURA_LINK, MTMSK_ACCOUNT, GAS } = process.env;

const provider = new HDWalletProvider(MNEMONIC_WORDS, INFURA_LINK);
const web3 = new Web3(provider);

const deploy = async () => {
  /**
   * Deploying Vaccination Controller
   */

  // Create a new contract and define ABI access
  console.log("Deploying Vaccine Controller");
  let result = await new web3.eth.Contract(
    JSON.parse(vaccine_controller.interface)
  )
    // Deploy configuration
    .deploy({
      data: vaccine_controller.bytecode
    })
    .send({
      gas: GAS,
      from: MTMSK_ACCOUNT
    });
  console.log("Vaccine Controller Address: " + result.options.address);

  /**
   * Deploying Enrollment Controller
   */

  console.log("Deploying Enrollment Controller");
  // Create a new contract and define ABI access
  result = await new web3.eth.Contract(
    JSON.parse(enrollment_controller.interface)
  )
    // Deploy configuration
    .deploy({
      data: enrollment_controller.bytecode
    })
    .send({
      gas: GAS,
      from: MTMSK_ACCOUNT
    });
  console.log("Enrollment Controller Address: " + result.options.address);

  /**
   * Deploying Immobile Controller
   */
  console.log("Deploying Immobile Controller");
  // Create a new contract and define ABI access
  result = await new web3.eth.Contract(
    JSON.parse(immobile_controller.interface)
  )
    // Deploy configuration
    .deploy({
      data: immobile_controller.bytecode
    })
    .send({
      gas: GAS,
      from: MTMSK_ACCOUNT
    });
  console.log("Immobile Controller Address: " + result.options.address);
};
deploy();
