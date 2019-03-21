import React, { Component } from 'react'
// import logo from './logo.svg'
// import './App.scss'
import Next from '@alifd/next'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// 如下方式进行引入，这样就会按需引入所需的js和css了
import { Button, Icon, Row, Col } from 'antd'
// import './style.less'
import routes from '@routerConfig'
import Banner from '@components/banner'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Button type='primary'>
          Primary
        </Button>
        <Banner/>
        <Router>
          <header className='title'>
            {routes.map((r, key) => {
               if (r.text) {
                 return <Link key={key} to={r.path}>
                        {r.text}
                        </Link>
               }
             })}
          </header>
          {routes.map((route, key) => {
             if (route.exact) {
               return <Route
                        key={key}
                        exact
                        path={route.path}
                        render={props => (
                                  <route.component {...props} routes={route.routes} />
                                )} />
             }else {
               return <Route key={key} path={route.path} render={props => (
                                                        <route.component {...props} routes={route.routes} />
                                                      )} />
             }
           })}
        </Router>
      </div>
    )
  }
}

export default App
