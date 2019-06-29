import React, { Component } from "react";

class EnrollmentForm extends Component {
  resetInput = input => {
    input.value = "";
    input.className = "active";
  };

  resetSelect = select => {
    select.value = "1";
  };

  componentDidMount = () => {
    let elems = document.querySelectorAll("select");
    let options = document.querySelectorAll("option");
    window.M.FormSelect.init(elems, options);
  };

  printTitle = edit => {
    if (edit) {
      return <span className="card-title">Editar Matrícula</span>;
    } else {
      return <span className="card-title">Nova Matrícula</span>;
    }
  };

  printButton = (edit, onclick, onedit) => {
    if (edit) {
      return (
        <button
          className="waves-effect small waves-light btn"
          onClick={async () => {
            await onedit();
            this.resetInput(document.getElementById("name"));
            this.resetInput(document.getElementById("course"));
            this.resetInput(document.getElementById("ingress"));
            this.resetInput(document.getElementById("period"));
            this.resetInput(document.getElementById("shift"));
            this.resetInput(document.getElementById("student"));
          }}
        >
          Editar
        </button>
      );
    } else {
      return (
        <button
          className="waves-effect small waves-light btn"
          onClick={async () => {
            await onclick();
            this.resetInput(document.getElementById("name"));
            this.resetInput(document.getElementById("course"));
            this.resetInput(document.getElementById("ingress"));
            this.resetInput(document.getElementById("period"));
            this.resetInput(document.getElementById("shift"));
            this.resetInput(document.getElementById("student"));
          }}
        >
          Adicionar
        </button>
      );
    }
  };

  printAccountInput = (edit, onchange, value) => {
    if (edit) {
      return (
        <input
          id="student"
          type="text"
          className="validate"
          name="student"
          value={value}
          disabled
        />
      );
    } else {
      return (
        <input
          id="student"
          type="text"
          className="validate"
          onChange={onchange.bind(this)}
          name="student"
        />
      );
    }
  };

  render() {
    const { edit } = this.props;
    if (edit) {
      return <div className="col s12 m6">{this.printEditForm(this.props)}</div>;
    } else {
      return <div className="col s12 m6">{this.printAddForm(this.props)}</div>;
    }
  }

  printAddForm = props => {
    const { onChange, onClick, lang } = props;
    return (
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">{lang.ENR_FRM_TITLE}</span>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="name"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="name"
              />
              <label className="active" htmlFor="name">
                {lang.ENR_FRM_NAME}
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="course"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="course"
              />
              <label className="active" htmlFor="course">
                {lang.ENR_FRM_COURSE}
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="ingress"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="ingress"
              />
              <label className="active" htmlFor="ingress">
                {lang.ENR_FRM_INGRESS}
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="period"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="period"
              />
              <label className="active" htmlFor="period">
                {lang.ENR_FRM_PERIOD}
              </label>
            </div>

            <div className="input-field col s6">
              <select
                id="shift"
                name="shift"
                value="1"
                onChange={onChange.bind(this)}
              >
                <option value="1">{lang.ENR_FRM_SCHEDULE_MORNING}</option>
                <option value="2">{lang.ENR_FRM_SCHEDULE_EVENING}</option>
                <option value="3">{lang.ENR_FRM_SCHEDULE_NIGHT}</option>
                <option value="4">{lang.ENR_FRM_SCHEDULE_INTEGRAL}</option>
              </select>
              <label>{lang.ENR_FRM_SCHEDULE}</label>
            </div>

            <div className="input-field col s12">
              <input
                id="student"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="student"
              />
              <label className="active" htmlFor="student">
                {lang.ENR_FRM_METAMASK_ACCOUNT}
              </label>
            </div>
          </div>
        </div>
        <div className="card-action" id="addMatricula">
          <button
            className="waves-effect small waves-light btn"
            onClick={async () => {
              await onClick();
              this.resetInput(document.getElementById("name"));
              this.resetInput(document.getElementById("course"));
              this.resetInput(document.getElementById("ingress"));
              this.resetInput(document.getElementById("period"));
              this.resetSelect(document.getElementById("shift"));
              this.resetInput(document.getElementById("student"));
            }}
          >
            {lang.ENR_FRM_BTN_ADD}
          </button>
        </div>
      </div>
    );
  };

  printEditForm = props => {
    const { onChange, onEdit, onCancelEdit, enrollment, lang } = props;
    document.getElementById("name").value = enrollment.name;
    document.getElementById("course").value = enrollment.course;
    document.getElementById("ingress").value = enrollment.ingress;
    document.getElementById("period").value = enrollment.period;
    document.getElementById("shift").value = enrollment.shift;
    document.getElementById("student").value = enrollment.student;

    return (
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">Editar Matrícula</span>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="name"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="name"
                //value={enrollment.name}
              />
              <label className="active" htmlFor="name">
                {lang.ENR_FRM_NAME}
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="course"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="course"
                //value={enrollment.course}
              />
              <label className="active" htmlFor="course">
                {lang.ENR_FRM_COURSE}
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="ingress"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="ingress"
                //value={enrollment.ingress}
              />
              <label className="active" htmlFor="ingress">
                {lang.ENR_FRM_INGRESS}
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="period"
                type="text"
                className="validate"
                onChange={onChange.bind(this)}
                name="period"
                //value={enrollment.period}
              />
              <label className="active" htmlFor="period">
                {lang.ENR_FRM_PERIOD}
              </label>
            </div>

            <div className="input-field col s6">
              <select id="shift" name="shift" onChange={onChange.bind(this)}>
                <option value="1">{lang.ENR_FRM_SCHEDULE_MORNING}</option>
                <option value="2">{lang.ENR_FRM_SCHEDULE_EVENING}</option>
                <option value="3">{lang.ENR_FRM_SCHEDULE_NIGHT}</option>
                <option value="4">{lang.ENR_FRM_SCHEDULE_INTEGRAL}</option>
              </select>
              <label>{lang.ENR_FRM_SCHEDULE}</label>
            </div>

            <div className="input-field col s12">
              <input
                id="student"
                type="text"
                className="validate"
                name="student"
                //value={enrollment.student}
                disabled
              />
              <label className="active" htmlFor="student">
                {lang.ENR_FRM_METAMASK_ACCOUNT}
              </label>
            </div>
          </div>
        </div>
        <div className="card-action" id="addMatricula">
          <button
            className="waves-effect small waves-light grey btn"
            style={{ marginRight: "5px" }}
            onClick={async () => {
              await onCancelEdit();
              this.resetInput(document.getElementById("name"));
              this.resetInput(document.getElementById("course"));
              this.resetInput(document.getElementById("ingress"));
              this.resetInput(document.getElementById("period"));
              this.resetSelect(document.getElementById("shift"));
              this.resetInput(document.getElementById("student"));
            }}
          >
            {lang.ENR_FRM_BTN_CANCEL}
          </button>
          <button
            className="waves-effect small waves-light btn"
            onClick={async () => {
              await onEdit();
              this.resetInput(document.getElementById("name"));
              this.resetInput(document.getElementById("course"));
              this.resetInput(document.getElementById("ingress"));
              this.resetInput(document.getElementById("period"));
              this.resetSelect(document.getElementById("shift"));
              this.resetInput(document.getElementById("student"));
            }}
          >
            {lang.ENR_FRM_BTN_EDIT}
          </button>
        </div>
      </div>
    );
  };
}

export default EnrollmentForm;
