import React, { Component } from 'react'
import { header } from './styles.css'

class Home extends Component {
  render () {
    return (
      <div>
        <div className={header}>
          <h1>Baza Organizacji Pozarządowych COP</h1>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Home
