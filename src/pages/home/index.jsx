import React, { Component } from "react";
import styles from "./home.module.less";
// import { Button } from "antd"
import { Button as Abutton } from "@alifd/next";
import { Icon, Skeleton } from "antd";
import headimg from "@assets/img/wangmen.png";
import axios from "axios";
import { CONFIG } from "@config";
import { matchImgFirstIntheBody } from "@utils";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      loading: false,
      avatarImgStatus: null
    };
    // this.handleOnArtice = this.handleOnArtice.bind(this);
  }
  componentWillMount() {
    this.getBlogApiData();
  }
  getBlogApiData() {
    this.setState({ loading: true });
    const self = this;
    // 针对github整站查询 (可扩展参数多)
    // https://api.github.com/search/issues?q=-label:Gitalk+state:open+repo:${CONFIG["owner"]}/${CONFIG["repositories"]}
    // 只根据git指定用户参考查询(配置少)
    // https://api.github.com/repos/${CONFIG["owner"]}/${CONFIG["repositories"]}/issues
    axios
      .get(
        `https://api.github.com/search/issues?q=-label:Gitalk+state:open+repo:${
          CONFIG["owner"]
        }/${CONFIG["repositories"]}`,
        {
          params: {
            creator: CONFIG["owner"],
            client_id: CONFIG["client_id"],
            client_secret: CONFIG["client_secret"]
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          let data = res.data;
          console.log("all:", data);
          self.setState({ loading: false });
          // const current = data.filter((v, k) => {
          //   return v["title"] != "React App" && !v["pull_request"];
          // });
          // console.log(current);
          // console.log(data)
          this.setState(
            {
              itemList: data.items.slice(0, 3) //current.slice(0, 3)
            },
            () => {
              console.log(this.state.itemList);
            }
          );
        }
      });
  }
  handleOnArtice = item => {
    console.log("handleOnArtice");
    console.log(item);
    // 方式1：只能从别的页面跳转到指定页参数才能获取
    // this.props.history.push({pathname:'/articleContent',query:{data:item.number}})
    // 方式2：正则匹配参数，传递参数防止路由末尾，页面刷新参数还在
    this.props.history.push(`/articleContent/${item.number}`);
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
  render() {
    const { loading, avatarImgStatus } = this.state;
    return (
      <div>
        <div className="center_borderbox">
          <div className={styles.userinfo}>
            <div className={styles.userimg}>
              <Skeleton
                loading={avatarImgStatus === "loaded" ? false : true}
                active
                avatar
              />
              <img
                src={headimg}
                alt=""
                onLoad={() => {
                  this.imgisLoadFinish();
                }}
              />
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
                <Skeleton loading={loading} active />
                {this.state.itemList.map((it, index) => {
                  return (
                    <div
                      className={styles.article_box}
                      onClick={this.handleOnArtice.bind(this, it)}
                      key={index}
                    >
                      <div className={styles.img_wrap}>
                        {matchImgFirstIntheBody(it.body)}
                      </div>
                      <div className={styles.art_info}>
                        <div className={styles.art_tit}>
                          <div className={styles.titname}>{it.title}</div>
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
