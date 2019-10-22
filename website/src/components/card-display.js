import React from 'react';
import styles from './card-display.module.css';

function CardDisplay(props) {
    return (
        <section className={styles.blogSection}>
            <h1 className={styles.sectionHeader}>{props.title[0]} <span className={styles.blueText}>{props.title[1]}</span></h1>
            <section className={styles.blogCardSection}>
                <article className={styles.topLeftCard}>
                    <h2 className={styles.cardTitle}>{props.data.nodes[0].frontmatter.title}</h2>
                    <p className={styles.cardText}>{props.data.nodes[0].frontmatter.blurb}</p>
                </article>
                <article className={styles.topRightCard}>
                    <h2 className={styles.cardTitle}>{props.data.nodes[1].frontmatter.title}</h2>
                    <p className={styles.cardText}>{props.data.nodes[1].frontmatter.blurb}</p>
                </article>
                <article className={styles.bottomLeftCard}>
                    <h2 className={styles.cardTitle}>{props.data.nodes[2].frontmatter.title}</h2>
                    <p className={styles.cardText}>{props.data.nodes[2].frontmatter.blurb}</p>
                </article>
                <article className={styles.bottomRightCard}>
                    <h2 className={styles.cardTitle}>See more?</h2>
                    {/* <p className={styles.cardText}>View more of our blogs!</p> */}
                    <h2 className={styles.cardTitle}>Want to add your own?</h2>
                    {/* <p className={styles.cardText}>Contribute your own blogs!</p> */}
                </article>
            </section>
        </section>
    )
}

export default CardDisplay;