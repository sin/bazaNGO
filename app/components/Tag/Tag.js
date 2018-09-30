import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import noop from 'lodash/noop'
import styles from './styles.css'

const sizes = {
  normal: '',
  big: styles.big,
  small: styles.small
}

const Tag = ({name, size = 'normal', active = false, onClick}) => {
  const classes = classNames(
    styles.tag,
    sizes[size],
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
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
}

export default Tag
