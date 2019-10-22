import  React from "react"

import { graphql } from 'gatsby'

import Layout from "../components/layout"

import "./blogs.scss"

export default function BlogTemplate({
  data, 
}) {

  const { blog } = data;
  return (
    <Layout>
      <h1 className="blog-title">{blog.frontmatter.title}</h1>
      <h3 className="blog-author">By {blog.frontmatter.author}</h3>
      <h4 className="blog-date">Created on {blog.frontmatter.date}</h4>
      <div className="blogs-window" dangerouslySetInnerHTML={{__html: blog.html}}></div>
    </Layout>
  )
}

export const blogQuery = graphql`
  query($path: String!) {
    blog: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date
      }
    }
  }
`