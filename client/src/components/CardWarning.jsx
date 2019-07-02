import React, { Component } from "react";
import MetamaskLogo from "./MetamaskLogo";

class NotLogged extends Component {
  render() {
    const style = {
      marginTop: 100
    };

    const { title, content, buttonName } = this.props;

    return (
      <div style={style} className="container row center">
        <div className="col s6 offset-s3">
          <div className="card white">
            <div className="card-content black-text">
              <span className="card-title">{title}</span>
              <MetamaskLogo width={200} height={100} move={true} id="1" />
              <p>{content}</p>
              <br />
              <a href="" className="waves-effect waves-light btn">
                {buttonName}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotLogged;
