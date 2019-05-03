import React, { Component } from "react";
import EnrollmentForm from "./components/EnrollmentForm";
import ListCard from "./components/ListCard";
import "./App.css";
const { web3 } = require("./lib/web3");

class App extends Component {
  state = {
    enrollments: [],
    actualAccount: ""
  };

  async componentDidMount() {
    this.setState({
      actualAccount: await web3.eth.getAccounts()
    });
    try {
      let response = await fetch("/enrollment/list");
      const list = await response.json();
      this.setState({
        enrollments: list.list
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  render() {
    const { enrollments, actualAccount } = this.state;
    if (actualAccount) {
      return (
        <div className="App">
          <div className="container row">
            <EnrollmentForm />
            <ListCard title="Matrículas" list={enrollments} />
            <label>Account: {actualAccount}</label>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <label>Por favor, realize o login no Metamask</label>
        </div>
      );
    }
  }
}

export default App;
