import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  container, searchForm, searchString, searchInputs, searchCategory,
  resultListContainer, resultList, resultItem, loading, pagination,
  page as pageClass, active as activeClass, tags as tagsClass,
  resultItemBody, resultItemName
} from './styles.css'
import { inactive } from '../../styles.css'
import { getOrganizations, getTags, getCategories } from '../../api'

class Home extends Component {
  constructor() {
    super()

    this.state = { isLoading: false }
  }

  componentWillMount() {
    this.getTags()
    this.getCategories()
    this.update()
  }

  componentDidMount() {
    document.querySelector(`.${searchString}`).value = window.searchQuery || ''
  }

  searchResult({id, name, tags, is_active}) {
    return (
      <li key={id} className={resultItem}>
        <Link to={`/organization/${id}`}>
          <div className={resultItemBody}>
            <div className={resultItemName}>
              {name} {is_active ? '' : <span className={inactive}>Nieaktywna</span>}
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
      return tag.id === id ? {...tag, active: !tag.active } : tag
    })
    this.setState({ tags, page: 1 }, () => this.update())
  }

  onCategoryChange() {
    const value = document.querySelector(`.${searchCategory} option:checked`).value
    const categories = this.state.categories.map((category) => ({...category, active: category.id === +value}))
    this.setState({ categories, page: 1 }, () => this.update())
  }

  getCategories() {
    window.categories
      ? this.setState({categories: window.categories})
      : getCategories().then((categories) => this.setState({categories}))
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
      const categories = this.state.categories || (window.categories || [])
      window.searchQuery = search
      window.page = page
      window.tags = tags
      window.categories = categories
      getOrganizations(search, page, tags, categories).then(({results, count}) => {
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

  renderPagination(pages, page) {
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

  renderCategories(categories) {
    const options = categories.map(({id, name, active}) =>
      (<option key={id} value={id}>{name}</option>))
    return [(<option key={0} value=''>Wszystkie kategorie</option>), ...options]
  }

  render () {
    const state = this.state || {}
    const { results, pages, page, tags, categories } = state
    const hasCategories = categories && categories.length > 0
    const activeCategory = hasCategories ? categories.find(({active}) => active) : { id: 0 }
    const selectedCategory = activeCategory ? activeCategory.id : 0
    return (
      <div className={container}>
        <div className={searchForm}>
          <div className={searchInputs}>
            <input className={searchString} type='text' placeholder="Czego szukasz?" onChange={this.onChange.bind(this)}/>
            <div className={searchCategory}>
              <select
                name="select"
                onChange={this.onCategoryChange.bind(this)}
                defaultValue={selectedCategory}
              >
                { hasCategories ? this.renderCategories(categories) : <option>Wszystkie kategorie</option>}
              </select>
            </div>
          </div>
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
          {pages && pages > 2 ? this.renderPagination(pages, page) : ''}
        </div>
      </div>
    )
  }
}

export default Home
