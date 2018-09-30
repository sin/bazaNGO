import React, { Component, createContext } from 'react'
import propTypes from 'prop-types'
import debounce from 'lodash/debounce'

import { Categories, Tags } from '../'
import { getCategories, getTags } from '../../api'
import styles from './styles.css'

const SEARCH_DELAY = 250

const Loading = ({text}) =>
  <p className={styles.loading}>{text}</p>

Loading.propTypes = {
  text: propTypes.string.isRequired
}

class Filters extends Component {
  static propTypes = {
    onChange: propTypes.func.isRequired,
    children: propTypes.node.isRequired
  }

  constructor() {
    super()

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onTagClick = this.onTagClick.bind(this)

    this.onFiltersChangeDelayed = debounce(this.onFiltersChange, SEARCH_DELAY).bind(this)

    this.state = {
      isLoading: true,
      categories: [],
      tags: [],
      search: '',
      category: '',
      activeTags: [],
      onSearchChange: this.onSearchChange,
      onCategoryChange: this.onCategoryChange,
      onTagClick: this.onTagClick
    }
  }

  componentDidMount() {
    this.onFiltersChange()
    Promise.all([getTags(), getCategories()]).then(([tags, categories]) =>
      this.setState({tags, categories, isLoading: false})
    )
  }

  onSearchChange({target: {value: search}}) {
    this.setState({ search }, this.onFiltersChangeDelayed)
  }

  onCategoryChange({target: {value: category}}) {
    this.setState({ category: category }, this.onFiltersChange)
  }

  onTagClick(id) {
    let activeTags = this.state.activeTags
    activeTags = activeTags.includes(id)
      ? activeTags.filter(activeTag => activeTag !== id)
      : [...activeTags, id]
    this.setState({ activeTags }, this.onFiltersChange)
  }

  onFiltersChange() {
    let { search, category, activeTags, categories, tags } = this.state

    // TODO: Update API to accept ids for categories and tags
    const byId = id => val => val.id === id
    activeTags = activeTags.map(id => tags.find(byId(id)).name)
    category = category && categories.find(byId(Number(category))).name

    this.props.onChange({ search, category, activeTags })
  }

  static Context = createContext()

  static Search({placeholder = 'Szukaj…'}) {
    return (
      <Filters.Context.Consumer>
        {
          ({search, onSearchChange}) =>
            <input
              type='text'
              className={styles.search}
              placeholder={placeholder}
              onChange={onSearchChange}
              value={search}
            />
        }
      </Filters.Context.Consumer>
    )
  }

  static Categories() {
    return <Filters.Context.Consumer>{Categories}</Filters.Context.Consumer>
  }

  static Tags() {
    return <Filters.Context.Consumer>{Tags}</Filters.Context.Consumer>
  }

  render() {
    const { isLoading } = this.state
    return (
      <Filters.Context.Provider value={this.state}>
        {isLoading ? <Loading text='Ładowanie…' /> : this.props.children}
      </Filters.Context.Provider>
    )
  }
}

export default Filters
