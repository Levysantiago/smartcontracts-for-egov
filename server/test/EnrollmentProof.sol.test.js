const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
/*Criando uma instancia do web3*/
const web3 = new Web3(ganache.provider());
const {
  interface: c_interface,
  bytecode: c_bytecode
} = require("../ethereum/build/EnrollmentController.json");

const {
  interface,
  bytecode
} = require("../ethereum/build/EnrollmentProof.json");

let accounts, creator, owner, c_address;
let contractController, contract;
let creatorBalance;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  creator = accounts[0];
  owner = accounts[1];
  creatorBalance = await web3.eth.getBalance(creator);
  contractController = await new web3.eth.Contract(JSON.parse(c_interface))
    .deploy({ data: c_bytecode, arguments: [] })
    .send({ from: creator, gas: "4000000" });
  c_address = contractController.options.address;
});

describe("EnrollmentProofController", () => {
  it("Deploy a contract", async () => {
    assert.ok(Number(await web3.eth.getBalance(creator)) < creatorBalance);
  });

  it("Testing address", () => {
    assert.equal(contractController.options.address, c_address);
  });
});
