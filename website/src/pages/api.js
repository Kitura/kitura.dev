import React from "react"
import Layout from "../components/layout";
import Sidebar from "../components/sidebar/sidebar";
import { graphql } from "gatsby";

function apiPage({
  data, 
  location
}) {
  return (
    <Layout>
      <Sidebar activeList={location.state} data={data.apiList }/>
    </Layout>
  )
}

export default apiPage;

export const apiQuery = graphql`
  query {
    apiList: allApiListYaml {
      nodes {
        title
      }
    }
  }
`