---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Templating
menu: resources
lang: en
redirect_from: "/resources/tutorial-todo.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

Kitura is a lightweight, modular framework &mdash; this means that by default you get only basic HTTP functionality, like routing, parameter handling, parsing request body, etc. You can augment Kitura's out-of-the-box functionality by adding additional packages to your `Package.swift` file. 

A [template engine](https://en.wikipedia.org/wiki/Template_processor) allows _rendering_ of documents using static templates by substituting template variables with actual values at runtime. This page explains how you can use template engines integrated with Kitura in your Kitura apps.

# Kitura template engines
Kitura template engines are classes that implement the _TemplateEngine_ protocol from the [Kitura-TemplateEngine package](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift). Currently, two Kitura template engines are supported:

1. [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine)
2. [Kitura-StencilTemplateEngine](https://github.com/IBM-Swift/Kitura-StencilTemplateEngine).

##### Note! As of September 2016 GRMustache is available on macOS only and has not been fully ported to Swift 3.0. Please follow the [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine) community for more information.

You can provide your own Kitura template engine by implementing the _TemplateEngine_ protocol from [Kitura-TemplateEngine package](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift).

 
# Adding a template engine to your Kitura app 
To use a template engine you need to specify a dependency in `Package.swift` for the engine you want to use. You can specify multiple dependencies if you wish to support more than one template engine (e.g. both Mustache and Stencil).

```swift
.Package(url: "https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine.git", majorVersion: 1, minor: 0)
```

>Tip: If you generated your Xcode project previously, you have to regenerate it once you add a new dependency so Xcode will be aware of the added dependency.


# Adding your template files to your Kitura app
Template files are text files that follow the syntax of a template engine. Here is an example of a Mustache template, taken from [GRMustache.swift](https://github.com/groue/GRMustache.swift).

`document.mustache`:

```
Hello {{name}}
Your beard trimmer will arrive on {{format(date)}}.
{{#late}}
Well, on {{format(realDate)}} because of a Martian attack.
{{/late}}
```

Template files should be placed in a _Views directory_ which should be known to _Kitura Router_. By default, _Kitura Router_ gets the template files from the `./Views/` directory in the directory where `Kitura` runs. You can change the _Views directory_ per [Router](https://github.com/IBM-Swift/Kitura/blob/master/Sources/Kitura/Router.swift) instance by setting `Router.viewsPath` variable.

```
/myTemplateApp
|
|--/Sources
  |-- main.swift
|--/Views
  |-- document.mustache
```

# Registering a template engine with a Router instance
You should import the package of the template engine:

```swift
import KituraMustache
```

To use the template engine, you must register it with a Router instance. This is done by calling the  `Router.add(templateEngine:)` function, e.g.:

```swift
let router = Router()
router.add(templateEngine: MustacheTemplateEngine())
```

# Rendering a template
You can render a template by calling the `response.render(_:context)` function. Example code for the `document.mustache` template shown above:

```swift
router.get("/trimmer") { _, response, next in
    defer {
        next()
    }
    // example from https://github.com/groue/GRMustache.swift/blob/master/README.md
    var context: [String: Any] = [
        "name": "Arthur",
        "date": Date(),
        "realDate": Date().addingTimeInterval(60*60*24*3),
        "late": true
    ]

    // Let template format dates with `{{format(...)}}`
    let dateFormatter = DateFormatter()
    dateFormatter.dateStyle = .medium
    context["format"] = dateFormatter

    try response.render("document.mustache", context: context).end()
}
```

The following response is sent as a result:

```
> Hello Arthur
> 
Your beard trimmer will arrive on Sep 8, 2016.
>
Well, on Sep 19, 2016 because of a Martian attack.
```

Note how the `context` of the template is defined. The context contains values for [Mustache](https://mustache.github.io) _tags_ `name`, `date`, `realDate`, `late` and for [GRMustache.swift](https://github.com/groue/GRMustache.swift) _filter_ `format`.


# Working with multiple template engines
You can use templates from multiple template engines in your Kitura app. Kitura Router will know which template engine to use with a particular template file by the extension of the file. E.g., the extension for [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine) is `.mustache` and for [Kitura-StencilTemplateEngine](https://github.com/IBM-Swift/Kitura-StencilTemplateEngine) is `.stencil`. (The extension of a template engine is defined by `fileExtension` property of [TemplateEngine protocol](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift))


# Setting the default template engine
You can set the default template engine for a Router instance in order to save specifying template file extensions of that template engine.

For example, after you set [GRMustache.swift](https://github.com/groue/GRMustache.swift) as the default template engine:

```swift
router.setDefault(templateEngine: MustacheTemplateEngine())
```

You can render `document.mustache` by specifying the name of the file without extension:

```swift
response.render("document", context: context).
```
