import React, { Component } from "react";
import styles from "./about.module.less";
import { Row, Card, message, Tag } from "antd";
const { Meta } = Card;

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headImg:"https://avatars2.githubusercontent.com/u/16040462?s=460&v=4"
    };
  }
  render() {
    return (
      <div>
        <div className="article_wrap_block">
          <div className="left">
            <div className={styles.head_userbox}>
              <div className={styles.imagewrap}>
                <img src={this.state.headImg} alt=""/>
              </div>
              <div className={styles.ctrl_bottom}>
                out sick!
              </div>
            </div>
          </div>
          <div className="right">
            <Row>

            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
