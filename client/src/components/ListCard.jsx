import React, { Component } from "react";

class ListCard extends Component {
  render() {
    const scrolled = {
      overflowY: "scroll",
      overflowX: "hidden",
      height: 400,
      padding: 10
    };

    const { title, list } = this.props;
    let i = 0;
    return (
      <div className="col s12 m6">
        <div className="card white large">
          <div className="card-content black-text">
            <span className="card-title">{title}</span>
            <div style={scrolled}>
              {list.map(text => (
                <div key={i++} className="card-panel white">
                  <div className="black-text">
                    <label className="black-text">{text}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListCard;