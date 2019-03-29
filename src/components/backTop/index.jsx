import React, { Component } from "react";
import "./backTop.less";
export default class backTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll, true);
  }
  handleScroll(){

    // let scrollTop = document.body.scrollTop;
    let scrollTop = document.querySelector('.wrapper').scrollTop;

    console.log(scrollTop)
    if (scrollTop > 100) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: false
      });
    }
  };
  // 回到过去
  backTop() {
    document.body.scrollTop = 0;
  }
  render() {
    return (
      <div>
        {this.state.show ? <div className="topNav"></div> : ''}
        {/* <div className="topNav"></div> */}
      </div>
    );
  }
}
