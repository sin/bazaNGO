import React from 'react'
import styles from './styles.css'

const GITHUB_URL = 'https://github.com/sin/bazaNGO'

const Footer = () =>
  <div className={styles.footer}>
    <p>
      {'Made with '}
      <i className="fa fa-heart" aria-label="<3" />
      {' at HackSilesia 2017'}
    </p>
    <p>
      <a href={GITHUB_URL}>{'Fork us on GitHub'}</a>
    </p>
  </div>

export default Footer
