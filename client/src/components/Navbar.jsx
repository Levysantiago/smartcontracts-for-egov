import React, { Component } from "react";
import MetamaskLogo from "./MetamaskLogo";

class Navbar extends Component {
  render() {
    const logoStyle = {
      marginTop: 10
    };
    const { address } = this.props;

    return (
      <nav>
        <div className="nav-wrapper row white">
          <div className="brand-logo black-text row">
            <div className="col s2" style={logoStyle}>
              <MetamaskLogo width={50} height={40} move={false} />
            </div>
            <label className="col s10 hide-on-med-and-down">
              Address: {address}
            </label>
          </div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a className="black-text" href="/">
                Controll
              </a>
            </li>
            <li>
              <a className="black-text" href="/student">
                Enrollment
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
