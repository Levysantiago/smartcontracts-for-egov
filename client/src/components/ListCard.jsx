import React, { Component } from "react";

class ListCard extends Component {
  render() {
    const scrolled = {
      overflowY: "scroll",
      overflowX: "hidden",
      height: 400,
      padding: 10
    };

    const linkStyle = { fontSize: 12 };

    const { title, list, onClick } = this.props;
    let i = 0;
    return (
      <div className="col s12 m6">
        <div className="card white large" style={{ height: 511 }}>
          <div className="card-content black-text">
            <span className="card-title">{title}</span>
            <div style={scrolled}>
              {list.map(text => (
                <div key={i++} className="card-panel white">
                  <div className="black-text">
                    <a
                      href="javascript:void(0)"
                      onClick={onClick}
                      style={linkStyle}
                    >
                      {text}
                    </a>
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
