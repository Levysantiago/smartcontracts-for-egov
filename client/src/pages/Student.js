import React, { Component } from "react";
import EnrollmentCard from "../components/EnrollmentCard";
import Loader from "../components/Loader";
import Input from "../components/Input";
import CardWarning from "../components/CardWarning";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const colors = require("../lib/colors");
const { web3 } = require("../lib/web3");

const storage = window.sessionStorage;

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

  changeLanguage = async () => {
    if (storage.pt === "true") {
      storage.setItem("lang", JSON.stringify(require("../language/en")));
      storage.setItem("pt", "false");
    } else {
      storage.setItem("lang", JSON.stringify(require("../language/pt")));
      storage.setItem("pt", "true");
    }
    window.location.reload();
    const account = await web3.eth.getAccounts();
    this.verifyAccount(account);
  };

  async isCollegiate() {
    const lang = JSON.parse(storage.lang);
    const json = {
      address: this.state.actualAccount
    };
    try {
      this.loaderOn(lang.MSG_ACCOUNT_VERIFICATION);
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
        window.M.toast({ html: lang.ERR_VERIFYING_ACCOUNT });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_VERIFYING_ACCOUNT });
      console.error(e.message);
    }
    this.loaderOff();
  }

  async isStudent() {
    const lang = JSON.parse(storage.lang);
    const json = {
      studentAddress: this.state.actualAccount
    };
    try {
      this.loaderOn(lang.MSG_ACCOUNT_VERIFICATION);
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
        this.setState({ isStudent: info, hideSubjects: false });
      } else {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_SENDING_DATA });
      console.error(e.message);
    }
    this.loaderOff();
  }

  async isAllowed() {
    const lang = JSON.parse(storage.lang);
    const json = {
      studentAddress: this.state.studentAddress,
      genericAddress: this.state.actualAccount
    };
    try {
      this.loaderOn(lang.MSG_PERMISSION_VERIFICATION);
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
          window.M.toast({ html: lang.MSG_NO_ENROLLMENT_PERMISSION });
        }
        this.setState({ isAllowed: info, hideSubjects: true });
      } else {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_SENDING_DATA });
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
    const lang = JSON.parse(storage.lang);
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
      this.loaderOn(lang.MSG_ADDING_SUBJECT);
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
        window.M.toast({ html: lang.MSG_SUBJECT_ADDED });
      } else {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_SENDING_DATA });
      console.error(e.message);
    }
    this.loaderOff();
  };

  onClickAllow = async () => {
    const lang = JSON.parse(storage.lang);
    const { allowedAddress } = this.state;
    const json = {
      contract: this.state.enrollment.contractAddress,
      allowedAddress: allowedAddress
    };
    try {
      this.loaderOn(lang.MSG_ALLOWING_ADDRESS);
      let response = await fetch("/enrollment/allow", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      });
      if (response.status === 200) {
        window.M.toast({ html: lang.MSG_ADDRESS_ALLOWED });
        await this.getEnrollmentInfo();
      } else {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_SENDING_DATA });
      console.error(e.message);
    }
    this.loaderOff();
  };

  onClickDisallow = async () => {
    const lang = JSON.parse(storage.lang);
    const { allowedAddress } = this.state;
    const json = {
      contract: this.state.enrollment.contractAddress,
      disallowedAddress: allowedAddress
    };
    try {
      this.loaderOn(lang.MSG_DISALLOWING_ADDRESS);
      let response = await fetch("/enrollment/disallow", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
      });
      if (response.status === 200) {
        window.M.toast({ html: lang.MSG_ADDRESS_DISALLOWED });
        await this.getEnrollmentInfo();
      } else {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_SENDING_DATA });
      console.error(e.message);
    }
    this.loaderOff();
  };

  async getEnrollmentInfo() {
    const lang = JSON.parse(storage.lang);
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

        this.loaderOn(lang.MSG_GETTING_INFO);
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
          window.M.toast({ html: lang.ERR_SENDING_DATA });
        }
      } catch (e) {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
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

    await this.verifyAccount(account);
  }

  verifyAccount = async account => {
    const lang = JSON.parse(storage.getItem("lang"));
    if (account[0]) {
      await this.isCollegiate();
      if (this.state.isCollegiate) {
        this.setState({ status: lang.NAV_STATE_COLLEGIATE });
      } else {
        await this.isStudent();
        /*Atualizando status da conta*/

        if (this.state.isStudent) {
          this.setState({ status: lang.NAV_STATE_STUDENT });
        } else {
          this.setState({ status: lang.NAV_STATE_VISITOR });
        }
      }
      await this.getEnrollmentInfo();
    }
  };

  getEnrollmentCard() {
    const lang = JSON.parse(storage.lang);
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
            buttonColor={colors.NORMAL_BUTTON}
            cancelButtonColor={colors.CANCEL_BUTTON}
            cardLinkColor={colors.CARD_LINK}
            lang={lang}
          />
        </div>
      );
    }
  }

  getBodyContent() {
    const {
      actualAccount,
      isStudent,
      isAllowed,
      loader,
      loaderMsg,
      hide,
      hideLoader
    } = this.state;

    const lang = JSON.parse(storage.lang);

    if (actualAccount) {
      if (isStudent === undefined || isStudent || isAllowed) {
        return (
          <div className="container row">
            <h1 className="col s12 center">{lang.ENROLLMENT_PAGE_TITLE}</h1>
            {this.getEnrollmentCard()}
            <div className={hideLoader}>
              <Loader state={loader} msg={loaderMsg} />
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className={"row " + hide}>
              <h1 className="col s12 center">{lang.ENROLLMENT_PAGE_TITLE}</h1>
              <label className="col s12 center">
                {lang.MSG_YOU_ARE_NOT_STUDENT}
              </label>
            </div>
            <div className={"row " + hide}>
              <Input
                col="s6"
                id="student-address"
                name="student-address"
                title={lang.INPUT_STUDENT_ADDRESS}
                onChange={this.onChangeStudentInput.bind(this)}
              />
            </div>
            <div className={"row " + hide}>
              <button
                className="waves-effect waves-light btn col s2"
                onClick={this.onClickEnrollmentSearch}
              >
                {lang.SEARCH_BTN_NAME}
              </button>
            </div>
            <div className={"row " + hideLoader}>
              <h1 className="col s12 center">{lang.ENROLLMENT_PAGE_TITLE}</h1>
              <Loader state={loader} msg={loaderMsg} />
            </div>
          </div>
        );
      }
    } else {
      return (
        <CardWarning
          title={lang.CARD_LOGIN_REQUIRED_TITLE}
          content={lang.MSG_NO_METAMASK_LOGIN}
          buttonName={lang.REFRESH_BTN_NAME}
          buttonColor={colors.NORMAL_BUTTON}
        />
      );
    }
  }

  render() {
    const { actualAccount, status } = this.state;

    const lang = JSON.parse(storage.lang);

    return (
      <div>
        <Navbar
          address={actualAccount}
          status={status}
          onLanguageChange={this.changeLanguage}
          lang={lang}
        />
        {this.getBodyContent()}

        <Footer />
      </div>
    );
  }
}

export default Student;
