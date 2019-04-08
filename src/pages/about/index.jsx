import React, { Component } from "react";
import styles from "./about.module.less";
import marked from "marked";
import hljs from "highlight.js";
import axios from "axios";
import { CONFIG } from "@config";
import {
  Row,
  Card,
  Col,
  message,
  Icon,
  Input,
  Skeleton,
  Progress,
  Checkbox,
  Form,
  Select,
  Popover,
  Tabs
} from "antd";
// import { emojify } from "react-emojione";
import Emojify from "react-emojione";
import { Button as AButton, Dialog as ADialog } from "@alifd/next";
import qs from "qs";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { Meta } = Card;

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1125793_xf5e5tf2yrg.js" // 在 iconfont.cn 上生成
});

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moodStateText: "Hello World!!",
      currentMoodStateText: "",
      visible: false,
      footerAlign: "center",
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
    !this.getlocalMineIntro() ? this.doMeIntro() : "";
  }
  getlocalMineIntro() {
    // 获取本地缓存的用户信息
    // console.log(localStorage.getItem('$mineIntroContext'))
    let Intro = localStorage.getItem("$mineIntroContext");
    if (Intro) {
      return qs.parse(Intro);
    } else {
      return false;
    }
  }
  onSelectResetStatusChange = value => {
    console.log(`Selected: ${value}`);
  };
  onSetHurmenStatus = () => {
    console.log("onSetHurmenStatus");
    let userInfo = this.props.form.getFieldsValue();
    console.log("userInfo:", userInfo);
    this.setState(userInfo);
    this.onClose();
  };
  onCheckChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };
  onOpen = () => {
    this.setState({
      visible: true
    });
  };
  onXinqinChange = e => {
    console.log(e.target.value.toUpperCase());
    this.setState({
      currentMoodStateText: e.target.value.toUpperCase()
    });
  };
  onClose = reason => {
    console.log(reason);

    this.setState({
      visible: false
    });
  };
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
        localStorage.setItem("$mineIntroContext", qs.stringify(data));
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
      // mineIntroContext,
      serviceLoading,
      serviceDelivery,
      avatarImgStatus,
      moodStateText
    } = this.state;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    };
    const { getFieldDecorator } = this.props.form;
    const content = (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Emojify style={{ width: 18, height: 22 }}>🏝</Emojify>
              </span>
            }
            key="1"
          >
            <Row>
              <Col span={4}>
              <Emojify style={{ width: 18, height: 22 }}>:punch:</Emojify>
              </Col>
              <Col span={4}>
              <Emojify style={{ width: 18, height: 22 }}>:sunglasses:</Emojify>
              </Col>
              <Col span={4}>
              <Emojify style={{ width: 18, height: 22 }}>:ok_hand:</Emojify>
              </Col>
              <Col span={4}>
              <Emojify style={{ width: 18, height: 22 }}>:blue_heart:</Emojify>
              </Col>
              <Col span={4}>
              <Emojify style={{ width: 18, height: 22 }}>:family:</Emojify>
              </Col>
              <Col span={4}>
              <Emojify style={{ width: 18, height: 22 }}>:yum:</Emojify>
              </Col>
            </Row>
          </TabPane>
          <TabPane
            tab={
              <span>
                <Emojify style={{ width: 18, height: 22 }}>🚅</Emojify>
              </span>
            }
            key="2"
          >
          tab2
          </TabPane>
          <TabPane
            tab={
              <span>
                <Emojify style={{ width: 18, height: 22 }}>🚖</Emojify>
              </span>
            }
            key="3"
          >
          tab3
          </TabPane>
        </Tabs>
      </div>
    );

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
                <div className={styles.emoji_fix} onClick={this.onOpen}>
                  <Emojify style={{ width: 18, height: 22 }}>😸</Emojify>
                </div>
                {moodStateText}
              </div>
            </div>
          </div>
          <div className={`${styles.right} right`}>
            <Row>
              <Col span={24}>
                <Card loading={loading} style={{ border: 0 }}>
                  <Meta
                    title={
                      this.getlocalMineIntro() &&
                      this.getlocalMineIntro().title ? (
                        <h2 className={styles.about_title}>
                          {this.getlocalMineIntro().title}
                        </h2>
                      ) : null
                    }
                    description={
                      this.getlocalMineIntro() &&
                      this.getlocalMineIntro().body ? (
                        <div
                          className="markdown_detail"
                          dangerouslySetInnerHTML={{
                            __html: marked(this.getlocalMineIntro().body)
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
                            <Progress percent={92} status="active" />
                          </div>
                          <div style={{ width: 260 }}>
                            <div>sketch</div>
                            <Progress percent={85} status="active" />
                          </div>
                          <div style={{ width: 260 }}>
                            <div>Adobe illustrator</div>
                            <Progress percent={80} status="active" />
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
                            <Progress percent={99} status="active" />
                          </div>
                          <div style={{ width: 260 }}>
                            <div>css3</div>
                            <Progress percent={85} status="active" />
                          </div>
                          <div style={{ width: 260 }}>
                            <div>Javascript</div>
                            <Progress percent={96} status="active" />
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
        <ADialog
          style={{ width: 500 }}
          title="开发者当前状态"
          footerAlign={this.state.footerAlign}
          visible={this.state.visible}
          onOk={this.onClose.bind(this, "okClick")}
          onCancel={this.onClose.bind(this, "cancelClick")}
          onClose={this.onClose.bind(this, "close")}
          className="customBtnAdialog"
          footer={[
            <AButton type="secondary" key={0} onClick={this.onSetHurmenStatus}>
              设置状态
            </AButton>,
            <AButton type="normal" warning key={1}>
              清除状态
            </AButton>
          ]}
        >
          <Form {...formItemLayout}>
            <Row style={{ marginTop: 10, paddingBottom: 10 }}>
              <Col span={24}>
                {getFieldDecorator("moodStateText", {
                  initialValue: `${moodStateText}`,
                  rules: []
                })(
                  <Input
                    addonBefore={
                      <Popover
                        placement="bottomLeft"
                        content={content}
                        trigger="click"
                      >
                        <Emojify
                          style={{
                            width: 18,
                            height: 20,
                            marginTop: 5,
                            cursor: "pointer"
                          }}
                        >
                          😸
                        </Emojify>
                      </Popover>
                    }
                    placeholder="What's happening?"
                  />
                )}
              </Col>
            </Row>
            <Row style={{ marginTop: 20, paddingBottom: 20 }}>
              <Col span={24}>
                <Checkbox onChange={this.onCheckChange}>Busy</Checkbox>
                <div style={{ paddingLeft: 22, lineHeight: 1.5 }}>
                  当其他人提到您、分配您或请求您的评审时，GitHub会让他们知道您的可用性有限。
                </div>
              </Col>
            </Row>
            <Form.Item label="定时重置状态">
              <Select
                size="default"
                defaultValue="永不"
                onChange={this.onSelectResetStatusChange}
                style={{ width: 200 }}
              >
                <Option value={-1}>永不</Option>
                <Option value={0}>30分钟</Option>
                <Option value={1}>1个小时</Option>
                <Option value={2}>4个小时</Option>
                <Option value={3}>1天</Option>
              </Select>
            </Form.Item>
          </Form>
        </ADialog>
      </div>
    );
  }
}

export default Form.create()(About);
