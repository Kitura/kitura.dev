import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Sidebar from '../components/sidebar/sidebar';
import SidebarExtender from "../components/sidebar/sidebar-extender";
import DocsWindow from "../components/docs-window";

function learnPage({
  data,
  location
}) {
  const isMobile = window.innerWidth < 600;
  
  if (isMobile){
    return (
      <Layout>
        <section style={{display: "flex"}}>
          <Sidebar activeList={location.state} data={data.docsList}/>
          <DocsWindow />
          <SidebarExtender />
        </section>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <section style={{display: "flex"}}>
          <Sidebar activeList={location.state} data={data.docsList}/>
          <DocsWindow />
        </section>
      </Layout>
    )
  }
}

export default learnPage;

export const docsQuery = graphql`
  query {
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