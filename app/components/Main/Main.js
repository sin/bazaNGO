import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { header } from './styles.css'

class Home extends Component {
  render () {
    return (
      <div>
        <div className={header}>
          <h1><Link to="/">Baza Organizacji Pozarządowych COP</Link></h1>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Home
