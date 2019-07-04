import React, { Component } from "react";
import Content from "./Content";

class Contents extends Component {
  getContent(c) {
    if (c.typed) {
      return (
        <Content
          key={c.id}
          title={c.title}
          content={c.content}
          tag={c.tag}
          titleColor="#ffffff"
          contentColor="#e8e8e8"
          background="linear-gradient(to bottom left, #00838f 0%, #3333cc 100%)"
          //backgroundColor="#00838f"
        />
      );
    } else {
      return (
        <Content
          key={c.id}
          title={c.title}
          content={c.content}
          tag={c.tag}
          titleColor="#000000"
          contentColor="rgba(32, 21, 18, 0.6)"
          backgroundColor="#ffffff"
        />
      );
    }
  }
  render() {
    const { contents } = this.props;
    return <div>{contents.map(c => this.getContent(c))}</div>;
  }
}

export default Contents;
