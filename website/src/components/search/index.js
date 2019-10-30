import React, { Component } from "react"
import * as JsSearch from "js-search"
import {Link, StaticQuery } from "gatsby"

import styles from "./search.module.css"

class Search extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.closeDropdown = this.closeDropdown.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
  }

  state = {
    pageList: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({pageList: this.props.items }, () => {
      this.rebuildIndex()
    });
  }

  rebuildIndex = () => {
    const { pageList } = this.state
    const dataToSearch = new JsSearch.Search("html")

    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()

    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()

    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("html")

    dataToSearch.addIndex("html")

    dataToSearch.addDocuments(pageList)

    this.setState({search: dataToSearch, isLoading: false})
  }

  searchData = e => {
    const { search } = this.state
    const queryResult = search.search(e.target.value)

    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  closeDropdown() {
    this.setState({
      isOpen: false
    });
  }

  openDropdown() {
    this.setState({
      isOpen: true
    });
  }

  render() {
    const { searchResults, searchQuery } = this.state
    const queryResults = searchResults
    if (this.state.isOpen) {
      return (
        <div className={styles.dropdown}>
          <form className={styles.searchSection} onSubmit={this.handleSubmit}>
            <input className={styles.activeInput} onClick={this.openDropdown} type="text" placeholder="Search" aria-label="Search" value={searchQuery} onChange={this.searchData} />
          </form>
          <div className={this.state.isOpen ? styles.dropdownContent : styles.dropdownContentHide}>
            <table className={styles.resultsTable}>
            <tbody className={styles.resultBody}>
              {queryResults.map(item => {
                let docType = "";
                if (item.frontmatter.path.includes("blogs")) {
                  docType = "Blog post"
                } else {
                  docType = "Guide"
                }
                return (
                    <tr className={styles.searchRow} key={`row_${item.frontmatter.title}`}>
                      <Link onClick={this.closeDropdown} to={item.frontmatter.path}>
                        <td className={styles.typeCell}>
                          {docType}
                        </td>
                        <td className={styles.searchCell}>
                          {item.frontmatter.title}
                        </td>
                      </Link>
                    </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      return (
        <div className={styles.dropdown}>
          <form  className={styles.searchSection} onSubmit={this.handleSubmit}>
            <input className={styles.activeInput} onClick={this.openDropdown} type="text" placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={this.searchData}
            />
          </form>
          <div className={this.state.isOpen ? styles.dropdownContent : styles.dropdownContentHide}>
            <table className={styles.resultsTable}>
              <tbody className={styles.resultBody}>
                {queryResults.map(item => {
                   let docType = "";
                   if (item.frontmatter.path.includes("blogs")) {
                     docType = "Blog post"
                   } else {
                     docType = "Guide"
                   }
                  return (
                    <tr className={styles.searchRow} key={`row_${item.frontmatter.title}`}>
                      <Link onClick={this.closeDropdown} to={item.frontmatter.path}>
                        <td className={styles.typeCell}>
                          {docType}
                        </td>
                        <td className={styles.searchCell}>
                          {item.frontmatter.title}
                        </td>
                      </Link>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}

export default () => (
  <StaticQuery query={
    graphql`
      query {
        guides: allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "//docs/guides//"}}
        ) {
          edges {
            node {
              html
              frontmatter {
                path
                title
              }
            }
          }
        },
        blogs: allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "//web/news/blogs//"}}
        ) {
          edges {
            node {
              html
              frontmatter {
                path
                title
              }
            }
          }
        }
      }
    `}
    render={data => {
      let items = [];

      const { blogs, guides } = data;

      guides.edges.forEach(node => {
        items = items.concat(node.node);
      });
    
      blogs.edges.forEach(node => {
        items = items.concat(node.node);
      });
      return <Search items={items}/>
    }}
    />
)