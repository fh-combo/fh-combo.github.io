import React, { Component } from "react";
import styles from "./about.module.less";
import marked from "marked";
import hljs from "highlight.js";
import axios from "axios";
import { CONFIG } from "@config";
import { Row, Card, Col, message, Tag, Icon, Skeleton, Progress } from "antd";
import "@github/g-emoji-element";
const { Meta } = Card;

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1125793_xf5e5tf2yrg.js" // 在 iconfont.cn 上生成
});

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarImgStatus: null,
      loading: false,
      serviceLoading: false, //服务内容-load状态
      headImg: "https://avatars2.githubusercontent.com/u/16040462?s=460&v=4",
      mineIntroContext: null, //个人信息介绍
      serviceDelivery: [
        {
          logoName: "iconhtml-termial",
          title: "网页开发",
          note: "提供PC端网页开发，保证浏览器的兼容性和布局一致性！"
        },
        {
          logoName: "iconsheji",
          title: "品牌设计",
          note:
            "提供品牌logo设计，(blog/活动页面/中后台)等，系统相关的ui，ue设计类工作。"
        },
        {
          logoName: "iconxiaochengxu",
          title: "小程序开发",
          note: "提供(微信小程序设计/支付宝小程序/快应用)等，相应移动端开发。"
        },
        {
          logoName: "iconlightnCode",
          title: "敏捷开发",
          note:
            "使用jekins等工具，持续开发，持续交付，提供快速开发交付的体验服务！"
        }
      ] //提供服务
    };
  }
  componentWillMount() {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    });
  }
  componentDidMount() {
    this.doMeIntro();
  }
  imgisLoadFinish() {
    // 图片是否加载完成
    this.setState(
      {
        avatarImgStatus: "loaded"
      },
      () => {}
    );
  }
  doMeIntro() {
    // 查询个人信息
    this.setState({ loading: true });
    const self = this;
    axios
      .get(
        `https://api.github.com/repos/${CONFIG["owner"]}/${
          CONFIG["repositories"]
        }/issues/32`,
        {
          params: {
            creator: CONFIG["owner"],
            client_id: CONFIG["client_id"],
            client_secret: CONFIG["client_secret"]
          }
        }
      )
      .then(res => {
        const data = res.data;
        console.log(data);
        self.setState({
          loading: false,
          mineIntroContext: data
        });
      })
      .catch(err => {
        console.log(err);
        message.warning("个人信息不存在");
      });
  }
  render() {
    const {
      loading,
      mineIntroContext,
      serviceLoading,
      serviceDelivery,
      avatarImgStatus
    } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    return (
      <div>
        <div className={`${styles.article_wrap_block} article_wrap_block`}>
          <div className={`${styles.left} left`}>
            <div className={styles.head_userbox}>
              <div className={styles.imagewrap}>
                <Skeleton
                  loading={avatarImgStatus === "loaded" ? false : true}
                  active
                  avatar
                />
                <img
                  src={this.state.headImg}
                  alt=""
                  onLoad={() => {
                    this.imgisLoadFinish();
                  }}
                />
              </div>
              <div className={styles.ctrl_bottom}>
                <div className={styles.emoji_fix}>
                  <g-emoji fallback-src="t-rex.png" alias="T-Rex">
                    🦖
                  </g-emoji>
                </div>
                out sick!
              </div>
            </div>
          </div>
          <div className={`${styles.right} right`}>
            <Row>
              <Col span={24}>
                <Card loading={loading} style={{ border: 0 }}>
                  <Meta
                    title={
                      mineIntroContext && mineIntroContext.title ? (
                        <h2 className={styles.about_title}>
                          {mineIntroContext.title}
                        </h2>
                      ) : null
                    }
                    description={
                      mineIntroContext && mineIntroContext.body ? (
                        <div
                          className="markdown_detail"
                          dangerouslySetInnerHTML={{
                            __html: marked(mineIntroContext.body)
                          }}
                        />
                      ) : (
                        "暂无内容..."
                      )
                    }
                  />
                </Card>
              </Col>
            </Row>
            <div className={styles.scroll_wrap}>
              <Card style={{ border: 0 }}>
                <h2 className={styles.about_title}>My Services</h2>
              </Card>
              <div className={styles.service_wrap}>
                {serviceDelivery.map((it, index) => {
                  return (
                    <div key={index}>
                      <Card loading={serviceLoading} style={{ border: 0 }}>
                        <div className={styles.service_item}>
                          <div className={styles.iconbot}>
                            <MyIcon
                              type={it.logoName}
                              className="aboutIconSize"
                            />
                          </div>
                          <div className={styles.title}>{it.title}</div>
                          <div className={styles.text}>{it.note}</div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.skills_details}>
              <Row>
                <Col span={12}>
                  <Card style={{ border: 0 }}>
                    <Meta
                      title={
                        <h2 className={styles.about_title}>Design Skills</h2>
                      }
                      description={
                        <div>
                          <div style={{ width: 260 }}>
                            <div>photoshop</div>
                            <Progress
                              strokeColor={{
                                from: "#108ee9",
                                to: "#87d068"
                              }}
                              percent={92}
                              status="active"
                            />
                          </div>
                          <div style={{ width: 260 }}>
                            <div>sketch</div>
                            <Progress
                              strokeColor={{
                                from: "#108ee9",
                                to: "#87d068"
                              }}
                              percent={85}
                              status="active"
                            />
                          </div>
                          <div style={{ width: 260 }}>
                            <div>Adobe illustrator</div>
                            <Progress
                              strokeColor={{
                                from: "#108ee9",
                                to: "#87d068"
                              }}
                              percent={80}
                              status="active"
                            />
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card style={{ border: 0 }}>
                    <Meta
                      title={
                        <h2 className={styles.about_title}>Code Skills</h2>
                      }
                      description={
                        <div>
                          <div style={{ width: 260 }}>
                            <div>html5</div>
                            <Progress
                              strokeColor={{
                                from: "#108ee9",
                                to: "#87d068"
                              }}
                              percent={99}
                              status="active"
                            />
                          </div>
                          <div style={{ width: 260 }}>
                            <div>css3</div>
                            <Progress
                              strokeColor={{
                                from: "#108ee9",
                                to: "#87d068"
                              }}
                              percent={85}
                              status="active"
                            />
                          </div>
                          <div style={{ width: 260 }}>
                            <div>Javascript</div>
                            <Progress
                              strokeColor={{
                                from: "#108ee9",
                                to: "#87d068"
                              }}
                              percent={96}
                              status="active"
                            />
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
