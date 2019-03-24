import React, { Component } from "react";
import "./home.less";
// import { Button } from "antd";
import { Button as Abutton } from "@alifd/next";
import headimg from "@assets/img/wangmen.png";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="userinfo">
          <div className="userimg">
            <img src={headimg} alt="" />
          </div>
          <div className="usertext">
            <div className="user_tit">Futurefinger.Hawer.Mr.H</div>
            <div className="user_context">
              I am a front-end engineer, and I like to write front-end
              projects with mv* framework. The commonly used framework is
              react/vue, I know node.js, and I also explore the back-end
              field.
              <div className="user_ctrl ghost-light-background">
                <Abutton ghost="light">Read More</Abutton>
              </div>
              {/* <Button type="primary" ghost>
              Primary
            </Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
