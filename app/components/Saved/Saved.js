import React, { Component } from 'react'
import { banner } from './styles.css'
import { Organization } from '../'

class Saved extends Component {
  constructor() {
    super()
  }

  render () {
    return (
      <div>
        <div className={banner}><i className="fa fa-check-circle" aria-hidden="true"/> Zapisano! Zmiany pojawią się po zaakceptowaniu przez administratora!</div>
        <Organization match={this.props.match} disableEdit={true} />
      </div>
    )
  }
}

export default Saved
