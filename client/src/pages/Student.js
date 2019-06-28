import React, { Component } from "react";
import EnrollmentCard from "../components/EnrollmentCard";
import Loader from "../components/Loader";
import Input from "../components/Input";
import NotLogged from "../components/NotLogged";
import Navbar from "../components/Navbar";
const { web3 } = require("../lib/web3");

class Student extends Component {
  state = {
    actualAccount: "",
    isStudent: undefined,
    isCollegiate: undefined,
    isAllowed: undefined,
    hideSubjects: false,
    studentAddress: "",
    allowedAddress: "",
    status: "",
    enrollment: {
      student: "",
      name: "",
      course: "",
      ingress: "",
      period: "",
      shift: "",
      subjects: [],
      contractAddress: "",
      creatorAddress: ""
    },
    subject: {},
    loader: "",
    hide: "",
    hideLoader: "",
    loaderMsg: ""
  };

  loaderOn = msg => {
    let enrollment = this.state.enrollment;
    enrollment.student = "";
    this.setState({ enrollment });
    this.setState({
      loader: "active",
      loaderMsg: msg,
      hide: "hide",
      hideLoader: ""
    });
  };

  loaderOff = () => {
    this.setState({
      loader: "",
      loaderMsg: "",
      hide: "",
      hideLoader: "hide"
    });
  };

  async isCollegiate() {
    const json = {
      address: this.state.actualAccount
    };
    try {
      this.loaderOn("Verificando conta");
      let response = await fetch("/isCollegiate", {
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
        //console.log(info);
        this.setState({ isCollegiate: info });
      } else {
        window.M.toast({ html: "Erro ao verificar conta" });
      }
    } catch (e) {
      window.M.toast({ html: "Erro ao verificar conta" });
      console.error(e.message);
    }
    this.loaderOff();
  }

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
      if (response.status === 200) {
        let info = await response.json();
        //window.M.toast({ html: "Conta verificada" });
        //console.log(info);
        this.setState({ isStudent: info, hideSubjects: false });
      } else {
        window.M.toast({ html: "Erro ao enviar dados" });
      }
    } catch (e) {
      window.M.toast({ html: "Erro ao enviar dados" });
      console.error(e.message);
    }
    this.loaderOff();
  }

  async isAllowed() {
    const json = {
      studentAddress: this.state.studentAddress,
      genericAddress: this.state.actualAccount
    };
    try {
      this.loaderOn("Verificando permissão");
      let response = await fetch("/enrollment/allowed", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      });
      if (response.status === 200) {
        let info = await response.json();
        if (!info) {
          window.M.toast({ html: "No permission for this enrollment" });
        }
        this.setState({ isAllowed: info, hideSubjects: true });
      } else {
        window.M.toast({ html: "Erro ao enviar dados" });
      }
    } catch (e) {
      window.M.toast({ html: "Erro ao enviar dados" });
      console.error(e.message);
    }
    this.loaderOff();
  }

  onChangeSubject = event => {
    let subject = this.state.subject;
    subject[event.target.name] = event.target.value;
    this.setState({ subject });
    //console.log(this.state.subject);
  };

  onChangeStudentInput = event => {
    this.setState({ studentAddress: event.target.value });
    //console.log(this.state.studentAddress);
  };

  onChangeAllowance = event => {
    this.setState({ allowedAddress: event.target.value });
    //console.log(this.state.allowedAddress);
  };

  onClickEnrollmentSearch = async () => {
    await this.getEnrollmentInfo();
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
      if (response.status === 200) {
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

  onClickAllow = async () => {
    const { allowedAddress } = this.state;
    const json = {
      contract: this.state.enrollment.contractAddress,
      allowedAddress: allowedAddress
    };
    try {
      this.loaderOn("Allowing address");
      let response = await fetch("/enrollment/allow", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      });
      if (response.status === 200) {
        window.M.toast({ html: "Address allowed" });
        await this.getEnrollmentInfo();
      } else {
        window.M.toast({ html: "Erro ao enviar dados" });
      }
    } catch (e) {
      window.M.toast({ html: "Erro ao enviar dados" });
      console.error(e.message);
    }
    this.loaderOff();
  };

  onClickDisallow = async () => {
    const { allowedAddress } = this.state;
    const json = {
      contract: this.state.enrollment.contractAddress,
      disallowedAddress: allowedAddress
    };
    try {
      this.loaderOn("Disallowing address");
      let response = await fetch("/enrollment/disallow", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      });
      if (response.status === 200) {
        window.M.toast({ html: "Address disallowed" });
        await this.getEnrollmentInfo();
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
    let studentAddress = this.state.actualAccount;
    if (this.state.studentAddress) {
      await this.isAllowed();
      studentAddress = this.state.studentAddress;
    } else {
      await this.isStudent();
    }

    if (this.state.isStudent || this.state.isAllowed) {
      try {
        const json = {
          studentAddress: studentAddress
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

        if (response.status === 200) {
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

    if (account[0]) {
      await this.isCollegiate();
      if (this.state.isCollegiate) {
        this.setState({ status: "Colegiado" });
      } else {
        await this.isStudent();
        /*Atualizando status da conta*/

        if (this.state.isStudent) {
          this.setState({ status: "Student" });
        } else {
          this.setState({ status: "Visitor" });
        }
      }
      await this.getEnrollmentInfo();
    }
  }

  getEnrollmentCard() {
    const { enrollment, hide, hideSubjects } = this.state;
    if (enrollment.student) {
      return (
        <div className={hide}>
          <EnrollmentCard
            onChange={this.onChangeSubject}
            onChangeAllowance={this.onChangeAllowance}
            onAddSubject={this.addSubject}
            onClickAllow={this.onClickAllow}
            onClickDisallow={this.onClickDisallow}
            enrollment={enrollment}
            addSubjectsOff={hideSubjects}
          />
        </div>
      );
    }
  }

  render() {
    const {
      actualAccount,
      isStudent,
      isAllowed,
      loader,
      loaderMsg,
      hide,
      hideLoader,
      status
    } = this.state;

    if (actualAccount) {
      if (isStudent === undefined || isStudent || isAllowed) {
        return (
          <div>
            <Navbar address={actualAccount} status={status} />
            <div className="container row">
              <h1 className="col s12 center">Enrollment Proof Page</h1>
              {this.getEnrollmentCard()}
              <div className={hideLoader}>
                <Loader state={loader} msg={loaderMsg} />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <Navbar address={actualAccount} status={status} />

            <div className="container">
              <div className={"row " + hide}>
                <h1 className="col s12 center">Enrollment Proof Page</h1>
                <label className="col s12 center">
                  Você não é estudante. Tente pesquisar uma matrícula para
                  verificar se tem acesso.
                </label>
              </div>
              <div className={"row " + hide}>
                <Input
                  col="s6"
                  id="student-address"
                  name="student-address"
                  title="Student Address"
                  onChange={this.onChangeStudentInput.bind(this)}
                />
              </div>
              <div className={"row " + hide}>
                <button
                  className="waves-effect waves-light btn col s2"
                  onClick={this.onClickEnrollmentSearch}
                >
                  Search
                </button>
              </div>
              <div className={"row " + hideLoader}>
                <h1 className="col s12 center">Enrollment Proof Page</h1>
                <Loader state={loader} msg={loaderMsg} />
              </div>
            </div>
          </div>
        );
      }
    } else {
      return <NotLogged />;
    }
  }
}

export default Student;
