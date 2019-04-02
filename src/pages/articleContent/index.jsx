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
            talk: true
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
    }
    doQuery() {
        this.setState({ issuesInfo: [], loading: true });
        const self = this;
        axios
            .get(
                `https://api.github.com/repos/${
                    CONFIG["owner"]
                }/${CONFIG["repositories"]}/issues/${this.state.id}`,{
                  params:{
                    creator:CONFIG['owner'],
                    client_id:CONFIG['client_id'],
                    client_secret:CONFIG['client_secret']
                  }
                }
            )
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    const data = res.data;
                    self.setState({ issuesInfo: data, loading: false,talk:true });
                }
            })
            .catch(err => {
                console.log(err);
                message.warning("文章不存在");
            });
    }
    render() {
        const { issuesInfo, loading ,talk} = this.state;
        return (
            <div className="center_borderbox">
                <Row style={{ color: "#fff", marginTop: 20, marginBottom: 20 }}>
                    <Card style={{ width: "100%" }} loading={loading}>
                        <Meta
                            title={
                                issuesInfo && issuesInfo.body ? (
                                    <div>
                                        <h2>{issuesInfo.title}</h2>
                                        <div style={{ fontSize: 14 }}>
                                            <span style={{ marginRight: 16 }}>
                                                发表于 :{" "}
                                                {TimeUpdate(
                                                    issuesInfo.created_at
                                                )}
                                            </span>
                                            标签 :{" "}
                                            {issuesInfo &&
                                            issuesInfo.labels &&
                                            issuesInfo.labels.length
                                                ? issuesInfo.labels.map(
                                                      (item, index) => {
                                                          return (
                                                              <Tag
                                                                  style={{
                                                                      fontSize: 14
                                                                  }}
                                                                  key={index}
                                                                  color={`#${
                                                                      item.color
                                                                  }`}
                                                              >
                                                                  {item.name}
                                                              </Tag>
                                                          );
                                                      }
                                                  )
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
        );
    }
}
