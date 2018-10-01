import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getOrganization } from '../../api'
import styles from './styles.css'

class Edit extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    this.update()
  }

  searchResult({name}, key) {
    return (<li key={key} className={styles.resultItem}>{name}</li>)
  }

  update() {
    const id = this.props.match.params.id
    this.setState({ isLoading: true })
    getOrganization(id).then((organization) => {
      return this.setState({
        organization,
        isLoading: false
      })
    })
  }

  updateName() {
    const value = document.querySelector('.nameField').value
    const profile = {...this.state.organization.profile, name: value}
    const organization = {...this.state.organization, profile}
    this.setState({organization})
  }

  updatePurpose() {
    const value = document.querySelector('.purposeField').value
    const profile = {...this.state.organization.profile, purpose: value}
    const organization = {...this.state.organization, profile}
    this.setState({organization})
  }

  updateEmail() {
    const value = document.querySelector('.emailField').value
    const profile = {...this.state.organization.profile, email: value}
    const organization = {...this.state.organization, profile}
    this.setState({organization})
  }

  updatePhone() {
    const value = document.querySelector('.phoneField').value
    const profile = {...this.state.organization.profile, phone_number: value}
    const organization = {...this.state.organization, profile}
    this.setState({organization})
  }

  updateWww() {
    const value = document.querySelector('.wwwField').value
    const profile = {...this.state.organization.profile, www: value}
    const organization = {...this.state.organization, profile}
    this.setState({organization})
  }

  updateFacebook() {
    const value = document.querySelector('.facebookField').value
    const profile = {...this.state.organization.profile, facebook: value}
    const organization = {...this.state.organization, profile}
    this.setState({organization})
  }

  loader() {
    return (
      this.state && this.state.isLoading
        ? <div className={styles.loading}>{'Ładowanie...'}</div>
        : <div className={styles.fourofour}>{'404'}</div>
    )
  }

  render() {
    const organization = (this.state && this.state.organization) || { empty: true }
    let { id, name, purpose, profile, empty, detail } = organization
    profile = profile || {}
    return (
      <div className={styles.container}>
        {
          (!empty && !detail) ? (
            <div>
              <input className={`${styles.inputClass} nameField`} value={(profile && profile.name) || name} onChange={this.updateName.bind(this)}/>
              <textarea className={`${styles.purposeClass} purposeField`} defaultValue={purpose && purpose.split('. ').map((sentence) => sentence[0].toUpperCase() + sentence.substr(1).toLowerCase()).join('. ')} onChange={this.updatePurpose.bind(this)}/>
              <input placeholder='Email' className={`${styles.inputClass} emailField`} value={profile && profile.email} onChange={this.updateEmail.bind(this)}/>
              <input placeholder='Telefon' className={`${styles.inputClass} phoneField`} value={profile && profile.phone_number} onChange={this.updatePhone.bind(this)}/>
              <input placeholder='Strona internetowa' className={`${styles.inputClass} wwwField`} value={profile && profile.www} onChange={this.updateWww.bind(this)}/>
              <input placeholder='Facebook' className={`${styles.inputClass} facebookField`} value={profile && profile.facebook} onChange={this.updateFacebook.bind(this)}/>
              <Link className={styles.saveLink} to={`/organization/${id}/saved/`}>{'Zapisz'}</Link>
            </div>
          ) : (<span>{this.loader()}</span>)
        }
      </div>
    )
  }
}

export default Edit
