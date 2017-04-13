---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Serving Static Content
menu: resources
lang: en
redirect_from: "/resources/staticcontent.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
<h1>Serving Static Content</h1>
<p>In Kitura, static content is served using the `StaticFileServer` middleware.</p>
</div>

To set up the middleware, first create your router then specify which path should use the middleware.

```swift
import Kitura

let router = Router()

router.all("/static", middleware: StaticFileServer())
```
In the case above, any request starting with `/static` will be passed to the `StaticFileServer` to look for a matching file (ex: `/static/about.html` will serve the page `about.html` if found).
Note that the request that's just `/static` will be matched to `index.html` if found.

When searching for files, `StaticFileServer` looks by default in the `public` directory.

```
+-- Package.swift
+-- Sources
|   +-- MyApp
|       +-- main.swift
+-- public
+-- index.html
```

To change this default, you can specify your desired path in the `path` parameter
```swift
router.all("/my/path", middleware: StaticFileServer(path: "./files"))
