import React from "react";

import styles from "./scroll-indicator.module.css"

class ScrollIndicator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const currentScrollpos = window.pageYOffset;

        const visible = currentScrollpos < 50;
        this.setState({
        visible
        });
    }

    render() {
        return (
            <section className={this.state.visible ? styles.scrollSection : styles.hidden }>
                <p className={styles.scrollText}>scroll down</p>
                <div className={styles.scrollIndicator}></div>
            </section>
        )
    }
}

export default ScrollIndicator;