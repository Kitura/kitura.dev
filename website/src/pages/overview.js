import React from "react"

import { graphql } from "gatsby"
import Layout from "../components/layout"

const overview = ({
  data,
}) => {
  return (
    <Layout>
      <h1>{data.overview.nodes[0].frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: data.overview.nodes[0].html}}></div>
    </Layout>
  )
}

export default overview

export const pageQuery = graphql`
  {
    overview: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//web/overview//"}}
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