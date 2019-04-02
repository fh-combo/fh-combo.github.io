import React, { Component } from "react";
import styles from "./home.module.less";
// import { Button } from "antd"
import { Button as Abutton } from "@alifd/next";
import { Icon,Skeleton} from "antd";
import headimg from "@assets/img/wangmen.png";
import tupian from "@assets/img/tupian.jpg";
import axios from "axios";
import { CONFIG } from "@config";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      loading:false
    };
    // this.handleOnArtice = this.handleOnArtice.bind(this);
  }
  componentWillMount() {
    this.getBlogApiData();
  }
  getBlogApiData() {
    this.setState({loading:true});
    const self = this;
    axios
      .get(`https://api.github.com/repos/${CONFIG["owner"]}/${CONFIG["repositories"]}/issues`, {
        params: {
          creator: CONFIG["owner"],
          client_id: CONFIG["client_id"],
          client_secret: CONFIG["client_secret"]
        }
      })
      .then(res => {
        if (res.status === 200) {
          let data = res.data;
          self.setState({loading:false});
          const current = data.filter((v, k) => {
            return v["title"] != "React App" && !v["pull_request"];
          });
          console.log(current);
          // console.log(data)
          this.setState({
            itemList: current.slice(0, 3)
          });
          console.log(this.state.itemList);
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
  render() {
    const {loading} = this.state
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
                {this.state.itemList.map((it, index) => {
                  return (
                    <div
                      className={styles.article_box}
                      onClick={this.handleOnArtice.bind(this, it)}
                      key={index}
                    >
                    <Skeleton loading={loading} active>
                      <div className={styles.img_wrap}>
                        <img src={tupian} alt="" />
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
                    </Skeleton>
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
