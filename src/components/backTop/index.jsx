import React, { Component } from "react";
import "./backTop.less";
export default class backTop extends Component {
  constructor() {
    super();
    this.state = {
      intervalId: 0,
      show: false
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    window.addEventListener("scroll", this.handleScroll, true);
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    this.setState({ intervalId: intervalId });
  }

  handleScroll() {
    let scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    // console.log(scrollTop)
    if (scrollTop > 100) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: false
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.show ? (
          <div
            className="topNav"
            onClick={() => {
              this.scrollToTop();
            }}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
