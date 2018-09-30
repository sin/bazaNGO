import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Filters } from '../'
import styles, {
  container, searchForm, searchString, searchInputs, searchCategory,
  resultListContainer, resultList, resultItem, loading,
  tags as tagsClass, resultItemBody, resultItemName
} from './styles.css'
import { inactive } from '../../styles.css'
import { getOrganizations, getTags, getCategories } from '../../api'

class Home extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      results: [],
      page: 1,
      filters: {}
    }

    this.onFiltersChange = this.onFiltersChange.bind(this)
    this.onPageChange = this.onPageChange.bind(this)

    this.fetchData = this.fetchData.bind(this)
    this.onFetchData = this.onFetchData.bind(this)
  }

  onFiltersChange(filters) {
    this.setState({filters, page: 1}, this.fetchData)
  }

  onPageChange(page) {
    this.setState({ page }, this.fetchData)
  }

  fetchData() {
    this.setState({ isLoading: true}, () => {
      const { page, filters } = this.state
      getOrganizations(page, filters).then(this.onFetchData)
    })
  }

  onFetchData({results, count}) {
    this.scrollToTop()
    this.setState({
      isLoading: false,
      results,
      pages: Math.floor(count / 50)
    })
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  loader() {
    return this.state && this.state.isLoading
    ? (<li className={loading}>Ładowanie wyników...</li>)
    : (<li className={loading}>Brak wyników...</li>)
  }

  renderFilters () {
    return (
      <div className={styles.filtersContainer}>
        <Filters onChange={this.onFiltersChange.bind(this)}>
          <div className={styles.filters}>
            <div className={styles.filtersLayout}>
              <div className={styles.searchContainer}>
                <Filters.Search />
              </div>
              <div className={styles.categoriesContainer}>
                <Filters.Categories />
              </div>
            </div>
            <Filters.Tags />
          </div>
        </Filters>
      </div>
    )
  }

  renderSearchResult({id, name, tags, is_active}) {
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

  render () {
    const { isLoading, results, pages, page, tags, categories } = this.state

    return (
      <div className={container}>
        {this.renderFilters()}
        <div className={resultListContainer}>
          <ul className={resultList}>
            {results && results.length > 0 ? results.map((el, key) => this.renderSearchResult(el, key)) : this.loader()}
          </ul>
        </div>
        {isLoading ? null : <Pagination pages={pages} currentPage={page} onClick={this.onPageChange} />}
      </div>
    )
  }
}

export default Home
