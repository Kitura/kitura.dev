import React from "react"
import Layout from "../components/layout"

import styles from "./news.module.css"

import { graphql, Link } from "gatsby"

const News = ({
  data,
}) => {

  const { blogs, media } = data;
  return (
    <Layout>
      <section className={styles.newsContainer}>
        <section className={styles.newsSection}>
          <h2 className={styles.newsTitle}>Kitura <span className={styles.blueText}>Blogs</span></h2>
          <div className={styles.cardGrid}>
            {blogs.nodes.map(blog => (
              <article className={styles.card}>
                <Link to={blog.frontmatter.path}> 
                  <h3>{blog.frontmatter.title}</h3>
                  <p>{blog.frontmatter.blurb}</p>
                </Link>
              </article>
            ))}
            <article className={styles.card}>
              <Link to="/blogs">
                <h3>Want more?</h3>
                <p>View our entire collection of blogs.</p>
              </Link>
            </article>
          </div>
        </section>
        <section className={styles.newsSection}>
          <h2 className={styles.newsTitle}>Kitura <span className={styles.blueText}>Media</span></h2>
          <div className={styles.cardGrid}>
            {media.nodes.map(singleMedia => (
              <article className={styles.card}>
                <a href={singleMedia.frontmatter.path}>
                  <h3>{singleMedia.frontmatter.title}</h3>
                  <p>{singleMedia.frontmatter.blurb}</p>
                </a>
              </article>
            ))}
          </div>
        </section>
      </section>
    </Layout>
  )
}

export default News

export const newsQuery = graphql`
    {
        blogs: allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "//web/news/blogs//"}}
            sort: {
              fields: [frontmatter___date]
              order: DESC
            }
            limit: 3
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
        media: allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "//web/news/media//"}}
            sort: {
                fields: [frontmatter___date]
                order: DESC
            }
            limit: 4
        ) {
            nodes {
                frontmatter {
                    title
                    blurb
                    path
                }
            }
        }
    }
`