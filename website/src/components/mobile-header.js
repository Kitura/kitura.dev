import { Link } from "gatsby"
import React from "react"
import styles from "./mobile-header.module.css";

import Search from "./search";

import kituraLogo from "../../../content/images/Kitura.svg";

const MobileHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
          <Link className={styles.homeLink} to="/">
              <img className={styles.headerImage} src={kituraLogo} alt="Kitura Logo"></img>
              <h1>KITURA</h1> 
          </Link>
      </div>
      <Search />
    </header>
  )
}

export default MobileHeader
