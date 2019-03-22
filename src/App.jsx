import React, { Component } from 'react'
import './style/common.scss'
// import logo from './logo.svg'
// import './App.scss'
// import Next from '@alifd/next'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// 如下方式进行引入，这样就会按需引入所需的js和css了
// import { Button } from 'antd'
// import './style.less'
import routes from '@routerConfig'
import Banner from '@components/banner'
import Header from '@components/header'
import Footer from '@components/footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="rootwrap">
          <div id="desktop_box">
            <div id="bg_image" />
          </div>
          <div id="site_root">
            <div className="wrapper">
              <Banner />
              <Router>
                <Header />
                {routes.map((route, key) => {
                  if (route.exact) {
                    return (
                      <Route
                        key={key}
                        exact
                        path={route.path}
                        render={props => (
                          <route.component {...props} routes={route.routes} />
                        )}
                      />
                    )
                  } else {
                    return (
                      <Route
                        key={key}
                        path={route.path}
                        render={props => (
                          <route.component {...props} routes={route.routes} />
                        )}
                      />
                    )
                  }
                })}
              </Router>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
