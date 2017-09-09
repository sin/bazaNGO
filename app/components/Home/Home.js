import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { searchForm, searchString, resultListContainer, resultList, resultItem, loading } from './styles.css'
import { getOrganizations } from '../../api'

class Home extends Component {
  constructor() {
    super()

    this.state = { isLoading: false }
  }

  componentWillMount() {
    this.update()
  }

  componentDidMount() {
    document.getElementsByClassName(searchString)[0].value = window.searchQuery || ''
  }

  searchResult({id, name}) {
    return (<li key={id} className={resultItem}><Link to={`/organization/${id}`}>{name}</Link></li>)
  }

  update() {
      this.setState({ isLoading: true})
      const searchInput = document.getElementsByClassName(searchString)[0]
      const search = searchInput ? searchInput.value : window.searchQuery
      getOrganizations(search).then(({results}) => {
        this.setState({
          results,
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
    const res = (this.state && this.state.results) || []
    return (
      <div className='container'>
        <div className={searchForm}>
          <input className={searchString} type='text' placeholder="Czego szukasz?" onChange={this.update.bind(this)}/>
        </div>
        <div className={resultListContainer}>
          <ul className={resultList}>
            {res.length > 0 ? res.map((el, key) => this.searchResult(el, key)) : this.loader()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
