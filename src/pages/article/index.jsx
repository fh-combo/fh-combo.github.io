import React, { Component } from "react";
import axios from "axios";
import styles from "./article.module.less";
import { CONFIG } from "@config";
import { Row, Col, Pagination, message, Spin, Icon } from "antd";
import { TimeUpdate } from "@utils";

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
      loading: false
    };
  }
  componentWillMount() {
    console.log("componentWillMount");
    this.doQuery();
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  doQueryCount() {
    axios
      .get(`https://api.github.com/repos/${CONFIG["owner"]}/hawerblog/issues`, {
        params: {
          creator: CONFIG["owner"],
          client_id: CONFIG["client_id"],
          client_secret: CONFIG["client_secret"]
        }
      })
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          const current = data.filter((v, k) => {
            return v["title"] != "React App";
          });
          this.setState(
            {
              count: current.length
            },
            () => {
              console.log("总数：", this.state.count);
              console.log("current", current);
            }
          );
        }
      });
  }
  doQuery() {
    // 先置空之前的分页值
    this.setState({
      nowPageIssues: []
    });
    this.setState({
      loading: true
    });
    this.doQueryCount();
    axios
      .get(`https://api.github.com/repos/${CONFIG["owner"]}/hawerblog/issues`, {
        params: {
          creator: CONFIG["owner"],
          client_id: CONFIG["client_id"],
          client_secret: CONFIG["client_secret"],
          page: this.state.page,
          per_page: this.state.pageNum
        }
      })
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          // console.log(data)
          this.setState({
            loading: false
          });
          const current = data.filter((v, k) => {
            return v["title"] != "React App";
          });
          this.setState(
            {
              nowPageIssues: current
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
    let self = this;
    console.log("page", page);
    // console.log("pageSize", pageSize);
    this.setState({ page }, () => {
      console.log("当前页：", this.state.page);
      this.doQuery();
    });
  };
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
          <Row gutter={0}>
            {nowPageIssues && nowPageIssues.length ? (
              nowPageIssues.map((it, index) => {
                return (
                  <Col className="gutter-row" span={12} key={index}>
                    <div className="gutter-box">
                      <div className="articleItem_box">
                        <h1>{it.title}</h1>
                        <div>
                          <span>发表于：</span>
                          <span>{TimeUpdate(it.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            ) : null}
          </Row>
          {nowPageIssues && nowPageIssues.length ? (
            <Pagination
              current={page}
              total={count - 1}
              pageSize={pageNum}
              onChange={(page, pageSize) => this.pageChange(page, pageSize)}
              // hideOnSinglePage={true}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 15
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Article;
