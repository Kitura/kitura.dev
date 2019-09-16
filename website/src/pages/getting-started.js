import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styles from './getting-started.module.css';

function GetStartedPage({
    data,
}) {
    return (
        <Layout>
            {data.allMarkdownRemark.nodes.map((node, index) => (
              <>
                <div className={styles.main} dangerouslySetInnerHTML={{ __html: node.html }}></div>
                <div className={(index === data.allMarkdownRemark.nodes.length - 1) ? styles.hide : styles.underline }></div>
              </>
            ))}
        </Layout>
    )
}

export default GetStartedPage;

export const getStartedQuery = graphql`
    {
        allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "//getting-started-overview//"}}
            sort: {
                fields: [frontmatter___order]
                order: ASC
            }
        ) {
            nodes {
                html
            }
        }
    }
`