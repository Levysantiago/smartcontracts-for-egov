const express = require("express");
const app = express();
const port = 5000;
let bodyParser = require("body-parser");
require("dotenv").config();
const httpstatus = require("./lib/HttpStatus");
const {
  enrollmentcontroller
} = require("../ethereum/instances/enrollmentcontroller");

const { MTMSK_ACCOUNT, GAS } = process.env;

// parse application/json
app.use(bodyParser.json());

app.post("/enrollment/create", async (req, res) => {
  const json = {
    student: "0xaa2A138f487F4d367fa31Da09ccbbAE6cDaD8398",
    name: "Carlos",
    course: "CIC",
    ingress: "20151",
    period: "20191",
    shift: 3
  };
  try {
    await enrollmentcontroller.methods
      .addEnrollment(
        json.student,
        json.name,
        json.course,
        json.ingress,
        json.period,
        json.shift
      )
      .send({
        from: MTMSK_ACCOUNT,
        gas: GAS
      });
    const enrollmentaddress = await enrollmentcontroller.methods
      .getEnrollment(json.student)
      .call({ from: MTMSK_ACCOUNT });
    res.end(enrollmentaddress);
  } catch (e) {
    console.log(e);
    res.end("204");
  }
});

app.get("/enrollment/list", async (req, res) => {
  try {
    const enrollments = await enrollmentcontroller.methods
      .listEnrollment()
      .call({ from: MTMSK_ACCOUNT });
    let json = {
      list: enrollments
    };
    res.send(json);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
