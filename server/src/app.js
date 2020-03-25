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

/*
Updates to JSON:
{
    "idm": "id",
    "idt" "0000000000000000",
    "tipo": "W",
    "timestamp": "1519746632",
    "community": "lif_egov",
    "infos":{
        "student": "0xaa2A138f487F4d367fa31Da09ccbbAE6cDaD8398",
        "name": "Carlos",
        "course": "CIC",
        "ingress": "20151",
        "period": "20191",
        "shift": 3
    }

}
*/

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

/*
    "contract": "0x3h4j5h8f487F4d367fa31Da09ccbbAE6cDaD8398",
    "allowedAddress": "0xta2A135kld7F4d367fa31Da09ccbbAE6cDaD8398"
*/
app.post("/enrollment/allow", async (req, res) => {
  const json = req.body;
  if (!json || !json.contract || !json.allowedAddress) {
    res.sendStatus(400);
    return;
  }
  try {
    const contract = enrollmentproof.getInstance(json.contract);
    await contract.methods
      .allow(json.allowedAddress)
      .send({ from: MTMSK_ACCOUNT, gas: GAS });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

/*
    "contract": "0x3h4j5h8f487F4d367fa31Da09ccbbAE6cDaD8398",
    "disallowedAddress": "0xta2A135kld7F4d367fa31Da09ccbbAE6cDaD8398"
*/
app.post("/enrollment/disallow", async (req, res) => {
  const json = req.body;
  if (!json || !json.contract || !json.disallowedAddress) {
    res.sendStatus(400);
    return;
  }
  try {
    const contract = enrollmentproof.getInstance(json.contract);
    await contract.methods
      .disallow(json.disallowedAddress)
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

    // Getting enrollment proof information
    let info = await instance.methods
      .getInfo()
      .call({ from: MTMSK_ACCOUNT, gas: GAS });

    // Getting the creator account
    let creator_address = await instance.methods.creator().call({
      from: MTMSK_ACCOUNT
    });

    // Getting the subjects
    let qtd = await instance.methods
      .getSubjectAmount()
      .call({ from: MTMSK_ACCOUNT });

    let subjectsList = [];
    for (let i = 0; i < qtd; i++) {
      let info = await instance.methods
        .getSubjects(i)
        .call({ from: MTMSK_ACCOUNT });
      subjectsList.push({
        key: i,
        code: info["0"],
        name: info["1"],
        class: info["2"],
        credit: info["3"],
        schedule: info["4"],
        room: info["5"]
      });
    }

    // Change this after
    let shift = info["5"];
    if (shift == 3) {
      shift = "Integral";
    }

    let json = {
      student: info["0"],
      name: info["1"],
      course: info["2"],
      ingress: info["3"],
      period: info["4"],
      shift: shift,
      subjects: subjectsList,
      contractAddress: address,
      creatorAddress: creator_address
    };
    res.send(json);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

/*
{
    "studentAddress": "0xaa2A138f487F4d367fa31Da09ccbbAE6cDaD8390",
    "genericAddress": "0xba2A138f487F4d367fa31Da09ccbbAE6cDaD8390"
}
*/
app.post("/enrollment/allowed", async (req, res) => {
  if (!req.body || !req.body.studentAddress || !req.body.genericAddress) {
    res.sendStatus(400);
    return;
  }
  try {
    const studentAddress = req.body.studentAddress;
    const genericAddress = req.body.genericAddress;
    const address = await enrollmentcontroller.methods
      .getEnrollment(studentAddress)
      .call({ from: MTMSK_ACCOUNT, gas: GAS });

    const instance = enrollmentproof.getInstance(address);

    // Verifying allowance permission
    const allowed = await instance.methods
      .isAllowed(genericAddress)
      .call({ from: MTMSK_ACCOUNT });

    res.send(allowed);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

/*
{
    "studentAddress": "0xaa2A138f487F4d367fa31Da09ccbbAE6cDaD8390",
    "genericAddress": "0xba2A138f487F4d367fa31Da09ccbbAE6cDaD8390"
}
*/
app.post("/enrollment/allow", async (req, res) => {
  if (!req.body || !req.body.studentAddress || !req.body.genericAddress) {
    res.sendStatus(400);
    return;
  }
  try {
    const studentAddress = req.body.studentAddress;
    const genericAddress = req.body.genericAddress;
    const address = await enrollmentcontroller.methods
      .getEnrollment(studentAddress)
      .call({ from: MTMSK_ACCOUNT, gas: GAS });

    const instance = enrollmentproof.getInstance(address);

    // Verifying allowance permission
    await instance.methods.allow(genericAddress).call({ from: MTMSK_ACCOUNT });

    res.send(200);
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
    "address": "0xba2A138f487F4d367fa31Da09ccbbAE6cDaD8390"
}
*/
app.post("/isCollegiate", async (req, res) => {
  if (!req.body || !req.body.address) {
    res.sendStatus(400);
    return;
  }
  try {
    const address = req.body.address;
    const resp = await enrollmentcontroller.methods
      .isCollegiate(address)
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
      let info = await instance.methods
        .getSubject(i)
        .call({ from: MTMSK_ACCOUNT });
      json.subjects.push({
        code: info["0"],
        name: info["1"],
        class: info["2"],
        credit: info["3"],
        schedule: info["4"],
        room: info["5"]
      });
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
    "contract": "0x2742B66B96207e1267DaEE52F6EC957B03DAdf9A",
    "subject": {
        "code": "",
        "name": "",
        "class": "",
        "credit": "",
        "schedule": "",
        "room": ""
    }
}
*/
app.post("/enrollment/add/subject", async (req, res) => {
  if (!req.body || !req.body.contract || !req.body.subject) {
    res.sendStatus(400);
    return;
  }
  let json = req.body;
  console.log(json);
  const contractAddress = json.contract;
  const { code, name, credit, schedule, room } = json.subject;
  try {
    const instance = enrollmentproof.getInstance(contractAddress);
    await instance.methods
      .addSubject(code, name, json.subject.class, credit, schedule, room)
      .send({ from: MTMSK_ACCOUNT, gas: GAS });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(204);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
