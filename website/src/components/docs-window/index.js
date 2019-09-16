import React from "react"

import styles from "./docs-window.module.css"
const DocsWindow = () => {
  return (
    <section id="docs-window" className={styles.learnContainer}>
      <section className={styles.learnWelcome}>
        <h2 className={styles.subHeading}>WELCOME TO</h2>
        <h1 className={styles.mainHeading}>KITURA <span className={styles.blueText}>DOCS</span></h1>
        <p className={styles.headingText}>These are the official guides and tutorials for the Kitura framework.</p>
      </section>
      <article className={styles.usingDocs}>
        <h3>Using these docs</h3>
        <p>The Guides section takes you through building a Kitura server. Following the guides from start to finish will provide you with the skills you need to create your own Kitura server!</p>
        <p>The guides are also written in a way to allow you to enter at any point with your own application and follow through. So just choose a section on the left and dive in!</p>
        <p>No prior knowledge of Server-Side Swift is required to follow these guides.</p>
      </article>
      <article className={styles.tutorialSection}>
        <h3>Kitura <span className={styles.blueText}>Tutorials</span></h3>
        <section className={styles.tutorials}>
          <article className={styles.tutorial}>
            <a href="https://github.com/IBM/FoodTrackerBackend">
              <h4>Foodtracker Backend</h4>
              <p>We are announcing the release of Kitura 2.6. Click here to read more about what is new in Kitura!</p>
            </a>
          </article>
          <article className={styles.tutorial}>
            <a href="https://github.com/IBM/ToDoBackend">
              <h4>ToDo Backend Tutorial</h4>
              <p>We are announcing the release of Kitura 2.6. Click here to read more about what is new in Kitura!</p>
            </a>
          </article>
          <article className={styles.tutorial}>
            <a href="https://www.raywenderlich.com/1032630-kitura-stencil-tutorial-how-to-make-websites-with-swift">
              <h4>Kitura Stencil Tutorial: How to make Websites with Swift</h4>
              <p>We are announcing the release of Kitura 2.6. Click here to read more about what is new in Kitura!</p>
            </a>
          </article>
          <article className={styles.tutorial}>
            <a href="https://www.raywenderlich.com/1030830-the-openapi-spec-and-kitura-getting-started">
              <h4>The OpenAPI Spec and Kitura: Getting Started</h4>
              <p>We are announcing the release of Kitura 2.6. Click here to read more about what is new in Kitura!</p>
            </a>
          </article>
        </section>
      </article>
    </section>  
  )
}

export default DocsWindow