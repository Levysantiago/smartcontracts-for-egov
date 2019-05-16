import React, { Component } from "react";

class Loader extends Component {
  render() {
    // "active" to turn on
    const { state, msg } = this.props;
    return (
      <div className="col s12 center">
        <label className="col s12">{msg}</label>
        <div className={"preloader-wrapper small " + state}>
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;
