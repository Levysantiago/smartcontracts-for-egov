import React, { Component } from "react";

class ImgCard extends Component {
  /*getLinkComponent() {
    const { link, linkName } = this.props;
    if (link && linkName) {
      return (
        <div className="card-action">
          <a
            href={link}
            className=""
            target="_blank"
            rel="noopener noreferrer"
            style={this.imgLinkStyle}
          >
            {linkName}
          </a>
        </div>
      );
    } else {
      return <div className="card-action teal-text text-darken-2">{"."}</div>;
    }
  }*/

  render() {
    const { imgPath, link, alt, linkColor } = this.props;
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
              Mais
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ImgCard;
