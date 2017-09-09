import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { header, footer } from './styles.css'

class Home extends Component {
  render () {
    return (
      <div>
        <div className={header}>
          <h1><Link to="/">Baza Organizacji Pozarządowych COP</Link></h1>
        </div>
        {this.props.children}
        <div className={footer}>
          Made with <i className="fa fa-heart" aria-hidden="true" /> at HackSilesia 2017<br/>
          <a href="https://github.com/sin/bazaNGO">Fork us on Github</a>
        </div>
      </div>
    )
  }
}

export default Home
