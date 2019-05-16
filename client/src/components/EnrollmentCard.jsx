import React, { Component } from "react";
import Input from "./Input";

class EnrollmentCard extends Component {
  componentDidMount() {
    const { enrollment } = this.props;
    if (enrollment) {
      document.getElementById("account").value = enrollment.student;
      document.getElementById("name").value = enrollment.name;
      document.getElementById("course").value = enrollment.course;
      document.getElementById("ingress").value = enrollment.ingress;
      document.getElementById("period").value = enrollment.period;
      document.getElementById("shift").value = enrollment.shift;
    }
  }

  render() {
    return (
      <div className="col s12">
        <div className="card white">
          <div className="card-content black-text row">
            <span className="card-title">My Enrollment Proof</span>
            <Input
              col="s4"
              id="account"
              name="account"
              title="Ethereum Account"
              disabled={true}
            />
            <Input
              col="s6"
              id="name"
              name="name"
              title="Name"
              disabled={true}
            />
            <Input
              col="s2"
              id="ingress"
              name="ingress"
              title="Ingress"
              disabled={true}
            />
            <Input
              col="s8"
              id="course"
              name="course"
              title="Course"
              disabled={true}
            />
            <Input
              col="s2"
              id="period"
              name="period"
              title="Period"
              disabled={true}
            />
            <Input
              col="s2"
              id="shift"
              name="shift"
              title="Shift"
              disabled={true}
            />
          </div>
          <div className="card-action">
            <a href="#">Add new Subject?</a>
          </div>
        </div>
      </div>
    );
  }
}

export default EnrollmentCard;
