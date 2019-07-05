import React, { Component } from "react";
import TeamCard from "./TeamCard";

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
    const { lang } = this.props;

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
                    alt={lang.IMG_ALT_UESC}
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
              <div className="col l4 s12">
                <h5 className={this.titleColor}>{lang.PROJECT_TITLE}</h5>
                <p className="teal-text text-lighten-4">
                  {lang.PROJECT_ABOUT_SUMMARY}
                </p>
                <h5 className={this.titleColor}>{lang.RESEARCH_GROUP}</h5>
                <p className="teal-text text-lighten-4">
                  {lang.RESEARCH_GROUP_NAME}
                </p>
              </div>
              {/* Right Side */}
              <div className="col l7 offset-l1 s12">
                {/* Team */}
                <h5 className={this.titleColor}>{lang.TEAM}</h5>
                {/* Authors */}
                <TeamCard
                  imgName="jauberth_abijaude.jpg"
                  title="Jauberth Abijaude"
                  content="Professor do Curso de Ciência da Computação"
                  link="https://www.linkedin.com/in/jauberth-abijaude-8a994bb3/"
                />
                <TeamCard
                  imgName="levy_santiago.jpg"
                  title="Levy Santiago"
                  content="Estudante do Curso de Ciência da Computação"
                  link="https://www.linkedin.com/in/levy-santiago-88a807162/"
                />
              </div>

              {/* Final Messages */}
              <div className="col s6 offset-s3" style={{ marginTop: "50px" }}>
                <p className="teal-text text-lighten-4 center-align">
                  {lang.FOOTER_LAST_MESSAGE}
                </p>
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
