import React, { Component } from "react";
const ModelViewer = require("metamask-logo");

class MetamaskLogo extends Component {
  componentDidMount() {
    const { width, height, move } = this.props;

    // To render with fixed dimensions:
    let viewer = ModelViewer({
      // Dictates whether width & height are px or multiplied
      pxNotRatio: true,
      width: width,
      height: height,
      // pxNotRatio: false,
      // width: 0.9,
      // height: 0.9,

      // To make the face follow the mouse.
      followMouse: false,

      // head should slowly drift (overrides lookAt)
      slowDrift: false
    });

    // add viewer to DOM
    let container = document.getElementById("logo-container");
    container.appendChild(viewer.container);

    // look at something on the page
    viewer.lookAt({
      x: 35,
      y: 35
    });

    // enable mouse follow
    viewer.setFollowMouse(move);

    // deallocate nicely
    viewer.stopAnimation();
  }

  render() {
    return <div id="logo-container" />;
  }
}

export default MetamaskLogo;
