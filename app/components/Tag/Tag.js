import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import noop from 'lodash/noop'

import styles from './styles.css'

const Tag = ({name, active = false, onClick}) => {
  const classes = classNames(
    styles.tag,
    active ? styles.active : '',
    onClick ? styles.clickable : ''
  )

  return (
    <span onClick={onClick || noop} className={classes}>
      {name}
    </span>
  )
}

Tag.propTypes = {
  name: propTypes.string.isRequired,
  active: propTypes.bool,
  onClick: propTypes.func
}

export default Tag
