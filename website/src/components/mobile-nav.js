import React from "react"

import { Link } from "gatsby"

import styles from "./mobile-nav.module.css"

const MobileNav = () => {

  return (
    <nav className={styles.mobileNav}> 
      <Link className={styles.navLink} to="/">Home</Link>

      <a className={styles.navLink} href="https://github.com/IBM-Swift/Kitura" target="_blank" rel="noopener noreferrer">GitHub</a>

      <Link className={styles.navLink} to="/learn">Learn</Link> 

      <Link className={styles.navLink} to="/api">API</Link>

      <Link className={styles.navLink} to="/news">News</Link>

      {/* <Link className={styles.navLink} to="/community">Community</Link> */}
    </nav>
  )
}

export default MobileNav