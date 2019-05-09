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
    enrollment: {
      student: "",
      name: "",
      course: "",
      ingress: "",
      period: "",
      shift: ""
    },
    loader: ""
  };

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    this.setState({
      actualAccount: account[0]
    });
    await this.updateEnrollmentList();
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

  onClick = async () => {
    this.setState({ loader: "active" });
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
      this.setState({ loader: "" });
    } catch (e) {
      console.error(e.message);
    }
  };
  render() {
    const { enrollments, enrollment, actualAccount, loader } = this.state;
    if (actualAccount) {
      return (
        <div className="App">
          <div className="container row">
            <label className="col s12">Account: {actualAccount}</label>
            <EnrollmentForm
              newEnrollment={enrollment}
              onClick={this.onClick}
              onChange={this.onChange}
            />
            <ListCard title="Matrículas" list={enrollments} />
            <Loader state={loader} />
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
