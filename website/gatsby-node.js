const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const docTemplate = path.resolve(`src/templates/docs.js`)
  const blogTemplate = path.resolve(`src/templates/blogs.js`)

  return graphql(`
    {
      guides: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "//docs/guides//"}}
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }, 

      blogs: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "//web/news/blogs//"}}
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const {blogs, guides} = result.data;

    blogs.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogTemplate,
        context: {}, // additional data can be passed via context
      })
    })

    guides.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: docTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}
