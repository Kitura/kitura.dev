import React, { useState } from 'react';
import { Link } from 'gatsby';

import styles from './sidebar.module.css';

import Collapsible from 'react-collapsible';

function Sidebar(props) {

    const initialValue = () => {

        if (props.activeList === undefined || props.activeList === null) {
            const arraySize = props.data.nodes.length
            var initialArray = []
            for (var i = 0; i < arraySize; i++) {
                initialArray.push(false)
            }
            return (
                initialArray
            )
        } else {
            return (
                props.activeList
            )
        }
    }

    const [isActive, setIsActive] = useState(initialValue);

    function clickHandler(index) {
        var tmpArray = isActive;
        tmpArray[index] = !tmpArray[index]
        setIsActive(tmpArray)
    }

    const docsList = props.data.nodes.map((node, index) => {
        var tempValue;
        if (node.items === undefined) {
            tempValue = (
                <article key={`sidebar-title-${index}`} className={styles.sidebarSection}>
                    <h2 className={styles.activeLink}>{node.title}</h2>
                </article>
            )
        } else {
            const activeLinkStyles = {
                color: '#0096F4'
            }
            if (node.title === "API") {
                tempValue = (
                    <div className={styles.refSection}>
                    <hr className={styles.hr}></hr>
                    <h2 className={styles.refHeading}>Reference</h2>
                    <article className={styles.sidebarSection}>
                        <Collapsible open={isActive[index]} trigger={<h2 className={styles.sidebarParentItem} onClick={() => clickHandler(index)}>{node.title}</h2>}>
                        <section className={styles.nestedSidebarSection}>
                            {node.items.map((item, index) => (
                                <p key={`sidebar-api-${index}`} className={styles.nestedSidebarItem}><Link activeStyle={activeLinkStyles} state={isActive} className={styles.sidebarLink} to={item.link}>{item.title}</Link></p>
                            ))}
                        </section>
                        </Collapsible>
                    </article>
                    </div>
                )
            } else {
                tempValue = (
                    <article className={styles.sidebarSection}>
                        <Collapsible open={isActive[index]} trigger={<h2 className={styles.sidebarParentItem} onClick={() => clickHandler(index)}>{node.title}</h2>}>
                        <section className={styles.nestedSidebarSection}>
                            {node.items.map((item, index) => (
                                <p key={`sidebar-guides-${index}`} className={styles.nestedSidebarItem}><Link activeStyle={activeLinkStyles} state={isActive} className={styles.sidebarLink} to={item.link}>{item.title}</Link></p>
                            ))}
                        </section>
                        </Collapsible>
                    </article>
                )
            }
        }

        return tempValue;
    })
    return (
        <aside id="sidebar" className={styles.sidebar}>
            <h2 className={styles.guidesHeading}>Guides</h2>
            {docsList}
        </aside>
    )
}

export default Sidebar;