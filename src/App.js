import React, { Component } from 'react'
import logo from './logo.svg'
import './App.scss'
import Next from '@alifd/next'
// 如下方式进行引入，这样就会按需引入所需的js和css了
import { Button, Icon, Row, Col } from 'antd'
import './style.less'

class App extends Component {
  render () {
    return (
      <div className='App'>
        button
        <Button type='primary'>
          Button
        </Button>
        <br /> icon
        <Icon type='link' />
        <br />
        <div className='grid'>
          <Row className='row'>
            <Col className='col' span={12}> col-12
            </Col>
            <Col className='col' span={12}> col-12
            </Col>
          </Row>
          <Row className='row'>
            <Col className='col' span={8}> col-8
            </Col>
            <Col className='col' span={8}> col-8
            </Col>
            <Col className='col' span={8}> col-8
            </Col>
          </Row>
          <Row className='row'>
            <Col className='col' span={6}> col-6
            </Col>
            <Col className='col' span={6}> col-6
            </Col>
            <Col className='col' span={6}> col-6
            </Col>
            <Col className='col' span={6}> col-6
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default App
