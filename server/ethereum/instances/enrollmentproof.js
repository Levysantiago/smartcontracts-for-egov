const { web3 } = require("../lib/web3");
const EnrollmentProof = require("../build/EnrollmentProof.json");

module.exports = {
  getInstance: contractAddress => {
    return new web3.eth.Contract(
      JSON.parse(EnrollmentProof.interface),
      contractAddress
    );
  }
};
