import React, { Component } from "react";
import Input from "./Input";

class EnrollmentCard extends Component {
  componentDidMount() {
    const { enrollment, addSubjectsOff } = this.props;
    if (enrollment) {
      document.getElementById("account").value = enrollment.student;
      document.getElementById("name").value = enrollment.name;
      document.getElementById("course").value = enrollment.course;
      document.getElementById("ingress").value = enrollment.ingress;
      document.getElementById("period").value = enrollment.period;
      document.getElementById("shift").value = enrollment.shift;
      document.getElementById("creator").value = enrollment.creatorAddress;
      document.getElementById("contract").value = enrollment.contractAddress;
    }
    if (addSubjectsOff) {
      document.getElementById("subjects-reveal").hidden = addSubjectsOff;
      document.getElementById("reveal-button").hidden = addSubjectsOff;
    }
  }

  resetInput = input => {
    input.value = "";
    input.className = "active";
  };

  allowanceForm = () => {
    const {
      onChangeAllowance,
      onClickAllow,
      onClickDisallow,
      lang
    } = this.props;
    return (
      <div className="row">
        <div className="col s6">
          <br />
          <span className="card-title grey-text text-darken-4">
            {lang.INPUT_ALLOW_DISALLOW}
          </span>
          <Input
            col="s12"
            id="allowedAddress"
            name="allowedAddress"
            title={lang.SUBJECT_FRM_METAMASK_ACCOUNT}
            onChange={onChangeAllowance.bind(this)}
          />
          <button
            className="col s4 waves-effect waves-light btn-large"
            onClick={onClickAllow}
          >
            {lang.ALLOW_BTN_NAME}
          </button>
          <button
            className="col s4 offset-s2 waves-effect waves-light btn-large"
            onClick={onClickDisallow}
          >
            {lang.DISALLOW_BTN_NAME}
          </button>
        </div>
      </div>
    );
  };

  newSubjectForm = () => {
    const { onChange, onAddSubject, lang } = this.props;
    return (
      <div>
        <span className="card-title grey-text text-darken-4">
          {lang.INPUT_ADD_NEW_SUBJECT}
          <i className="material-icons right">close</i>
        </span>
        <Input
          col="s4"
          id="code"
          name="code"
          title={lang.SUBJECT_FRM_CODE}
          onChange={onChange}
        />
        <Input
          col="s4"
          id="subjectName"
          name="subjectName"
          title={lang.SUBJECT_FRM_NAME}
          onChange={onChange}
        />
        <Input
          col="s4"
          id="class"
          name="class"
          title={lang.SUBJECT_FRM_CLASS}
          onChange={onChange}
        />
        <Input
          col="s4"
          id="credit"
          name="credit"
          title={lang.SUBJECT_FRM_CREDIT}
          onChange={onChange}
        />
        <Input
          col="s4"
          id="schedule"
          name="schedule"
          title={lang.SUBJECT_FRM_SCHEDULE}
          onChange={onChange}
        />
        <Input
          col="s4"
          id="room"
          name="room"
          title={lang.SUBJECT_FRM_ROOM}
          onChange={onChange}
        />
        <button
          className="waves-effect waves-light btn-large"
          onClick={async () => {
            await onAddSubject();
          }}
        >
          {lang.SUBJECT_ADD_BTN_NAME}
        </button>

        {this.allowanceForm()}
      </div>
    );
  };

  render() {
    const { lang } = this.props;
    return (
      <div className="col s12">
        <div className="card white">
          <div className="card-content black-text row">
            <span className="card-title">{lang.ENROLLMENT_CARD_TITLE}</span>
            <Input
              col="s6"
              id="creator"
              name="creator"
              title={lang.ENR_FRM_METAMASK_INSTITUTE_ACCOUNT}
              disabled={true}
            />
            <Input
              col="s6"
              id="contract"
              name="contract"
              title={lang.ENR_FRM_METAMASK_CONTRACT_ACCOUNT}
              disabled={true}
            />

            <Input
              col="s4"
              id="account"
              name="account"
              title={lang.ENR_FRM_METAMASK_STUDENT_ACCOUNT}
              disabled={true}
            />
            <Input
              col="s6"
              id="name"
              name="name"
              title={lang.ENR_FRM_NAME}
              disabled={true}
            />
            <Input
              col="s2"
              id="ingress"
              name="ingress"
              title={lang.ENR_FRM_INGRESS}
              disabled={true}
            />

            <Input
              col="s8"
              id="course"
              name="course"
              title={lang.ENR_FRM_COURSE}
              disabled={true}
            />
            <Input
              col="s2"
              id="period"
              name="period"
              title={lang.ENR_FRM_PERIOD}
              disabled={true}
            />
            <Input
              col="s2"
              id="shift"
              name="shift"
              title={lang.ENR_FRM_SCHEDULE}
              disabled={true}
            />
            {/*Subjects*/}
            <span className="card-title">{lang.SUBJECT_FRM_SUBJECTS_LIST}</span>
            <table>
              <thead>
                <tr>
                  <th>{lang.SUBJECT_FRM_CODE}</th>
                  <th>{lang.SUBJECT_FRM_SUBJECT}</th>
                  <th>{lang.SUBJECT_FRM_CLASS}</th>
                  <th>{lang.SUBJECT_FRM_CREDIT}</th>
                  <th>{lang.SUBJECT_FRM_SCHEDULE}</th>
                  <th>{lang.SUBJECT_FRM_ROOM}</th>
                </tr>
              </thead>

              <tbody>
                {this.props.enrollment.subjects.map(s => (
                  <tr key={s.key}>
                    <td>{s.code}</td>
                    <td>{s.name}</td>
                    <td>{s.class}</td>
                    <td>{s.credit}</td>
                    <td>{s.schedule}</td>
                    <td>{s.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="reveal-button" className="card-action">
            <a href="javascript:void(0)" className="activator">
              {lang.SUBJECTS_MANAGEMENT_BTN_NAME}
            </a>
          </div>
          <div id="subjects-reveal" className="card-reveal">
            {this.newSubjectForm()}
          </div>
        </div>
      </div>
    );
  }
}

export default EnrollmentCard;
