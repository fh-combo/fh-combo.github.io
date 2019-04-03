import React, { Component } from "react";
import marked from "marked";
import hljs from "highlight.js";
import axios from "axios";
import "./articleContent.less";
import { CONFIG } from "@config";
import { Row, Card, message, Tag } from "antd";
import { TimeUpdate } from "@utils";
import GitTalk from "@components/GitTalk";
const { Meta } = Card;

export default class articleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      issuesInfo: [],
      loading: false,
      path: "",
      talk: true,
      labelsInfo: []
    };
  }
  componentWillMount() {
    marked.setOptions({
      highlight: code => hljs.highlightAuto(code).value
    });
    console.log("componentWillMount");
    // console.log(this.props.location.query)
    let _id = this.props.match.params.id;
    console.log(_id);
    this.setState({
      id: _id
    });
  }
  componentDidMount() {
    console.log("componentDidmount");
    this.doQuery();
    this.doLabels();
  }
  doQuery() {
    this.setState({ issuesInfo: [], loading: true });
    const self = this;
    axios
      .get(
        `https://api.github.com/repos/${CONFIG["owner"]}/${
          CONFIG["repositories"]
        }/issues/${this.state.id}`,
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
          console.log(res.data);
          const data = res.data;
          self.setState({ issuesInfo: data, loading: false, talk: true });
        }
      })
      .catch(err => {
        console.log(err);
        message.warning("文章不存在");
      });
  }
  doLabels() {
    // 查询所有可用分类标签
    axios({
      url: `https://api.github.com/repos/${CONFIG["owner"]}/${
        CONFIG["repositories"]
      }/labels`,
      methods: "get",
      headers: {
        Accept: "application/vnd.github.v3+json"
      },
      params: {
        creator: CONFIG["owner"],
        client_id: CONFIG["client_id"],
        client_secret: CONFIG["client_secret"]
      }
    })
      .then(res => {
        let data = res.data;
        console.log("doLabels::::", data);
        let newData = data.filter(v => {
          let regText1 = /\/articleContent\//,
            regText2 = /Gitalk/,
            regText3 = /bug/,
            regText4 = /duplicate/,
            regText5 = /enhancement/,
            regText6 = /good\s*first\s*issue/,
            regText7 = /help\s*wanted/,
            regText8 = /invalid/,
            regText9 = /question/,
            regText10 = /wontfix/;
          return (
            !regText1.test(v.name) &&
            !regText2.test(v.name) &&
            !regText3.test(v.name) &&
            !regText4.test(v.name) &&
            !regText5.test(v.name) &&
            !regText6.test(v.name) &&
            !regText7.test(v.name) &&
            !regText8.test(v.name) &&
            !regText9.test(v.name) &&
            !regText10.test(v.name)
          );
        });
        this.setState(
          {
            labelsInfo: newData
          },
          () => {
            console.log("labelsInfo:", this.state.labelsInfo);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { issuesInfo, loading, talk, labelsInfo } = this.state;
    return (
      <div className="article_wrap_block">
        <div className="left">
          <Row style={{ color: "#fff", marginTop: 20, marginBottom: 20 }}>
            <Card style={{ width: "100%" }} loading={loading}>
              <Meta
                title={
                  issuesInfo && issuesInfo.title ? (
                    <div>
                      <h2>{issuesInfo.title}</h2>
                      <div style={{ fontSize: 14 }}>
                        <span style={{ marginRight: 16 }}>
                          发表于 : {TimeUpdate(issuesInfo.created_at)}
                        </span>
                        标签 :{" "}
                        {issuesInfo &&
                        issuesInfo.labels &&
                        issuesInfo.labels.length
                          ? issuesInfo.labels.map((item, index) => {
                              return (
                                <Tag
                                  style={{
                                    fontSize: 14
                                  }}
                                  key={index}
                                  color={`#${item.color}`}
                                >
                                  {item.name}
                                </Tag>
                              );
                            })
                          : "暂无标签"}
                      </div>
                    </div>
                  ) : null
                }
                description={
                  issuesInfo && issuesInfo.body ? (
                    <div
                      className="article-detail"
                      dangerouslySetInnerHTML={{
                        __html: marked(issuesInfo.body)
                      }}
                    />
                  ) : (
                    "暂无内容..."
                  )
                }
              />
            </Card>
            {talk ? <GitTalk path={this.state.path} /> : null}
          </Row>
        </div>
        <div className="right">
          <Row style={{ color: "#fff", marginTop: 20, marginBottom: 20 }}>
            <Card
              title={`随笔分类( ${labelsInfo.length} )`}
              extra={<a href="javascript:;" style={{color:'#446CE5'}}>More</a>}
              style={{ width: 250 }}
            >
              {labelsInfo && labelsInfo.length
                ? labelsInfo.map((it, index) => {
                    return (
                      <div
                        style={{
                          display: "inline-block",
                          padding: 4
                        }}
                        key={index}
                      >
                        <Tag
                          style={{
                            fontSize: 18,
                            fontWeight: "Bold"
                          }}
                          key={index}
                          color={`#${it.color}`}
                        >
                          {it.name}
                        </Tag>
                      </div>
                    );
                  })
                : null}
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}
