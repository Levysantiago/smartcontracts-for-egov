import React, { Component } from "react";

class Input extends Component {
  componentDidMount() {
    if (this.props.disabled) {
      document.getElementById(this.props.id).disabled = true;
    }
  }

  getType() {
    if (this.props.type) {
      return this.props.type;
    }
    return "text";
  }

  getOnChange(element) {
    if (typeof this.props.onChange !== "undefined") {
      return this.props.onChange.bind(element);
    }
  }

  render() {
    const { col, placeholder, id, name, classname, title } = this.props;

    return (
      <div className={"input-field col " + col}>
        <div>
          <label>{title}</label>
        </div>
        <input
          placeholder={placeholder}
          id={id}
          name={name}
          type={this.getType()}
          className={"truncate black-text " + classname}
          onChange={this.getOnChange(this)}
        />
      </div>
    );
  }
}

export default Input;
