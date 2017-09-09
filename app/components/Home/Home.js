import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { searchForm, searchString, resultListContainer, resultList, resultItem, loading, pagination, page as pageClass, active } from './styles.css'
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

  setPage(page) {
    this.setState({ page }, () => this.update())
  }


  onChange() {
    this.setState({ page: 1}, () => this.update())
  }

  update() {
      this.setState({ isLoading: true})
      const searchInput = document.getElementsByClassName(searchString)[0]
      const search = searchInput ? searchInput.value : window.searchQuery
      const page = this.state.page || (window.page || 1)
      window.searchQuery = search
      window.page = page
      getOrganizations(search, page).then(({results, count}) => {
        window.scrollTo(0, 0)
        this.setState({
          results,
          pages: Math.floor(count / 50),
          page,
          isLoading: false
        })
      })
  }

  loader() {
    return this.state && this.state.isLoading
    ? (<li className={loading}>Ładowanie wyników...</li>)
    : (<li className={loading}>Brak wyników...</li>)
  }

  pagination(pages, page) {
    return (
      Array.from({length: pages}).map((e, index) =>
        (
          <div
            key={index + 1}
            className={`${pageClass} ${index + 1 === page ? active : ''}`}
            onClick={this.setPage.bind(this, index + 1)}
          >
            {index + 1}
          </div>
        )
      )
    )
  }

  render () {
    const state = this.state || {}
    const { results, pages, page } = state

    return (
      <div className='container'>
        <div className={searchForm}>
          <input className={searchString} type='text' placeholder="Czego szukasz?" onChange={this.onChange.bind(this)}/>
        </div>
        <div className={resultListContainer}>
          <ul className={resultList}>
            {results && results.length > 0 ? results.map((el, key) => this.searchResult(el, key)) : this.loader()}
          </ul>
        </div>
        <div className={pagination}>
          {pages && pages > 2 ? this.pagination(pages, page): ''}
        </div>
      </div>
    )
  }
}

export default Home
