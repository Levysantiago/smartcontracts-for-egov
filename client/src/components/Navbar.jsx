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

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      let elems = document.querySelectorAll("dropdown-trigger");
      window.M.Dropdown.init(elems, 0);
    });
  }

  render() {
    const logoStyle = {
      marginTop: 10
    };
    const { address, status, onLanguageChange, lang } = this.props;

    return (
      <nav>
        <div className="nav-wrapper row white">
          <div className="brand-logo black-text row">
            <div className="col s2" style={logoStyle}>
              <MetamaskLogo width={50} height={40} move={false} id="2" />
            </div>
            <label className="col s10 hide-on-med-and-down">
              {lang.NAV_ADDRESS}: {address.toLowerCase()}
            </label>
          </div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a className="black-text" href="/">
                {lang.NAV_CONTROLL}
              </a>
            </li>
            <li>
              <a className="black-text" href="/student">
                {lang.NAV_ENROLLMENT}
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
            <li>
              <a
                className="waves-effect waves-light btn-small grey"
                onClick={onLanguageChange}
              >
                {lang.LANG_BUTTON_NAME}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
