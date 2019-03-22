import routes from '@routerConfig'
import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import './header.less'
export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  render () {
    return (
      <div className='title'>
        <header className='center_borderbox'>
          {routes.map((r, key) => {
             if (r.text) {
               return <NavLink
                        exact
                        key={key}
                        to={r.path}
                        activeClassName='selected'>
                        {r.text}
                      </NavLink>
             }
             return false
           })}
        </header>
      </div>
    )
  }
}
