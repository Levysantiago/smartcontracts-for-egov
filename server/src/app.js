const express = require("express");
const app = express();
const port = 5000;
let bodyParser = require("body-parser");
require("dotenv").config();
const {
  enrollmentcontroller
} = require("../ethereum/instances/enrollmentcontroller");
const enrollmentproof = require("../ethereum/instances/enrollmentproof");

const { MTMSK_ACCOUNT, GAS } = process.env;

// parse application/json
app.use(bodyParser.json());

app.post("/enrollment/create", async (req, res) => {
  console.log(req.body);
  const json = req.body;
  if (!json || !json.student) {
    res.sendStatus(400);
    return;
  }
  /*const json = {
    student: "0xaa2A138f487F4d367fa31Da09ccbbAE6cDaD8398",
    name: "Carlos",
    course: "CIC",
    ingress: "20151",
    period: "20191",
    shift: 3
  };*/
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
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

/*
    {
        student: "0xaa2A138f487F4d367fa31Da09ccbbAE6cDaD8398",
        name: "Carlos",
        course: "CIC",
        ingress: "20151",
        period: "20191",
        shift: 3
    }
*/
app.post("/enrollment/edit", async (req, res) => {
  console.log(req.body);
  const json = req.body;
  if (!json || !json.student) {
    res.sendStatus(400);
    return;
  }
  try {
    const enrollmentaddress = await enrollmentcontroller.methods
      .getEnrollment(json.student)
      .call({
        from: MTMSK_ACCOUNT
      });
    if (!enrollmentaddress) {
      res.sendStatus(400);
      return;
    }
    const enrContract = enrollmentproof.getInstance(enrollmentaddress);
    await enrContract.methods
      .setInfo(
        json.student,
        json.name,
        json.course,
        json.ingress,
        json.period,
        json.shift
      )
      .send({ from: MTMSK_ACCOUNT, gas: GAS });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
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

/*
{
    "studentAddress": "0xaa2A138f487F4d367fa31Da09ccbbAE6cDaD8390"
}
*/
app.post("/enrollment/infoByStudent", async (req, res) => {
  if (!req.body || !req.body.studentAddress) {
    res.sendStatus(400);
    return;
  }
  try {
    const studentAddress = req.body.studentAddress;
    const address = await enrollmentcontroller.methods
      .getEnrollment(studentAddress)
      .call({ from: MTMSK_ACCOUNT, gas: GAS });

    const instance = enrollmentproof.getInstance(address);
    let info = await instance.methods
      .getInfo()
      .call({ from: MTMSK_ACCOUNT, gas: GAS });

    // Getting the subjects
    let qtd = await instance.methods
      .getSubjectAmount()
      .call({ from: MTMSK_ACCOUNT });

    let subjectsList = [];
    for (let i = 0; i < qtd; i++) {
      let name = await instance.methods
        .getSubject(i)
        .call({ from: MTMSK_ACCOUNT });
      subjectsList.push({ key: i, name: name });
    }

    let json = {
      student: info["0"],
      name: info["1"],
      course: info["2"],
      ingress: info["3"],
      period: info["4"],
      shift: info["5"],
      subjects: subjectsList,
      contractAddress: address
    };
    res.send(json);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

/*
{
    "studentAddress": "0xaa2A138f487F4d367fa31Da09ccbbAE6cDaD8390"
}
*/
app.post("/isStudent", async (req, res) => {
  if (!req.body || !req.body.studentAddress) {
    res.sendStatus(400);
    return;
  }
  try {
    const studentAddress = req.body.studentAddress;
    const resp = await enrollmentcontroller.methods
      .isStudent(studentAddress)
      .call({ from: MTMSK_ACCOUNT, gas: GAS });
    res.send(resp);
  } catch (e) {
    //console.log(e);
    res.sendStatus(204);
  }
});

/*
{
    contract: 0x2742B66B96207e1267DaEE52F6EC957B03DAdf9A
}
*/
app.post("/enrollment/info", async (req, res) => {
  if (!req.body || !req.body.contract) {
    res.sendStatus(400);
    return;
  }
  const contractAddress = req.body.contract;
  try {
    //console.log(contractAddress);
    const instance = enrollmentproof.getInstance(contractAddress);
    let info = await instance.methods.getInfo().call({ from: MTMSK_ACCOUNT });
    let json = {
      student: info["0"],
      name: info["1"],
      course: info["2"],
      ingress: info["3"],
      period: info["4"],
      shift: info["5"]
    };
    //console.log(json);
    res.send(json);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

/*
{
    contract: 0x2742B66B96207e1267DaEE52F6EC957B03DAdf9A
}
*/
app.post("/enrollment/subjects", async (req, res) => {
  if (!req.body || !req.body.contract) {
    res.sendStatus(400);
    return;
  }
  const contractAddress = req.body.contract;
  try {
    const instance = enrollmentproof.getInstance(contractAddress);
    let qtd = await instance.methods
      .getSubjectAmount()
      .call({ from: MTMSK_ACCOUNT });

    let json = {
      subjects: []
    };
    for (let i = 0; i < qtd; i++) {
      let name = await instance.methods
        .getSubject(i)
        .call({ from: MTMSK_ACCOUNT });
      json.subjects.push({ name: name });
    }
    //console.log(json);
    res.send(json);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

/*
{
    contract: 0x2742B66B96207e1267DaEE52F6EC957B03DAdf9A,
    subject: "name"
}
*/
app.post("/enrollment/add/subject", async (req, res) => {
  if (!req.body || !req.body.contract || !req.body.subject) {
    res.sendStatus(400);
    return;
  }
  let json = req.body;
  //console.log(json);
  const contractAddress = json.contract;
  try {
    const instance = enrollmentproof.getInstance(contractAddress);
    await instance.methods
      .addSubject(json.subject)
      .send({ from: MTMSK_ACCOUNT, gas: GAS });

    res.send(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
