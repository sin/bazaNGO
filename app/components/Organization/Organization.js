import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { container, editLink, name as nameClass, loading, fourofour, contact, positions, adminName, adminPosition } from './styles.css'
import { orgTags } from '../Organizations/styles.css'
import { getOrganization } from '../../api'
import { inactiveHeader } from '../../styles.css'

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
    const { id, name, is_active, tags, purpose, street, street_number, flat_number, postal_code, city, register_at, nip, krs, profile, administration, empty, detail } = organization
    const hasProfile = profile && (profile.email || profile.facebook || profile.phone_number || profile.www)
    return  !empty && !detail ? (
      <div className={container}>
        {this.props.disableEdit ? '' : (<Link className={editLink} to={`/organization/${id}/edit/`}>Edytuj dane</Link>)}
        <h1 className={nameClass}>
          {(profile && profile.name) || name}
          {is_active ? '' : <span className={inactiveHeader}>Nieaktywna</span>}
        </h1>
        <div className={orgTags}>
          {tags.map((tag, index) => <span key={index}>{tag}</span>)}
        </div>
        <p>{purpose && purpose.split('. ').map((sentence) => sentence[0].toUpperCase() + sentence.substr(1).toLowerCase()).join('. ')}</p>
        {hasProfile ?
          (
            <span className={contact}>
              <h3>Kontakt</h3>
              <p>
                {profile.email ? (<span><i className="fa fa-envelope-o" aria-hidden="true" /> <strong>Email:</strong> <a href={profile.email}>{profile.email}</a><br/></span>) : ''}
                {profile.phone_number ? (<span><i className="fa fa-phone" aria-hidden="true" /> <strong>Telefon:</strong> {profile.phone_number}<br/></span>) : ''}
                {profile.www ? (<span><i className="fa fa-external-link" aria-hidden="true" /> <strong>WWW:</strong> <a href={profile.www}>{profile.www}</a><br/></span>) : ''}
                {profile.facebook ? (<span><i className="fa fa-facebook-official" aria-hidden="true" /> <strong>Facebook:</strong> <a href={profile.facebook}>{profile.facebook}</a></span>) : ''}
              </p>
            </span>
          )
          : ''
        }
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
        {administration && administration.length > 0 ?
          (
            <span className={positions}>
              <h3>Członkowie zarządu</h3>
              <div>
                {administration.map(({id, full_name, position}) => (
                  <p key={id}>
                    <span className={adminName}>{full_name}</span><br />
                    <span className={adminPosition}>{position}</span>
                  </p>
                ))}
              </div>
            </span>
          )
          : ''
        }
      </div>
    ) : (<div className={container}>{this.loader()}</div>)
  }
}

export default Home
