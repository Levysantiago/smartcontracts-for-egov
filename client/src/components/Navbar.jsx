import React, { Component } from "react";
import MetamaskLogo from "./MetamaskLogo";

class Navbar extends Component {
  getStatusColor(status) {
    if (status) {
      return "green";
    } else {
      return "grey";
    }
  }

  render() {
    const logoStyle = {
      marginTop: 10
    };
    const { address, status } = this.props;

    return (
      <nav>
        <div className="nav-wrapper row white">
          <div className="brand-logo black-text row">
            <div className="col s2" style={logoStyle}>
              <MetamaskLogo width={50} height={40} move={false} />
            </div>
            <label className="col s10 hide-on-med-and-down">
              Address: {address.toLowerCase()}
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
            <li>
              <a
                className={
                  "btn-floating btn-small z-depth-0 " +
                  this.getStatusColor(status)
                }
                title={status}
              >
                {status.charAt(0)}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
