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
        <p>The guides takes you through building a Kitura server. Following the guides from start to finish will provide you with the skills you need to create your own Kitura server!</p>
        <p>Structured in a way to allow you to enter at any point, just choose a section on the left and dive in!</p>
        <p>No prior knowledge of server-side Swift is required to follow these guides.</p>
      </article>
      <article className={styles.tutorialSection}>
        <h3>Kitura <span className={styles.blueText}>Tutorials</span></h3>
        <section className={styles.tutorials}>
        <article className={styles.tutorial}>
          <a href="https://github.com/IBM/ToDoBackend">
            <h4>ToDo Backend Tutorial</h4>
            <p>Learn about server-side Swift, REST APIs, OpenAPI, Docker and Kubernetes whilst creating a ToDo list backend.</p>
          </a>
        </article>
        <article className={styles.tutorial}>
          <a href="https://www.raywenderlich.com/1030830-the-openapi-spec-and-kitura-getting-started">
            <h4>The OpenAPI Spec and Kitura: Getting Started</h4>
            <p>Start using the OpenAPI spec with the Swagger API and Kitura to generate an SDK for your iOS app.</p>
          </a>
        </article>
        <article className={styles.tutorial}>
          <a href="https://www.raywenderlich.com/1032630-kitura-stencil-tutorial-how-to-make-websites-with-swift">
            <h4>Kitura Stencil Tutorial: How to make Websites with Swift</h4>
            <p>Find out about templating, then use the Stencil template engine alongside Swift to create a website for the Emoji Journal project.</p>
          </a>
        </article>
          <article className={styles.tutorial}>
            <a href="https://github.com/IBM/Kitura-SOS-Workshop">
              <h4>Kitura SOS Workshop</h4>
              <p>Develop a cloud native SOS Kitura application using WebSockets.</p>
            </a>
          </article>
        </section>
      </article>
    </section>
  )
}

export default DocsWindow
