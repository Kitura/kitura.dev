import React from "react"
import { Link } from "gatsby"

import styles from "./footer.module.css"

const footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/privacy" className={styles.footerLink}>Privacy</Link>
      <div className={styles.separator}></div>
      <a href="https://github.com/IBM-Swift/Kitura/blob/master/LICENSE.txt" className={styles.footerLink}>License</a>      
    </footer>
  )
}

export default footer