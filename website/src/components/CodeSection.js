import React, { useState } from "react";
import { useStaticQuery, graphql } from 'gatsby';

import styles from "./code-section.module.css";

function CodeSection() {

    const [index, setIndex] = useState(0);

    const data = useStaticQuery(graphql`
        {
            allMarkdownRemark(
                filter: {fileAbsolutePath: {regex: "/home/codeExample/codeSnippets//"}}
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
`   )

    const Button = (props) => {
        return (
            <button 
            className={
                props.isActive ? styles.activeCodeButton : styles.codeButton
            }
            onClick={() => setIndex(props.value) }
        >{props.name}</button>
        )
    }

    return (
        <section className={styles.codeExampleSection}>
            <div className={styles.leftButtonSection}>
                <Button name="Implement Routing" isActive={index===0} value={0} />
                <Button name="Implement Routing with Codable" isActive={index===1} value={1} />
                <Button name="Add Logging" isActive={index===2} value={2} />
            </div>
            <div className={styles.codeExample} >
            <div className={styles.codeSnippet} dangerouslySetInnerHTML={{__html: data.allMarkdownRemark.nodes[index].html}}></div>
            </div>
            <div className={styles.rightButtonSection}>
                <Button name={"Save to a Database"} isActive={index===3} value={3} />
                <Button name={"Add the OpenAPI spec"} isActive={index===4} value={4} />
                <Button name={"Render content within a browser"} isActive={index===5} value={5} />
            </div>
        </section>
    )

}

export default CodeSection;