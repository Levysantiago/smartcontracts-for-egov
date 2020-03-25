import React, { Component } from "react";

class ImgCard extends Component {
  render() {
    const { imgPath, link, alt, linkColor, linkName } = this.props;
    return (
      <div className="col s12 m4">
        <div className="card">
          <div className="card-image">
            <img src={imgPath} alt={alt} />
          </div>
          <div className="card-action">
            <a
              href={link}
              style={{ color: linkColor }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkName}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ImgCard;
