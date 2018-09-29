import React from 'react'
import styles from './styles.css'

const range = range => Array.from({length: range}, (_, index) => index + 1)

const PaginationItem = ({page, active, onClick}) =>
  <div
    className={`${styles.page} ${active ? styles.active : ''}`}
    onClick={onClick.bind(this, page)}
  >
    {page}
  </div>

const Pagination = ({pages, currentPage, onClick}) =>
  <div className={styles.pagination}>
    {
      range(pages).map(page =>
        <PaginationItem key={page} page={page} active={page === currentPage} onClick={onClick} />)
    }
  </div>

export default Pagination
