import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  searchForm, searchString, resultListContainer, resultList, resultItem, loading, pagination,
  page as pageClass, active as activeClass, tags as tagsClass, resultItemBody, resultItemName
} from './styles.css'
import { getOrganizations, getTags } from '../../api'

class Home extends Component {
  constructor() {
    super()

    this.state = { isLoading: false }
  }

  componentWillMount() {
    this.getTags()
    this.update()
  }

  componentDidMount() {
    document.querySelector(`.${searchString}`).value = window.searchQuery || ''
  }

  searchResult({id, name, tags}) {
    return (
      <li key={id} className={resultItem}>
        <Link to={`/organization/${id}`}>
          <div className={resultItemBody}>
            <div className={resultItemName}>
              {name}
            </div>
            <div className={tagsClass}>
              {tags.map((tag, index) => (<span key={index}>{tag}</span>))}
            </div>
          </div>
        </Link>
      </li>
    )
  }

  setPage(page) {
    this.setState({ page }, () => this.update())
  }


  onChange() {
    this.setState({ page: 1}, () => this.update())
  }

  onTagClick(id) {
    let tags = this.state.tags.map((tag) => {
      tag = tag.id === id ? {...tag, active: !tag.active } : tag
      console.log(tag)
      return tag
    })
    this.setState({ tags, page: 1 }, () => this.update())
  }

  getTags() {
      window.tags
        ? this.setState({tags: window.tags})
        : getTags().then((tags) => this.setState({tags}))
  }

  update() {
      this.setState({ isLoading: true})
      const searchInput = document.getElementsByClassName(searchString)[0]
      const search = searchInput ? searchInput.value : window.searchQuery
      const page = this.state.page || (window.page || 1)
      const tags = this.state.tags || (window.tags || [])
      window.searchQuery = search
      window.page = page
      window.tags = tags
      getOrganizations(search, page, tags).then(({results, count}) => {
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
            className={`${pageClass} ${index + 1 === page ? activeClass : ''}`}
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
    const { results, pages, page, tags } = state

    return (
      <div className='container'>
        <div className={searchForm}>
          <input className={searchString} type='text' placeholder="Czego szukasz?" onChange={this.onChange.bind(this)}/>
          <div className={tagsClass}>
            {tags && tags.length > 0 ? tags.map(({id, name, slug, active}) =>
              (
                <span key={id} onClick={this.onTagClick.bind(this, id)} className={active ? activeClass : ''}>
                  {name}
                </span>
              )
            ) : ''}
          </div>
        </div>
        <div className={resultListContainer}>
          <ul className={resultList}>
            {results && results.length > 0 ? results.map((el, key) => this.searchResult(el, key)) : this.loader()}
          </ul>
        </div>
        <div className={pagination}>
          {pages && pages > 2 ? this.pagination(pages, page) : ''}
        </div>
      </div>
    )
  }
}

export default Home
