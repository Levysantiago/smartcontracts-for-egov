import React, { Component } from "react";

class TeamCard extends Component {
  render() {
    const { title, content, imgName, alt, link } = this.props;
    return (
      <div className="col s12 m6">
        <div className="card">
          <div className="card-image">
            <img src={require("../images/" + imgName)} alt={alt} />
          </div>
          <div className="card-content black-text">
            <span className="card-title" style={{ fontSize: "18px" }}>
              {title}
            </span>
            <label>{content}</label>
            <br />
          </div>
          <div className="card-action center">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={require("../images/linkedin.png")} alt="" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamCard;
