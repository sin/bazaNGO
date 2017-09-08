import React, { Component } from 'react'
import { question, choices, choice, choiceLink } from './styles.css'
import { Link } from 'react-router-dom'

class Home extends Component {
  render () {
    return (
      <div className="container">
        <h2 className={question}>Co chcesz zrobić?</h2>
        <div className={choices}>
          <div className={choice}>
            <Link to='/' className={choiceLink}>
              <span>Jestem urzędnikiem</span>
                Chcę dodać NGO do bazy
              </Link>
          </div>
          <div className={choice}>
            <Link to='/' className={choiceLink}>
              <span>Jestem przedstawicielem NGO</span>
              Chcę dodać swoją organizację do bazy
            </Link>
          </div>
          <div className={choice}>
            <Link to='/' className={choiceLink}>
              Chcę znaleźć NGO
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
