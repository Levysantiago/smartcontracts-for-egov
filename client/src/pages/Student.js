import React, { Component } from "react";
import EnrollmentCard from "../components/EnrollmentCard";
import Loader from "../components/Loader";
const { web3 } = require("../lib/web3");

class Student extends Component {
  state = {
    actualAccount: "",
    isStudent: undefined,
    enrollment: {
      student: "",
      name: "Carlos",
      course: "CIC",
      ingress: "20152",
      period: "20191",
      shift: "3",
      subjects: [],
      contractAddress: ""
    },
    subject: {},
    loader: "",
    loaderMsg: ""
  };

  loaderOn = msg => {
    let enrollment = this.state.enrollment;
    enrollment.student = "";
    this.setState({ enrollment });
    this.setState({ loader: "active", loaderMsg: msg });
  };

  loaderOff = () => {
    this.setState({ loader: "", loaderMsg: "" });
  };

  async isStudent() {
    const json = {
      studentAddress: this.state.actualAccount
    };
    try {
      this.loaderOn("Verificando conta");
      let response = await fetch("/isStudent", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      });
      if (response.status !== 204) {
        let info = await response.json();
        //window.M.toast({ html: "Conta verificada" });
        console.log(info);
        this.setState({ isStudent: info });
      } else {
        window.M.toast({ html: "Erro ao enviar dados" });
      }
    } catch (e) {
      window.M.toast({ html: "Erro ao enviar dados" });
      console.error(e.message);
    }
    this.loaderOff();
  }

  onChange = event => {
    let subject = this.state.subject;
    subject[event.target.name] = event.target.value;
    this.setState({ subject });
    console.log(this.state.subject);
  };

  addSubject = async () => {
    const { code, subjectName, credit, schedule, room } = this.state.subject;
    const json = {
      contract: this.state.enrollment.contractAddress,
      subject: {
        code: code,
        name: subjectName,
        class: this.state.subject.class,
        credit: credit,
        schedule: schedule,
        room: room
      }
    };
    try {
      this.loaderOn("Adding new subject");
      let response = await fetch("/enrollment/add/subject", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      });
      if (response.status !== 204) {
        await this.getEnrollmentInfo();
        window.M.toast({ html: "Subject added!" });
      } else {
        window.M.toast({ html: "Erro ao enviar dados" });
      }
    } catch (e) {
      window.M.toast({ html: "Erro ao enviar dados" });
      console.error(e.message);
    }
    this.loaderOff();
  };

  async getEnrollmentInfo() {
    await this.isStudent();
    if (this.state.isStudent) {
      try {
        const json = {
          studentAddress: this.state.actualAccount
        };

        this.loaderOn("Obtendo informações");
        let response = await fetch("/enrollment/infoByStudent", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(json)
        });

        if (response.status !== 204) {
          let info = await response.json();

          //window.M.toast({ html: "Informações retornadas" });
          console.log(info);
          this.setState({ enrollment: info });
        } else {
          window.M.toast({ html: "Erro ao enviar dados" });
        }
      } catch (e) {
        window.M.toast({ html: "Erro ao enviar dados" });
        console.error(e.message);
      }
      this.loaderOff();
    }
  }

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    this.setState({
      actualAccount: account[0]
    });

    await this.getEnrollmentInfo();
  }

  render() {
    const {
      actualAccount,
      isStudent,
      enrollment,
      loader,
      loaderMsg
    } = this.state;

    if (actualAccount) {
      if (isStudent === undefined || isStudent) {
        if (enrollment.student) {
          return (
            <div className="container row">
              <h1 className="col s12 center">Student Page</h1>
              <EnrollmentCard
                onChange={this.onChange}
                onAddSubject={this.addSubject}
                enrollment={enrollment}
              />
            </div>
          );
        } else {
          return (
            <div className="container row">
              <h1 className="col s12 center">Student Page</h1>
              <Loader state={loader} msg={loaderMsg} />
            </div>
          );
        }
      } else {
        return (
          <div className="container row">
            <h1 className="col s12 center">Student Page</h1>
            <label className="col s12 center">
              Desculpa você não é estudante
            </label>
          </div>
        );
      }
    } else {
      return (
        <div className="App container row">
          <label className="col s12">
            Por favor, realize o login no Metamask
          </label>
          <div className="col s12">
            <a href="/" className="waves-effect waves-light btn">
              refresh
            </a>
          </div>
        </div>
      );
    }
  }
}

export default Student;
