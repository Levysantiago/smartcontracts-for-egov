import React, { Component } from "react";

class Footer extends Component {
  titleColor = "white-text text-darken-4";

  imgLinkStyle = { fontSize: "11px" };

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".materialboxed");
      window.M.Materialbox.init(elems, 0);
    });
  }

  render() {
    return (
      <div>
        {/* Divider */}
        <div
          className="divider"
          style={{ marginBottom: "40px", marginTop: "100px" }}
        />

        {/* Brasões */}
        <div className="container row center">
          <div className="col s12 row">
            {/* UESC */}
            <div className="col s12" style={{ marginBottom: "20px" }}>
              <div className="col s12">
                <a
                  href="http://www.uesc.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    width="50"
                    src={require("../images/uesc.png")}
                    alt="UESC University Symbol"
                  />
                </a>
              </div>
              <div className="col s12">
                <label className="">Universidade Estadual de Santa Cruz</label>
              </div>
              <label className="col s12">UESC</label>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer
          className="page-footer"
          style={{
            background:
              "linear-gradient(to bottom left, #00838f 0%, #3333cc 100%)"
          }}
        >
          <div className="container">
            <div className="row">
              {/* Left Side */}
              <div className="col l6 s12">
                <h5 className={this.titleColor}>Smart Contracts 4 E-Gov</h5>
                <p className="teal-text text-lighten-4">...</p>
                <h5 className={this.titleColor}>Research Group</h5>
                <p className="teal-text text-lighten-4">LIF (UESC)</p>
              </div>
              {/* Right Side */}
              <div className="col l5 s12 offset-l1">
                {/* Team */}
                <h5 className={this.titleColor}>Team</h5>
                {/* Researchers */}
                <div className="col l6">
                  <h6 className={this.titleColor}>Researchers</h6>
                  <p>
                    <a
                      className="teal-text text-lighten-4"
                      style={{ textDecoration: "underline" }}
                      href="https://www.linkedin.com/in/jauberth-abijaude-8a994bb3/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Jauberth Abijaude
                    </a>
                  </p>
                </div>
                {/* Students */}
                <div className="col l5 offset-l1">
                  <h6 className={this.titleColor}>Students</h6>
                  <p>
                    <a
                      className="teal-text text-lighten-4"
                      style={{ textDecoration: "underline" }}
                      href="https://www.linkedin.com/in/levy-santiago-88a807162/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Levy Santiago
                    </a>
                  </p>
                </div>
              </div>

              {/* Final Messages */}
              <div className="col s12 center" style={{ marginTop: "50px" }}>
                <p className="teal-text text-lighten-4">message</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">© 2019 LIF Research Group</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
