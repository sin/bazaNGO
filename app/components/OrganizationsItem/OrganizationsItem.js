import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Tag } from '../'
import styles from './styles.css'

const OrganizationsItem = ({ value: {id, name, tags, is_active: active}}) =>
  <li className={styles.container}>
    <Link to={`/organization/${id}`} className={styles.link}>
      <div className={styles.layout}>
        <div className={styles.name}>
          {name} {active ? '' : <span className={styles.inactive}>Nieaktywna</span>}
        </div>
        <div className={styles.tags}>
          {tags.map((name) => <Tag key={name} name={name} size={'small'} />)}
        </div>
      </div>
    </Link>
  </li>

OrganizationsItem.propTypes = {
  value: PropTypes.object.isRequired
}

export default OrganizationsItem
