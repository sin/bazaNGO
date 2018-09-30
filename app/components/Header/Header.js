import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './styles.css'

const DEFAULT_HEADER_TEXT = 'Baza Organizacji Pozarządowych COP'

const Header = ({text = DEFAULT_HEADER_TEXT}) =>
  <div className={styles.header}>
    <h1 className={styles.text}>
      <Link to="/">
        {text}
      </Link>
    </h1>
  </div>

Header.propTypes = {
  text: PropTypes.string
}

export default Header
