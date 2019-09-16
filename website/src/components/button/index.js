import React from "react"
import { Link } from "gatsby"

import styles from "./button.module.css"

const Button = ({ size, text, link, externalLink }) => {

  if (size === "large") {
    return (
      <Link to={link}>
        <button className={styles.largeButton}>
          {text}
        </button>
      </Link>
    )
  } else {
    return (
      <a href={externalLink}>
        <button className={styles.smallButton}>
          {text}
        </button>
      </a>
    )
  }
}

export default Button