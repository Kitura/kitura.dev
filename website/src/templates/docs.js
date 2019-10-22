import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Sidebar from '../components/sidebar/sidebar';
import SidebarExtender from "../components/sidebar/sidebar-extender";

import "./docs.scss";

export default function Template({
    data,
    location
}) {
    const { docs, docsList } = data;
    return (
      <Layout>
        <section style={{display: "flex"}}>
          <Sidebar activeList={location.state} data={docsList} />
          <div id="docs-window" className="docs-window" dangerouslySetInnerHTML={{__html: docs.html}}></div>
          <SidebarExtender />
        </section>
      </Layout>
    )
}

export const docsQuery = graphql`
    query($path: String!) {
        docs: markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        },

        docsList: allDocsListYaml {
            nodes {
                title
                items {
                    title
                    link
                }
            }
        }
    }
`
