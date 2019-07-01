import React, { Component } from "react";
import EnrollmentForm from "../components/EnrollmentForm";
import ListCard from "../components/ListCard";
import Loader from "../components/Loader";
import CardWarning from "../components/CardWarning";
import Navbar from "../components/Navbar";
const { web3 } = require("../lib/web3");

const storage = window.sessionStorage;

class App extends Component {
  state = {
    enrollments: [],
    actualAccount: "",
    edit: false,
    isCollegiate: undefined,
    isStudent: undefined,
    status: "",
    enrollment: {
      student: "",
      name: "",
      course: "",
      ingress: "",
      period: "",
      shift: ""
    },
    loader: "",
    hide: "hide",
    loaderMsg: ""
  };

  componentWillMount() {
    if (!storage.lang) {
      storage.setItem("lang", JSON.stringify(require("../language/pt")));
      storage.setItem("pt", "true");
    }
  }

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    this.setState({
      actualAccount: account[0]
    });
    console.log(account);
    console.log(account[0]);
    await this.verifyAccount(account);
  }

  verifyAccount = async account => {
    //const lang = JSON.parse(storage.getItem("lang"));
    const lang = JSON.parse(storage.getItem("lang"));
    if (account[0]) {
      await this.isCollegiate();
      if (this.state.isCollegiate) {
        await this.updateEnrollmentList();
        this.setState({ status: lang.NAV_STATE_COLLEGIATE });
      } else {
        await this.isStudent();
        if (this.state.isStudent) {
          this.setState({ status: lang.NAV_STATE_STUDENT });
        } else {
          this.setState({ status: lang.NAV_STATE_VISITOR });
        }
      }
    }
  };

  changeLanguage = async () => {
    if (storage.pt === "true") {
      storage.setItem("lang", JSON.stringify(require("../language/en")));
      storage.setItem("pt", "false");
    } else {
      storage.setItem("lang", JSON.stringify(require("../language/pt")));
      storage.setItem("pt", "true");
    }
    const account = await web3.eth.getAccounts();
    this.verifyAccount(account);
  };

  async isStudent() {
    const lang = JSON.parse(storage.getItem("lang"));
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
      if (response.status !== 204) {
        let info = await response.json();
        //window.M.toast({ html: "Conta verificada" });
        //console.log(info);
        this.setState({ isStudent: info });
      } else {
        window.M.toast({ html: lang.ERR_VERIFYING_ACCOUNT });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_VERIFYING_ACCOUNT });
      console.error(e.message);
    }
    this.loaderOff();
  }

  async isCollegiate() {
    const lang = JSON.parse(storage.getItem("lang"));
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

  updateEnrollmentList = async () => {
    const lang = JSON.parse(storage.getItem("lang"));
    this.loaderOn(lang.MSG_LISTING_ENROLLMENTS);
    try {
      let response = await fetch("/enrollment/list");
      const list = await response.json();
      this.setState({
        enrollments: list.list
      });
    } catch (e) {
      console.error(e.message);
    }
    this.loaderOff();
  };

  onChange = event => {
    let newEnrollment = this.state.enrollment;
    newEnrollment[event.target.name] = event.target.value;
    this.setState({ enrollment: newEnrollment });
    //console.log(this.state.enrollment);
  };

  onEnrollmentClick = async event => {
    const lang = JSON.parse(storage.getItem("lang"));
    let json = {
      contract: event.target.innerHTML
    };
    try {
      this.loaderOn(lang.MSG_GETTING_INFO);
      let response = await fetch("/enrollment/info", {
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
        this.setState({ enrollment: info, edit: true });
      } else {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_SENDING_DATA });
      console.error(e.message);
    }
    this.loaderOff();
  };

  onEdit = async () => {
    const lang = JSON.parse(storage.getItem("lang"));
    this.loaderOn(lang.MSG_EDITING_ENROLLMENT);
    window.M.toast({ html: lang.MSG_DATA_SENT });
    try {
      let response = await fetch("/enrollment/edit", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.enrollment)
      });
      if (response.status === 200) {
        window.M.toast({ html: lang.MSG_ENROLLMENT_EDITED });
        this.setState({ edit: false });
      } else {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
      }
      await this.updateEnrollmentList();
      this.loaderOff();
    } catch (e) {
      console.error(e.message);
    }
  };

  onCancelEdit = async () => {
    this.setState({ edit: false });
  };

  onClick = async () => {
    const lang = JSON.parse(storage.getItem("lang"));
    this.loaderOn(lang.MSG_ADDING_NEW_ENROLLMENT);
    window.M.toast({ html: lang.MSG_DATA_SENT });
    try {
      let response = await fetch("/enrollment/create", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.enrollment)
      });
      if (response.status === 200) {
        window.M.toast({ html: lang.MSG_ENROLLMENT_ADDED });
      } else {
        window.M.toast({ html: lang.ERR_SENDING_DATA });
      }
      await this.updateEnrollmentList();
      this.loaderOff();
    } catch (e) {
      console.error(e.message);
    }
  };

  loaderOn = msg => {
    this.setState({ loader: "active", loaderMsg: msg, hide: "hide" });
  };

  loaderOff = () => {
    this.setState({ loader: "", loaderMsg: "", hide: "" });
  };

  render() {
    const {
      enrollments,
      edit,
      isCollegiate,
      enrollment,
      actualAccount,
      loader,
      hide,
      loaderMsg,
      status
    } = this.state;

    const lang = JSON.parse(storage.lang);

    if (isCollegiate !== undefined && !isCollegiate) {
      return (
        <div>
          <Navbar
            address={actualAccount}
            status={status}
            onLanguageChange={this.changeLanguage}
            lang={lang}
          />

          <CardWarning
            title="Sem permissão"
            content={lang.MSG_NO_PAGE_PERMISSION}
          />
        </div>
      );
    }
    if (actualAccount) {
      return (
        <div className="App">
          <Navbar
            address={actualAccount}
            status={status}
            onLanguageChange={this.changeLanguage}
            lang={lang}
          />
          <div className="container row center">
            <div className={hide}>
              <EnrollmentForm
                onClick={this.onClick}
                onEdit={this.onEdit}
                onCancelEdit={this.onCancelEdit}
                onChange={this.onChange}
                edit={edit}
                enrollment={enrollment}
                lang={lang}
              />
              <ListCard
                title={lang.CARD_LIST_TITLE}
                list={enrollments}
                onClick={this.onEnrollmentClick}
              />
            </div>
            <br />
            <Loader state={loader} msg={loaderMsg} />
          </div>
        </div>
      );
    } else {
      return (
        <CardWarning
          title="Login Required"
          content={lang.MSG_NO_METAMASK_LOGIN}
        />
      );
    }
  }
}

export default App;
