import React, { Component } from "react";
import EnrollmentForm from "../components/EnrollmentForm";
import ListCard from "../components/ListCard";
import Loader from "../components/Loader";
import NotLogged from "../components/NotLogged";
import Navbar from "../components/Navbar";
const { web3 } = require("../lib/web3");

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

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    this.setState({
      actualAccount: account[0]
    });
    if (account[0]) {
      await this.isCollegiate();
      if (this.state.isCollegiate) {
        await this.updateEnrollmentList();
        this.setState({ status: "Colegiado" });
      } else {
        await this.isStudent();
        if (this.state.isStudent) {
          this.setState({ status: "Student" });
        } else {
          this.setState({ status: "Visitor" });
        }
      }
    }
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
      if (response.status !== 204) {
        let info = await response.json();
        //window.M.toast({ html: "Conta verificada" });
        //console.log(info);
        this.setState({ isStudent: info });
      } else {
        window.M.toast({ html: "Erro ao verificar conta" });
      }
    } catch (e) {
      window.M.toast({ html: "Erro ao verificar conta" });
      console.error(e.message);
    }
    this.loaderOff();
  }

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

  updateEnrollmentList = async () => {
    this.loaderOn("Listando matrículas");
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
      window.M.toast({ html: "Erro ao enviar dados" });
      console.error(e.message);
    }
    this.loaderOff();
  };

  onEdit = async () => {
    this.loaderOn("Editando matrícula");
    window.M.toast({ html: "Dados enviados" });
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
        window.M.toast({ html: "Matrícula editada" });
        this.setState({ edit: false });
      } else {
        window.M.toast({ html: "Erro ao enviar dados" });
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
    if (isCollegiate != undefined && !isCollegiate) {
      return (
        <div>
          <Navbar address={actualAccount} status={status} />

          <div className="container row center">
            <label className="col s12">
              Desculpa, mas esta conta não tem permissão para acessar a página.
            </label>
            <div className="col s12">
              <a href="/" className="waves-effect waves-light btn">
                refresh
              </a>
            </div>
          </div>
        </div>
      );
    }
    if (actualAccount) {
      return (
        <div className="App">
          <Navbar address={actualAccount} status={status} />
          <div className="container row center">
            <div className={hide}>
              <EnrollmentForm
                onClick={this.onClick}
                onEdit={this.onEdit}
                onCancelEdit={this.onCancelEdit}
                onChange={this.onChange}
                edit={edit}
                enrollment={enrollment}
              />
              <ListCard
                title="Matrículas"
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
      return <NotLogged />;
    }
  }
}

export default App;
