import React, { Component } from 'react'
import { container, name as nameClass } from './styles.css'
import { getOrganization } from '../../api'

class Home extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    this.update()
    console.log(this.props)
  }

  searchResult({name}, key) {
    return (<li key={key} className={resultItem}>{name}</li>)
  }

  update() {
    const id = this.props.match.params.id
    this.setState({ isLoading: true})
    getOrganization(id).then((organization) => {
      this.setState({
        organization,
        isLoading: false
      })
    })
  }

  loader() {
    return this.state && this.state.isLoading
      ? (<li className={loading}>Ładowanie wyników...</li>)
      : (<li className={loading}>Brak wyników...</li>)
  }

  render () {
    const organization = (this.state && this.state.organization) || []
    const { name, purpose, street, street_number, flat_number, postal_code, city, register_at, nip, krs } = organization
    return (
      <div className={container}>
        <h1 className={nameClass}>{name}</h1>
        <p>{purpose && purpose.split('. ').map((sentence) => sentence[0].toUpperCase() + sentence.substr(1).toLowerCase()).join('. ')}</p>
        <h3>Adres</h3>
        <p>
          {street} {street_number}{flat_number ? `/${flat_number}` : ''}<br />
          {postal_code}, {city}
        </p>
        <h3>Informacje</h3>
        <p>
          <strong>NIP:</strong> {nip}<br />
          <strong>KRS:</strong> {krs}<br />
          <strong>Data rejestracji:</strong> {register_at}
        </p>
      </div>
    )
  }
}

export default Home
