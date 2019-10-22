/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import { Helmet } from "react-helmet";

import Header from "./header"
import MobileHeader from "./mobile-header"
import Footer from "./footer"
import MobileNav from "./mobile-nav"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <> 
      <Helmet>
        <meta charset="UTF-8"></meta>
        <title>Kitura - An Enterprise-Grade Server-Side Swift Web Framework</title>
        <meta name="description" content="Kitura is an enterprise-grade server-side Swift web framework, backed by IBM. Kitura makes it possible to build web sites, REST APIs, and full-stack Swift applications using Swift's key tenets of Safe, Expressive and Fast." />
        <meta name="keywords" content="kitura, microservice, server-side swift, swiftlang" />
        <meta property="og:title" content="Kitura - An Enterprise-Grade Server-Side Swift Web Framework" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kitura.io/" />
        <script src="https://unpkg.com/web-animations-js@2.3.2/web-animations.min.js"></script>
        <script src="https://unpkg.com/muuri@0.8.0/dist/muuri.min.js"></script>
      </Helmet>
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
