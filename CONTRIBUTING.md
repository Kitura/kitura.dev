## Contributing to www.kitura.io

Content on this site is licensed under the Apache Licence, Version 2.0.

### All Changes

#### Create development environment
1. Clone the kitura.io repo onto your machine:
	`git clone https://github.com/IBM-Swift/kitura.io`
2. Create a new branch for your development:
	`git checkout -b <branch>`
3. Once changes have been made, open a PR against master and link to the corresponding issue, if applicable.

### Changing an existing guide

Kitura.io is written in HTML, CSS and JS.

When editing existing topics you should adhere to the following guidelines, doing so will provide styling for you.

#### Headings
Use `<h1>` tags for the title of the page.

Use `<h2>` tags for headers of sections.

Use `<h3>` tags for sub headers.

`<h4>` and `<h5>` also have styling included, if further nesting is required.

#### Normal text/paragraphs
Use the `<p>` tag for this.
NOTE that spacing is added above and below these elements, so wrap an entire paragraph in a single `<p>` tag.
For single sentences use a `<p>` tag for each.

#### Code Examples
Swift code blocks should be wrapped in:
```
<pre><code class="language-swift">

</code></pre>
```
Non-Swift code blocks and single code lines should be wrapped in:
```
<pre><code>

</code></pre>
```
Single key words or functions should be wrapped in:
```
<span class="highlight"> </span>
```

#### Tables
Tables should be structured as follows:
```
<table>
    <thead>
      <tr>
        <th>Some table heading</th>
        ...
     </tr>
    </thead>
    <tbody>
      <tr>
        <td>Some table content</td>
        ...
      </tr>
    </tbody>
</table>
```

#### Notices
The `<blockquote>` tag can be used for messages that you want brought to a reader's attention.
There are three categories:
1. Warning - Use `<blockquote class="warning">`
2. Info - Use `<blockquote class="info">`
3. Tip - Use `<blockquote class="tip">`

### Creating a new guide

**NOTE** All points mentioned in the `Changing an existing guide` apply here as well.

Currently kitura.io only supports HTML documents, and any new guides will need to be written in HTML.
However if you'd like to write a guide but would prefer not to use HTML, get in touch with us on [Slack!](http://slack.kitura.io/)

To create a new guide in HTML use the following skeleton:
```
<html lang="en">

<head>
  <title>Learn - TITLE_OF_PAGE</title>
  <link rel="icon" type="image/png" href="../../assets/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="../../assets/favicon-16x16.png" sizes="16x16" />
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="../../scripts/prism.js"></script>
  <link rel="stylesheet" href="../../css/reset.css">
  <link rel="stylesheet" href="../../css/main.css">
  <link rel="stylesheet" href="../../css/guides.css">
  <link rel="stylesheet" media="screen and (max-width: 900px)" href="../../css/mobile_guides.css">
</head>

<header>
  <div class="header-container">
    <div class="header-main">
      <a class="home-link" href="../../index.html">
        <img class="header-logo" src="../../assets/kitura-logo.png" alt="Kitura logo">
        <h1 class="header-title">KITURA</h1>
      </a>
    </div>
    <nav class="header-nav">
      <a class="header-link active-nav" href="../../learn.html">LEARN</a>
      <a class="header-link" href="../../packages.html">CONTRIBUTE</a>
      <a class="header-link" href="../../events.html">MEET</a>
      <a class="header-link" href="../../help.html">SUPPORT</a>
    </nav>
  </div>
</header>
<body>
  <section class="guide-content">
    <div class="title-block">
        <img width="480px" src="../../assets/Kitura.svg" alt="Kitura Logo">
      <h1>TITLE_OF_GUIDE</h1>
    </div>
    /**
      Place your content here!
    */
  </section>
  <section class="slack-help">
    <a href="http://slack.kitura.io/">
      <img width="80px" src="../../assets/slack-icon.png" alt="Slack icon">
      <h2>NEED HELP?</h2>
      <h2>MESSAGE US ON SLACK.</h2>
    </a>
  </section>
</body>

<footer>
  <nav class="footer-nav">
    <a class="footer-link" href="https://forums.swift.org/c/related-projects/kitura">FORUMS</a>
    <a class="footer-link" href="https://github.com/IBM-Swift/Kitura"><img class="footer-logo" src="../../assets/Kitura-White.svg" alt="Kitura logo"></a>
    <a class="footer-link" href="https://developer.ibm.com/swift/blogs/">BLOGS</a>
  </nav>
</footer>
</html>
```
