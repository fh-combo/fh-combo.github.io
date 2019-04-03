import React, { Component } from "react";
import styles from "./contact.module.less";
import { Button as Abutton } from "@alifd/next";
import {
  Row,
  Col,
  Card,
  Tag,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Button,
  AutoComplete
} from "antd";
const { TextArea } = Input;

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="center_borderbox">
          <div className={styles.contact_page_box}>
            <div className={styles.page_title}>
              <Row>
                <Col span={24}>CONTACT INFORMATION</Col>
                <Col span={24}>Zhong Cai Open</Col>
              </Row>
            </div>
            <div className={styles.page_content}>
              <Row>
                <Col span={8} className="gutter-row">
                  <div className="gutter-box">
                    <ul>
                      <li>Office:</li>
                      <li>Tel 123-456-7890</li>
                      <li>info@mysite.com</li>
                      <li>500 Terry Francois St.</li>
                      <li>San Francisco, CA 94158</li>
                    </ul>
                    <ul>
                      <li>Other Contacts</li>
                      <li>Tel 123-456-7890</li>
                      <li>Fax 123-456-7890</li>
                    </ul>
                  </div>
                </Col>
                <Col span={12} className="gutter-row">
                  <div className="gutter-box">
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Item>
                        {getFieldDecorator("name", {
                          rules: [
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              required: true,
                              message: "Please input your name!"
                            }
                          ]
                        })(<Input placeholder="name" />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              required: true,
                              message: "Please input your E-mail!"
                            }
                          ]
                        })(<Input placeholder="E-mail" />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator("Subject", {
                          rules: [
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              required: true,
                              message: "Please input your Subject!"
                            }
                          ]
                        })(<Input placeholder="Subject" />)}
                      </Form.Item>
                      <Form.Item>
                        {getFieldDecorator("message", {
                          rules: [
                            {
                              type: "email",
                              message: "The input is not valid E-mail!"
                            },
                            {
                              required: true,
                              message: "Please input your message!"
                            }
                          ]
                        })(<TextArea rows={4} placeholder="message" />)}
                      </Form.Item>
                      <Form.Item>
                        <Row type="flex" justify="end">
                          <Col>
                            <div className="ghost-light-background">
                              <Abutton ghost="light" htmlType="submit">
                                Submit
                              </Abutton>
                            </div>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Contact = Form.create({})(Contact);

export default Contact;
