import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.module.css";

import Search from "./search";

import kituraLogo from "../images/Kitura.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
          <Link className={styles.homeLink} to="/">
              <img className={styles.headerImage} src={kituraLogo} alt="Kitura Logo"></img>
              <h1>KITURA</h1> 
          </Link>
      </div>         
      <nav className={styles.headerNav}> 
          <a className={styles.navLink} href="https://github.com/IBM-Swift/Kitura" target="_blank" rel="noopener noreferrer">GitHub</a>
      
          <Link className={styles.navLink} to="/learn">Learn</Link> 
      
          <a className={styles.navLink} href="https://ibm-swift.github.io/Kitura/">API</a>
      
          <Link className={styles.navLink} to="/news">News</Link>
      
          {/* <Link className={styles.navLink} to="/community">Community</Link> */}
      </nav>
      <Search />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
