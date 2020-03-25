import React, { Component } from "react";
import ImgCard from "./ImgCard";

class Tools extends Component {
  render() {
    const { images, linkColor } = this.props;
    return (
      <div>
        {images.map(image => (
          <ImgCard
            key={image.id}
            imgPath={require("../images/" + image.filename)}
            link={image.link}
            alt={image.alt}
            linkColor={linkColor}
            linkName={image.linkName}
          />
        ))}
      </div>
    );
  }
}

export default Tools;
