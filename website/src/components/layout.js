/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import MobileHeader from "./mobile-header"
import Footer from "./footer"
import MobileNav from "./mobile-nav"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <MobileHeader />
      <main>
        {children}
      </main>
      <MobileNav />
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
