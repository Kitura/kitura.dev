import React from 'react'

import styles from './slanting-graphic.module.css'

const slantingGraphic = ({ type }) => {

  if (type === "main") {
    return (
      <div className={styles.mainParentContainer}>
        <div className={styles.mainTopGraphic}> 
          <div className={styles.mainBottomGraphic}></div>
        </div>
      </div>
    )
  } else if (type === "left") {
    return (
      <div className={styles.leftParentContainer}>
        <div className={styles.leftTopGraphic}> 
          <div className={styles.leftBottomGraphic}></div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.rightParentContainer}>
        <div className={styles.rightTopGraphic}> 
          <div className={styles.rightBottomGraphic}></div>
        </div>
      </div>
    )
  }
}

export default slantingGraphic