import React, { Component } from 'react'
import './footer.less'
export default class Footer extends Component {
  render () {
    return (
      <div className="footer">
        <div className="center_borderbox">
          <div className="left">
            <div className="website_ico">
              <div></div>
              <div>
                <ul>
                  <li>Hello</li>
                  <li>World</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="center">
            &copy;{new Date().getFullYear()} by hawer.fang.h , The blogger website!
          </div>
          <div className="right">
            <div className="share_team">
              <span className="icon_zhihu"></span>
              <span className="icon_sf"></span>
              <span className="icon_git"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
