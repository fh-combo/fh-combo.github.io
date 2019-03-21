import React, { Component } from 'react'

import './banner.less'
import bannerImg from '@assets/img/bannerfull.jpg'
export class Banner extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div className='banner'>
        <img src={bannerImg} alt='广告位' />
      </div>
    )
  }
}

export default Banner
