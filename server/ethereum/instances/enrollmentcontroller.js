const { web3 } = require("../lib/web3");
const EnrollmentController = require("../build/EnrollmentController.json");
require("dotenv").config();

const { ENROLLMENT_CONTROLLER } = process.env;

const instancia = new web3.eth.Contract(
  JSON.parse(EnrollmentController.interface),
  ENROLLMENT_CONTROLLER
);

module.exports = {
  enrollmentcontroller: instancia
};
