import React, { Component } from 'react'
import { container, steps, step } from './styles.css'

class Upload extends Component {
  constructor() {
    super()
  }

  render () {
    return (
      <div className={container}>
        <h1>Dodawanie NGO do bazy danych.</h1>
        <ol className={steps}>
          <li className={step}>
            Pobierz formularz.
            <button>Pobierz formularz</button>
            <p><em>Wskazówka: Kliknij przycisk powyżej aby pobrać szablon zgłoszenia.</em></p>
          </li>
          <li className={step}>
            Otwórz formularz w programie Excel i uzupełnij dane organizacji.
            <p><em>Wskazówka: Pobrany formularz znajdziesz w katalogu „Pobrane”.</em></p>
          </li>
          <li className={step}>
            Kliknij przycisk poniżej aby odesłać nam wypełniony formularz.
            <button>Wyślij formularz</button>
          </li>
        </ol>
      </div>
    )
  }
}

export default Upload
