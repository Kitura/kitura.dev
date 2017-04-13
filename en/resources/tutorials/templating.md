---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Templating
menu: resources
lang: en
redirect_from: "/resources/templating.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Using Templating Engines with Kitura</h1>
</div>

Kitura is a lightweight, modular framework &mdash; this means that by default you get only basic HTTP functionality, like routing, parameter handling, parsing request body, etc. You can augment Kitura's out-of-the-box functionality by adding additional packages to your `Package.swift` file.

A [template engine](https://en.wikipedia.org/wiki/Template_processor) allows rendering of documents using static templates by substituting template variables with actual values at runtime. This page explains how you can use template engines integrated with Kitura in your Kitura apps.

---

## Kitura template engines
Kitura template engines are classes that implement the `TemplateEngine` protocol from the [Kitura-TemplateEngine package](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift). Currently, three Kitura template engines are supported:

1. [Kitura-Markdown](https://github.com/IBM-Swift/Kitura-Markdown).
2. [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine).
3. [Kitura-StencilTemplateEngine](https://github.com/IBM-Swift/Kitura-StencilTemplateEngine).

> ![info] As of September 2016 GRMustache is available on macOS only and has not been fully ported to Swift 3.0. Please follow the [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine) community for more information.

You can provide your own Kitura template engine by implementing the `TemplateEngine` protocol from [Kitura-TemplateEngine package](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift).

---

## Adding a template engine to your Kitura app

To use a template engine you need to specify a dependency in `Package.swift` for the engine you want to use. You can specify multiple dependencies if you wish to support more than one template engine (e.g. both Mustache and Stencil). In our example we'll add both templates to demonstrate GRMustache and Stencil integration.

```swift
import PackageDescription

let package = Package(
    name: "myTemplates",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 1, minor: 0),
        .Package(url: "https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine.git", majorVersion: 1, minor: 0),
        .Package(url: "https://github.com/IBM-Swift/Kitura-StencilTemplateEngine.git", majorVersion: 1, minor: 0)
 ])
```

> ![tip] If you generated your Xcode project previously, you have to [regenerate](/{{ page.lang }}/starter/xcode.html) it once you add a new dependency so Xcode will be aware of the added dependency.

---

## Adding your template files to your Kitura app
Template files are text files that follow the syntax of a template engine. Here is an example of a Mustache template, taken from [GRMustache.swift](https://github.com/groue/GRMustache.swift) and a Stencil template, taken from [Stencil](https://github.com/kylef/Stencil/blob/master/README.md).

`document.mustache`:

{% raw %}
```
Hello {{name}}
Your beard trimmer will arrive on {{format(date)}}.
{{#late}}
Well, on {{format(realDate)}} because of a Martian attack.
{{/late}}
```
{% endraw %}

`document.stencil`

{% raw %}
```
There are {{ articles.count }} articles.

{% for article in articles %}
  - {{ article.title }} by {{ article.author }}.
{% endfor %}
```
{% endraw %}

Template files should be placed in a `Views` directory, which should be known to Kitura Router. By default, Kitura Router gets the template files from the `./Views/` directory in the directory where `Kitura` runs. You can change the `Views` directory per [Router](https://github.com/IBM-Swift/Kitura/blob/master/Sources/Kitura/Router.swift) instance by setting the `Router.viewsPath` variable.

```
/myTemplateApp
|
|--/Sources
  |-- main.swift
|--/Views
  |-- document.mustache
  |-- document.stencil
```

---

## Registering a template engine with a Router instance
<span class="arrow">&#8227;</span> You should import the package of the template engine:

```swift
import KituraMustache
import KituraStencil
```

<span class="arrow">&#8227;</span> To use the template engine, you must register it with a Router instance. This is done by calling the  `Router.add(templateEngine:)` function, e.g.:

```swift
let router = Router()
router.add(templateEngine: MustacheTemplateEngine())
router.add(templateEngine: StencilTemplateEngine())
```

---

## Rendering a template
<span class="arrow">&#8227;</span> You can render a template by calling the `response.render(_:context)` function. Here's the the code for the `document.mustache` and `document.stencil` template files we referenced earlier:

```swift
// Handle HTTP GET requests to GRMustache/
router.get("/delivery") { request, response, next in
    defer {
        next()
    }

    // the example from https://github.com/groue/GRMustache.swift/blob/master/README.md
    var context: [String: Any] = [
        "name": "Arthur",
        "date": Date(),
        "realDate": Date().addingTimeInterval(60*60*24*3),
        "late": true
    ]

    // Let template format dates with ``
    let dateFormatter = DateFormatter()
    dateFormatter.dateStyle = .medium
    context["format"] = dateFormatter

    try response.render("document.mustache", context: context).end()
}

//Handle HTTP GET requests to Stencil
router.get("/articles") { request, response, next in
    defer {
        next()
    }

    // the example from https://github.com/kylef/Stencil/blob/master/README.md
    var context2 = [
       "articles": [
         ["title": "Migrating from OCUnit to XCTest", "author": "Kyle Fuller"],
         ["title": "Memory Management with ARC", "author": "Kyle Fuller" ]
       ]
    ]

    try response.render("document.stencil", context: context2).end()
}

// Add an HTTP server and connect it to the router
Kitura.addHTTPServer(onPort: 8090, with: router)

// Start the Kitura runloop (this call never returns)
Kitura.run()
```

<span class="arrow">&#8227;</span> The following response is sent as a result when calling `http://localhost:8090/delivery`:

```
> Hello Arthur
>
Your beard trimmer will arrive on Sep 8, 2016.
>
Well, on Sep 19, 2016 because of a Martian attack.
```

<span class="arrow">&#8227;</span> and when calling `http://localhost:8090/articles`:

```
There are 2 articles.
>
>
  - Migrating from OCUnit to XCTest by Kyle Fuller.
>
  - Memory Management with ARC by Kyle Fuller.
```

> ![tip] Note how the `context` of the template is defined. The first context contains values for Mustache's tags `name`, `date`, `realDate`, `late` and for GRMustache.swift's filter `format`, while the second context (`context2`) contains a dictionary of arrays that define Stencil's tags for `title` and `author`.

---

## Working with multiple template engines
As you can see from our example above you can use templates from multiple template engines in your Kitura app. The Router will know which template engine to use with a particular template file by the extension of the file.

For example, the extension for [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine) is `.mustache` and for [Kitura-StencilTemplateEngine](https://github.com/IBM-Swift/Kitura-StencilTemplateEngine) is `.stencil`.

The file extension of a template engine is defined by `fileExtension` property of the [TemplateEngine protocol](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift)

---

## Setting the default template engine
You can set the default template engine for a Router instance in order to save specifying template file extensions of that template engine.

<span class="arrow">&#8227;</span> For example, after you set GRMustache.swift as the default template engine:

```swift
router.setDefault(templateEngine: MustacheTemplateEngine())
```

<span class="arrow">&#8227;</span> You can render `document.mustache` by specifying the name of the file without extension:

```swift
response.render("document", context: context).
```

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
