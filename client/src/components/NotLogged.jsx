import React, { Component } from "react";
import MetamaskLogo from "./MetamaskLogo";

class NotLogged extends Component {
  render() {
    const style = {
      marginTop: 100
    };

    return (
      <div style={style} className="container row center">
        <div className="col s6 offset-s3">
          <div className="card white">
            <div className="card-content black-text">
              <span className="card-title">Login Required</span>
              <MetamaskLogo width={200} height={100} move={true} />
              <p>
                Please, Login on Metamask to use the system. Then refresh the
                page
              </p>
              <br />
              <a href="" className="waves-effect waves-light btn">
                refresh
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotLogged;
