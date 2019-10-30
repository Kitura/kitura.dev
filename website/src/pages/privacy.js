import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout"

import "../templates/blogs.scss"

const privacy = ({data}) => {
  return (
    <Layout>
      <h1 style={{fontSize: "2.1rem", margin: "2rem 5vw 1rem 5vw"}}>{data.allMarkdownRemark.nodes[0].frontmatter.title}</h1>
      <div className="blogs-window" dangerouslySetInnerHTML={{__html: data.allMarkdownRemark.nodes[0].html}}></div>
    </Layout>
  )
}

export default privacy

export const privacyQuery = graphql`
  {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//web/privacy//"}}
    ) {
      nodes {
        html
        frontmatter {
          title
        }
      }
    }
  }
`