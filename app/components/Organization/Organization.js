import React, { Component } from 'react'
import { container, name as nameClass, loading, fourofour } from './styles.css'
import { orgTags } from '../Home/styles.css'
import { getOrganization } from '../../api'

class Home extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    this.update()
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
      ? (<div className={loading}>Ładowanie...</div>)
      : (<div className={fourofour}>404</div>)
  }

  render () {
    const organization = (this.state && this.state.organization) || { empty: true }
    const { name, tags, purpose, street, street_number, flat_number, postal_code, city, register_at, nip, krs, empty, detail } = organization
    return  !empty && !detail ? (
      <div className={container}>
        <h1 className={nameClass}>{name}</h1>
        <div className={orgTags}>
          {tags.map((tag, index) => <span key={index}>{tag}</span>)}
        </div>
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
    ) : (<div className={container}>{this.loader()}</div>)
  }
}

export default Home
