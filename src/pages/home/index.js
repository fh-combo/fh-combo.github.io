import React, { Component } from 'react'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div>
        <div className='userinfo'>
          <div className='userimg'>
            <img src='~assets/img/wangmen.png' alt='' srcset='' />
          </div>
          <div className='usertext'>
            <div className='user_tit'>
              Futurefinger.Hawer.Mr.H
            </div>
            <div className='user_context'>
              I am a front-end engineer, and I like to write front-end projects with mv* framework. The commonly used framework is react/vue, I know node.js, and I also explore
              the back-end field.
            </div>
            <div className='user_ctrl'>
              Read More
            </div>
          </div>
        </div>
      </div>
    )
  }
}
