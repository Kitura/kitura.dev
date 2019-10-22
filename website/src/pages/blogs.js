import React from "react"

import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import styles from "./blogs.module.css"

const blogs = ({
  data
}) => { 
  const { blogs } = data;

  const blogList = blogs.nodes.map((blog, index) => {
    return (
      <article className={styles.blogCard}>
        <Link to={blog.frontmatter.path}>
          <h2 className={styles.blogTitle}>{blog.frontmatter.title}</h2>
          <h3 className={styles.blogAuthor}>{blog.frontmatter.author}</h3>
          <h4 className={styles.blogDate}>{blog.frontmatter.date}</h4>
          <p>{blog.frontmatter.blurb}</p>
        </Link>
      </article>
    )
  })
  
  return (
    <Layout>
      <h1 className={styles.pageTitle}>Kitura <span style={{color: "#0096F4"}}>Blogs</span></h1>
      {blogList}
    </Layout>
  )
}

export default blogs;

export const blogsQuery = graphql`
  {
    blogs: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//web/news/blogs//"}}
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
    ) {
      nodes {
        html
        frontmatter {
          title
          blurb
          date
          path
          author
        }
      }
    }
  }
`