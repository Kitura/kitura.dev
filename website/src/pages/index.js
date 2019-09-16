import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import CodeSection from "../components/CodeSection";
import ScrollIndicator from "../components/scroll-indicator";
import Button from "../components/button";
import styles from './index.module.css';
import SlantingGraphic from "../components/slanting-graphic";

function indexPage({
  data,
}) {
  const { social, links, blogs, welcomeIntro, welcome, landing } = data;
  return (
    <Layout>
    {/* Landing Section */}
    <section className={styles.landingSection}>
      <SlantingGraphic type={"main"} />
      <section className={styles.ctaSection}>
        <p className={styles.landingContent} dangerouslySetInnerHTML={{ __html: landing.nodes[0].html }}></p>
        <Button 
          size="large" 
          text="Get Started"
          link="/getting-started"
          externalLink={false} 
        />
      </section>
      <ScrollIndicator />
    </section>
    <SlantingGraphic type={"left"} />
    {/* Welcome Section */}
    <section className={styles.welcomeSection}>
      {/* Welcome to Kitura section */}
      <article className={styles.welcomeContent}>
        <h2>{welcomeIntro.nodes[0].frontmatter.title}</h2>
        <p dangerouslySetInnerHTML={{ __html: welcomeIntro.nodes[0].html }}></p>
      </article>
      {/* Why Kitura section */}
      <article className={styles.marketingSection}>
        <h3 className={styles.marketingTitle}>Why Kitura?</h3>
        <h4 className={styles.marketingSubtitle}>Kitura is...</h4>
        <section className={styles.marketingCardSection}>
        {welcome.nodes.map((node) => (
          <article className={styles.marketingCard}>
            <h5>{node.frontmatter.title}</h5>
            <div className={styles.marketingText} dangerouslySetInnerHTML={{ __html: node.html }}></div>
          </article>
        ))}
        </section>
      </article>
      <aside className={styles.sidebarSection}>
        <h6 className={styles.sidebarTitle}>Latest News</h6>
        {blogs.nodes.map((node) => (
          <article>
            <Link style={{textDecoration: "none"}} to={node.frontmatter.path}>
              <h4 className={styles.latestNewsTitle}>{node.frontmatter.title}</h4>
              <p className={styles.latestNewsText}>{node.frontmatter.blurb}</p>
            </Link>
          </article>
        ))}
        {links.nodes.map((node) => (
          <article>
            <h6 className={styles.sidebarTitle}>{node.frontmatter.title}</h6>
            <div className={styles.usefulLinks} dangerouslySetInnerHTML={{__html: node.html}}></div>
          </article>
        ))}
        {social.nodes.map((node) => (
          <article>
            <h6 className={styles.sidebarTitle}>{node.frontmatter.title}</h6>
            <p className={styles.socialText}>{node.frontmatter.description}</p>
            <section className={styles.socialButtonSection}>
              <Button size="medium" text="Chat to us" externalLink="http://slack.kitura.io/" />
              <p>{node.frontmatter.uxCopy}</p>
            </section>
          </article>
        ))}
      </aside>
    </section>
    {/* Code Example Section Styling */}
    <SlantingGraphic type={"right"} />
    <section className={styles.codeExampleSection}>
      <h2 className={styles.codeExampleTitle}>Simplicity in your apps:</h2>
      <p className={styles.codeExampleHelperText}>Click below to see short code examples for various features provided by <br></br> Kitura and its packages.</p>
      <CodeSection />
    </section>
  </Layout>
  )
}

export default indexPage;
export const pageQuery = graphql`
  {
    welcome: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//web/home/welcome/marketing//"}}
      sort: {
        fields: [frontmatter___order]
        order: ASC
      }
    ) {
      nodes {
        html
        frontmatter {
          title
        }
      }
    },

    landing: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//web/home/landing//"}}
    ) {
      nodes {
        html
      }
    },

    welcomeIntro: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//web/home/welcome/intro//"}}
    ) {
      nodes {
        html
        frontmatter {
          title
        }
      }
    },

    blogs: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//blogs//"}}
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
      limit: 2
    ) {
      nodes {
        html
        frontmatter {
          title
          blurb
          path
        }
      }
    },

    links: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//home/welcome/sidebar/links-section//"}}
    ) {
      nodes {
        html
        frontmatter {
          title
        }
      }
    },

    social: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//home/welcome/sidebar/social-section//"}}
    ) {
      nodes {
        frontmatter {
          title
          description
          button
          uxCopy
        }
      }
    }
  }    
`
