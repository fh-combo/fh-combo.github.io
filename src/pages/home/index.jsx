import React, { Component } from "react";
import styles from "./home.module.less";
// import { Button } from "antd"
import { Button as Abutton } from "@alifd/next";
import { Icon } from "antd";
import headimg from "@assets/img/wangmen.png";
import tupian from "@assets/img/tupian.jpg";
import axios from "axios";
import { CONFIG } from "@config";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnArtice = this.handleOnArtice.bind(this);
  }
  componentWillMount() {
    this.getBlogApiData();
  }
  getBlogApiData() {
    axios
      .get(`https://api.github.com/repos/${CONFIG["owner"]}/hawerblog/issues`)
      .then(res => {
        console.log(res)
      });
  }
  handleOnArtice(params) {
    console.log("handleOnArtice");
  }
  render() {
    return (
      <div>
        <div className="center_borderbox">
          <div className={styles.userinfo}>
            <div className={styles.userimg}>
              <img src={headimg} alt="" />
            </div>
            <div className={styles.usertext}>
              <div className={styles.user_tit}>Futurefinger.Hawer.Mr.H</div>
              <div className={styles.user_context}>
                I am a front-end engineer, and I like to write front-end
                projects with mv* framework. The commonly used framework is
                react/vue, I know node.js, and I also explore the back-end
                field.
                <div className={`${styles.user_ctrl} ghost-light-background`}>
                  <Abutton ghost="light">Read More</Abutton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.borderbox_wrap}>
          <div className="center_borderbox">
            <div className={styles.article_top}>
              <div className={styles.title}>最近文章</div>
              <div className={styles.article_box_wrap}>
                <div
                  className={styles.article_box}
                  onClick={this.handleOnArtice}
                >
                  <div className={styles.img_wrap}>
                    <img src={tupian} alt="" />
                  </div>
                  <div className={styles.art_info}>
                    <div className={styles.art_tit}>
                      <div className={styles.titname}>
                        What you can learn from test tube babies babies babies
                        babies babies babies babies babies babies babies babies
                        babies babies babies babies babies babies babies babies
                        babies babies babies babies babies
                      </div>
                    </div>
                    <div className={styles.art_data}>
                      <span>
                        <Icon type="eye" theme="twoTone" />
                        预览量：
                      </span>
                      <span>
                        <Icon
                          type="tag"
                          theme="twoTone"
                          twoToneColor="#fb9998"
                        />
                        发布时间：
                      </span>
                      <span>
                        <Icon
                          type="heart"
                          theme="twoTone"
                          twoToneColor="#eb2f96"
                        />
                        点赞量：
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.article_box}>
                  <div className={styles.img_wrap}>
                    <img src={tupian} alt="" />
                  </div>
                  <div className={styles.art_info}>
                    <div className={styles.art_tit}>
                      <div className={styles.titname}>
                        What you can learn from test tube babies babies babies
                      </div>
                    </div>
                    <div className={styles.art_data}>
                      <span>
                        <Icon type="eye" theme="twoTone" />
                        预览量：
                      </span>
                      <span>
                        <Icon
                          type="tag"
                          theme="twoTone"
                          twoToneColor="#fb9998"
                        />
                        发布时间：
                      </span>
                      <span>
                        <Icon
                          type="heart"
                          theme="twoTone"
                          twoToneColor="#eb2f96"
                        />
                        点赞量：
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.article_box}>
                  <div className={styles.img_wrap}>
                    <img src={tupian} alt="" />
                  </div>
                  <div className={styles.art_info}>
                    <div className={styles.art_tit}>
                      <div className={styles.titname}>
                        What you can learn from test tube babies
                      </div>
                    </div>
                    <div className={styles.art_data}>
                      <span>
                        <Icon type="eye" theme="twoTone" />
                        预览量：
                      </span>
                      <span>
                        <Icon
                          type="tag"
                          theme="twoTone"
                          twoToneColor="#fb9998"
                        />
                        发布时间：
                      </span>
                      <span>
                        <Icon
                          type="heart"
                          theme="twoTone"
                          twoToneColor="#eb2f96"
                        />
                        点赞量：
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
