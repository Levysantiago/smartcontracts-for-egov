import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contents from "../components/Contents";
import Tools from "../components/Tools";
const { web3 } = require("../lib/web3");
const colors = require("../lib/colors");

const storage = window.sessionStorage;

class Home extends Component {
  state = {
    actualAccount: "",
    isStudent: undefined,
    isCollegiate: undefined,
    status: "",
    contents: [
      {
        title: "",
        content: "",
        typed: false
      }
    ],
    images: []
  };

  async isStudent() {
    const lang = JSON.parse(storage.getItem("lang"));
    const json = {
      studentAddress: this.state.actualAccount
    };
    try {
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
        this.setState({ isStudent: info });
      } else {
        window.M.toast({ html: lang.ERR_VERIFYING_ACCOUNT });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_VERIFYING_ACCOUNT });
      console.error(e.message);
    }
  }

  async isCollegiate() {
    const lang = JSON.parse(storage.getItem("lang"));
    const json = {
      address: this.state.actualAccount
    };
    try {
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
        this.setState({ isCollegiate: info });
      } else {
        window.M.toast({ html: lang.ERR_VERIFYING_ACCOUNT });
      }
    } catch (e) {
      window.M.toast({ html: lang.ERR_VERIFYING_ACCOUNT });
      console.error(e.message);
    }
  }

  async defineStatus() {
    const { actualAccount } = this.state;
    const lang = JSON.parse(storage.getItem("lang"));
    console.log(lang);
    if (actualAccount) {
      await this.isStudent();
      if (this.state.isStudent === false) {
        await this.isCollegiate();
        if (this.state.isCollegiate) {
          this.setState({ status: lang.NAV_STATE_COLLEGIATE });
        } else {
          this.setState({ status: lang.NAV_STATE_VISITOR });
        }
      } else {
        this.setState({ status: lang.NAV_STATE_STUDENT });
      }
    }
  }

  setUpContent() {
    const lang = JSON.parse(storage.getItem("lang"));

    let images = [
      {
        id: 1,
        filename: "nodejs.jpg",
        link: "https://nodejs.org",
        alt: lang.IMG_ALT_NODE
      },
      {
        id: 2,
        filename: "react.jpg",
        link: "https://pt-br.reactjs.org/",
        alt: lang.IMG_ALT_REACT
      },
      {
        id: 3,
        filename: "ethereum.jpg",
        link: "https://www.ethereum.org/",
        alt: lang.IMG_ALT_ETHEREUM
      },
      {
        id: 4,
        filename: "metamask.jpg",
        link: "https://metamask.io/",
        alt: lang.IMG_ALT_METAMASK
      },
      {
        id: 5,
        filename: "github.jpg",
        link: "https://github.com",
        alt: lang.IMG_ALT_GITHUB
      },
      {
        id: 6,
        filename: "web3.jpg",
        link: "https://web3js.readthedocs.io",
        alt: lang.IMG_ALT_WEB3
      }
    ];

    let contents = [
      {
        id: 1,
        title: lang.HOME_ABOUT_TITLE,
        content: lang.HOME_ABOUT
      },
      {
        id: 2,
        title: lang.HOME_ABSTRACT_TITLE,
        content: lang.HOME_ABSTRACT,
        typed: true
      },
      {
        id: 3,
        title: lang.HOME_OBJECTIVE_TITLE,
        content: lang.HOME_OBJECTIVES
      },
      {
        id: 4,
        title: "Ferramentas",
        tag: <Tools linkColor={colors.CARD_LINK} images={images} />,
        typed: true
      }
    ];

    this.setState({ contents, images });
  }

  async componentDidMount() {
    const account = await web3.eth.getAccounts();
    this.setState({
      actualAccount: account[0]
    });

    await this.defineStatus();
  }

  componentWillMount() {
    if (!storage.lang) {
      storage.setItem("lang", JSON.stringify(require("../language/pt")));
      storage.setItem("pt", "true");
    }

    this.setUpContent();
  }

  changeLanguage = async () => {
    if (storage.pt === "true") {
      storage.setItem("lang", JSON.stringify(require("../language/en")));
      storage.setItem("pt", "false");
    } else {
      storage.setItem("lang", JSON.stringify(require("../language/pt")));
      storage.setItem("pt", "true");
    }
    window.location.reload();
  };

  render() {
    const lang = JSON.parse(storage.lang);
    const { contents, actualAccount, status } = this.state;

    return (
      <div>
        <Navbar
          address={actualAccount}
          status={status}
          onLanguageChange={this.changeLanguage}
          lang={lang}
        />

        <Contents contents={contents} />

        <Footer lang={lang} />
      </div>
    );
  }
}

export default Home;
