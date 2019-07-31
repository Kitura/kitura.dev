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
Use `<h1 class="heading-1">` tags for the title of the page.

Use `<h2 class="heading-2">` tags for headers of sections.

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
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
			<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-73924704-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

		gtag('config', 'UA-73924704-2', { 'anonymize_ip': true });
</script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
    <title>TITLE OF YOUR GUIDE HERE</title>
    <link rel="icon" type="image/png" href="../../assets/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="../../assets/favicon-16x16.png" sizes="16x16" />
    <link href=“https://fonts.googleapis.com/css?family=IBM+Plex+Sans” rel=“stylesheet”>
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/dist/docs.css">
  </head>
<body>
  <section class="docs-grid-container">
    <aside id="sidebar" class="docs-item-1 docs-sidebar">
      <h1 class="docs-title"><a href="/index.html">KITURA <span class="blue-text">DOCS</span></a></h1>
      <div class="underline-title"></div>
      <ul class="sidebar-list">
        <li class="sidebar-item collapsible">Getting Started</li>
        <ul class="nested-sidebar-list content">
          <li class="nested-sidebar-item"><a href="../getting-started/installation-mac.html">Install Swift for macOS</a></li>
          <li class="nested-sidebar-item"><a href="../getting-started/installation-linux.html">Install Swift for Linux</a></li>
          <li class="nested-sidebar-item"><a href="../getting-started/hello-world.html">Hello World</a></li>
          <li class="nested-sidebar-item"><a href="../getting-started/create-server.html">Create a server</a></li>

          <li class="nested-sidebar-item"><a href="../getting-started/update-package.html">Adding Packages</a></li>
        </ul>
        <li class="sidebar-item collapsible">Logging</li>
        <ul class="nested-sidebar-list content">
          <li class="nested-sidebar-item"><a href="../logging/logging.html">What is Logging?</a></li>
          <li class="nested-sidebar-item"><a href="../logging/helium-logger.html">Helium Logger</a></li>
        </ul>
        <li class="sidebar-item collapsible">Routing</li>
        <ul class="nested-sidebar-list content">
          <li class="nested-sidebar-item"><a href="../routing/routing.html">What is routing?</a></li>
          <li class="nested-sidebar-item"><a href="../routing/codable-routing.html">Codable routing</a></li>
          <li class="nested-sidebar-item"><a href="../routing/raw-routing.html">Raw routing</a></li>
          <li class="nested-sidebar-item"><a href="../routing/open-api.html">OpenAPI</a></li>
        </ul>
        <li class="sidebar-item collapsible">Databases</li>
        <ul class="nested-sidebar-list content" style="max-height: 250px;">
          <li class="nested-sidebar-item active"><a href="../databases/databases.html">What are Databases?</a></li>
          <li class="nested-sidebar-item"><a href="../databases/swift-kuery-orm.html">SQL: ORM</a></li>
          <li class="nested-sidebar-item"><a href="../databases/swift-kuery.html">SQL: Kuery</a></li>
          <li class="nested-sidebar-item"><a href="../databases/couchdb.html">NoSQL: CouchDB</a></li>
        </ul>
        <li class="sidebar-item collapsible">Sessions</li>
        <ul class="nested-sidebar-list content">
          <li class="nested-sidebar-item"><a href="../sessions/sessions.html">What are Sessions?</a></li>
          <li class="nested-sidebar-item"><a href="../sessions/kitura-session.html">Raw Routing Session</a></li>
          <li class="nested-sidebar-item"><a href="../sessions/type-safe-session.html">Codable Routing Session</a></li>
        </ul>
        <li class="sidebar-item collapsible">Authentication</li>
        <ul class="nested-sidebar-list content">
          <li class="nested-sidebar-item"><a href="../authentication/authentication.html">What is Authentication?</a></li>
          <li class="nested-sidebar-item"><a href="../authentication/typesafe-auth.html">Basic Authentication</a></li>
          <li class="nested-sidebar-item"><a href="../authentication/jwt-auth.html">JSON Web Tokens</a></li>
          <li class="nested-sidebar-item"><a href="../authentication/fb-google-oauth2.html">OAuth 2.0 with Facebook/Google</a></li>
        </ul>
        <li class="sidebar-item collapsible">Web Application</li>
        <ul class="nested-sidebar-list content">
          <li class="nested-sidebar-item"><a href="../templating/templating.html">What are Web Applications?</a></li>
          <li class="nested-sidebar-item"><a href="../templating/static-file-server.html">Static File Server</a></li>
          <li class="nested-sidebar-item"><a href="../templating/stencil.html">Stencil</a></li>
          <li class="nested-sidebar-item"><a href="../templating/markdown.html">Markdown</a></li>
        </ul>
        <li class="sidebar-item collapsible">Deploying</li>
        <ul class="nested-sidebar-list content">
          <li class="nested-sidebar-item"><a href="../deploying/monitoring.html">Monitoring</a></li>
          <li class="nested-sidebar-item"><a href="../deploying/ssl.html">Enabling SSL/TLS</a></li>
          <li class="nested-sidebar-item"><a href="../deploying/docker.html">Docker</a></li>
          <li class="nested-sidebar-item"><a href="../deploying/kubernetes.html">Kubernetes</a></li>
          <li class="nested-sidebar-item"><a href="../deploying/cloud-foundry.html">Cloud Foundry</a></li>
        </ul>
      </ul>
    </aside>
    <div id="burgerIcon" class="burger-icon" onclick="showSidebar()">
      <div class="burger-line"></div>
      <div class="burger-line"></div>
      <div class="burger-line"></div>
    </div>
    <div class="docs-item-2 search-container">
    </div>
    <nav class="docs-item-3 docs-nav">
      <button id="api-button" class="apiref-button" type="button" name="button" onclick="window.open('https://ibm-swift.github.io/Kitura/')">API Reference</button>
      <a class="nav-item" target="_blank" href="http://slack.kitura.io/">Need help?</a>
      <a class="nav-item" target="_blank" href="https://github.com/IBM-Swift/kitura.io/issues">Found an issue?</a>
    </nav>
    <div id="doc-container" class="docs-item-4 docs-window">
      <main>
        <h1 class="heading-1">Title of your guide here</h1>
        <p class="block-text">Overview of your guide here</p>
        <h2 class="heading-2">Sub section of your guide here</h2>
        <p class="block-text">Describe your guide here</p>
      </main>
    </div>
    <div id="top-page" class="top-page">
      <a href="#">Back to top</a>
    </div>
  </section>
  <script type="text/javascript" src="../../scripts/learn.js"></script>
</body>
</html>
```
