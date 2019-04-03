import React, { Component } from "react";
import axios from "axios";
import styles from "./article.module.less";
import { CONFIG } from "@config";
import { Row, Col, Pagination, message, Spin, Icon } from "antd";
import { TimeUpdate } from "@utils";
// import qs from "qs";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 设置一个状态来保存当前页码的文档
      nowPageIssues: [],
      // 当前选中的页码
      page: 1,
      // 一页的数量
      pageNum: 4,
      count: 0,
      loading: false,
      tupian:
        "https://user-images.githubusercontent.com/16040462/55384328-08d4e400-555d-11e9-98d5-aca16fbb964f.png"
    };
  }
  componentWillMount() {
    console.log("componentWillMount");
    // console.info(qs.parse('utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22Vue%22'))
    // let _obj = {utf8: '✓', q: 'is:issue is:open label:"Vue"'}//✓
    // console.log(qs.stringify(_obj))
    this.doQuery();
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  doQuery() {
    this.setState({
      nowPageIssues: [], // 先置空之前的分页值
      loading: true //开启菊花
    });

    axios
      .get(
        `https://api.github.com/search/issues?q=-label:Gitalk+state:open+repo:${
          CONFIG["owner"]
        }/${CONFIG["repositories"]}`,
        {
          params: {
            creator: CONFIG["owner"],
            client_id: CONFIG["client_id"],
            client_secret: CONFIG["client_secret"],
            page: this.state.page,
            per_page: this.state.pageNum
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          // console.log(data)
          // const current = data.filter((v, k) => {
          //   return v["title"] != "React App";
          // });
          this.setState(
            {
              loading: false, //关闭菊花
              count: data.total_count
            },
            () => {
              console.log("总数：", this.state.count);
              // console.log("current", current);
            }
          );
          this.setState(
            {
              nowPageIssues: data.items
            },
            () => {
              console.log(this.state.nowPageIssues);
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
        message.warning("文章不存在");
      });
  }
  pageChange = (page, pageSize) => {
    console.log(this);
    console.log("page", page);
    // console.log("pageSize", pageSize);
    this.setState({ page }, () => {
      console.log("当前页：", this.state.page);
      this.doQuery();
    });
  };
  handleOnArtice = item => {
    console.log("handleOnArtice");
    console.log(item);
    this.props.history.push(`/articleContent/${item.number}`);
  };
  matchImgFirstIntheBody(body) {
    // 匹配body中所有图片，并且呈现首图，无一张图片呈现404图片
    let arr = body.match(
      /!\[image\]\(https:\/\/.+\.(jpeg|jpg|png|pdf|txt|gif)\)/gi
    );

    if (arr) {
      console.log("arr--have", arr);
      let picUrl = arr[0].match(/https:\/\/.+\.(jpeg|jpg|png|pdf|txt|gif)/)[0];
      console.log("picUrl:", picUrl);
      return <img src={picUrl} alt=""/>
    } else {
      console.log("arr--not", arr);
      return <img src={this.state.tupian} alt="" />;
    }
  }
  render() {
    const { page, pageNum, count, nowPageIssues, loading } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;
    return (
      <div>
        <div className="center_borderbox">
          {loading ? (
            <div className="loading_wrap">
              <Spin indicator={antIcon} spinning={loading} />
            </div>
          ) : null}
          <Row justify="space-around">
            {nowPageIssues && nowPageIssues.length
              ? nowPageIssues.map((it, index) => {
                  return (
                    <Col
                      className="gutter-row"
                      span={12}
                      key={index}
                      onClick={() => {
                        this.handleOnArtice(it);
                      }}
                    >
                      <div className="gutter-box">
                        <div className={styles.articleItem_box}>
                          {this.matchImgFirstIntheBody(it.body)}
                          <div className={styles.artInfo_bottom}>
                            <h1>
                              <span>{it.title}</span>
                            </h1>
                            <div>
                              <span>发表于：</span>
                              <span>{TimeUpdate(it.created_at)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })
              : null}
          </Row>
          {nowPageIssues && nowPageIssues.length ? (
            <Pagination
              current={page}
              total={count}
              pageSize={pageNum}
              onChange={(page, pageSize) => this.pageChange(page, pageSize)}
              // hideOnSinglePage={true}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 55,
                marginBottom: 35
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Article;
