const path = require("path");
const buildPath = path.resolve(__dirname, "build");
const { compile } = require("./lib/compiler");
const fs = require("fs-extra");

fs.removeSync(buildPath);

compile("VaccinationCard.sol");
compile("ImmobileRegistration.sol");
compile("EnrollmentProof.sol");
