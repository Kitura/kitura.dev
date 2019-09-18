import React, { useState } from "react"
import styles from "./sidebar-extender.module.css"


const SidebarExtender = () => {

  const [isExpanded, setIsExpanded] = useState(true);

  function moveSidebar() {
    setIsExpanded(!isExpanded)
    const sidebar = document.querySelector('#sidebar');
    const docsWindow = document.querySelector('#docs-window');
    const animationTimings = {
      fill: "forwards",
      duration: 500,
      iterations: 1
    };
    if (isExpanded) {
      sidebar.animate([
        {
          transform: "translateX(0)"
        },
        {
          transform: "translateX(calc(-50vw))"
        }
      ], animationTimings);

      docsWindow.animate([
        {
          transform: "translateX(0)",
          transform: "width: 50%"
        },
        {
          transform: "translateX(calc(-50vw))",
          transform: "width: 100%"
        }
      ], animationTimings)
    } else {
      sidebar.animate([
        {
          transform: "translateX(calc(-50vw))",
        },
        {
          transform: "translateX(0)",
        }
      ], animationTimings);

      docsWindow.animate([
        {
          transform: "translateX(calc(-50vw))",
          transform: "width: 100%"
        },
        {
          transform: "translateX(0)",
          transform: "width: 50%"
        }
      ], animationTimings)
    }
  }

  return (
    <section onClick={() => moveSidebar()} className={styles.burgerIcon}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </section>
  )
}

export default SidebarExtender