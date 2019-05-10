import React, { Component } from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import ListCard from "./components/ListCard";
import Loader from "./components/Loader";
import "./App.css";
const { web3 } = require("./lib/web3");

class App extends Component {
  state = {
    enrollments: [],
    actualAccount: "",
    edit: false,
    enrollment: {
      student: "",
      name: "",
      course: "",
      ingress: "",
      period: "",
      shift: ""
    },
    loader: "",
    loaderMsg: ""
  };

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    this.loaderOn("Listando matrículas");
    this.setState({
      actualAccount: account[0]
    });
    await this.updateEnrollmentList();
    this.loaderOff();
  }

  updateEnrollmentList = async () => {
    try {
      let response = await fetch("/enrollment/list");
      const list = await response.json();
      this.setState({
        enrollments: list.list
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  onChange = event => {
    let newEnrollment = this.state.enrollment;
    newEnrollment[event.target.name] = event.target.value;
    this.setState({ enrollment: newEnrollment });
    //console.log(this.state.enrollment);
  };

  onEnrollmentClick = async event => {
    let json = {
      contract: event.target.innerHTML
    };
    try {
      this.loaderOn("Obtendo informações");
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
        window.M.toast({ html: "Informações retornadas" });
        console.log(info);
        this.setState({ enrollment: info, edit: true });
      } else {
        window.M.toast({ html: "Erro ao enviar dados" });
      }
    } catch (e) {
      console.error(e.message);
    }
    this.loaderOff();
  };

  onEdit = async () => {
    console.log(this.state.enrollment);
    this.setState({ edit: false });
  };

  onClick = async () => {
    this.loaderOn("Adicionando nova matrícula");
    window.M.toast({ html: "Dados enviados" });
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
        window.M.toast({ html: "Matrícula adicionada" });
      } else {
        window.M.toast({ html: "Erro ao enviar dados" });
      }
      await this.updateEnrollmentList();
      this.loaderOff();
    } catch (e) {
      console.error(e.message);
    }
  };

  loaderOn = msg => {
    this.setState({ loader: "active", loaderMsg: msg });
  };

  loaderOff = () => {
    this.setState({ loader: "", loaderMsg: "" });
  };

  render() {
    const {
      enrollments,
      edit,
      enrollment,
      actualAccount,
      loader,
      loaderMsg
    } = this.state;
    if (actualAccount) {
      return (
        <div className="App">
          <div className="container row">
            <label className="col s12">Account: {actualAccount}</label>
            <EnrollmentForm
              onClick={this.onClick}
              onEdit={this.onEdit}
              onChange={this.onChange}
              edit={edit}
              enrollment={enrollment}
            />
            <ListCard
              title="Matrículas"
              list={enrollments}
              onClick={this.onEnrollmentClick}
            />
            <Loader state={loader} msg={loaderMsg} />
          </div>
        </div>
      );
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

export default App;
