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

A [template engine](https://en.wikipedia.org/wiki/Template_processor) allows _rendering_ of documents using static templates, by substituting template variables with actual values at runtime. This page explains how you can use template engines integrated with Kitura in your Kitura apps.

# Supported template engines
Currently, [Mustache](https://mustache.github.io) and [Stencil](https://github.com/kylef/Stencil) template engines are integrated with Kitura. However, Mustache is only supported on macOS and Stencil is only supported with snapshot `DEVELOPMENT-SNAPSHOT-2016-05-03-a`.

# Kitura template engines
Kitura template engines are classes that implement _TemplateEngine_ protocol from [Kitura-TemplateEngine package](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift). Currently, two Kitura template engines exist:

1. [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine), supported on OS X only.
2. [Kitura-StencilTemplateEngine](https://github.com/IBM-Swift/Kitura-StencilTemplateEngine), supported with snapshot `DEVELOPMENT-SNAPSHOT-2016-05-03-a` only.

You can provide your own Kitura template engine by implementing _TemplateEngine_ protocol from [Kitura-TemplateEngine package](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift).
 
# Add a template engine to your Kitura app 
Kitura is a modular framework &mdash; it means that by default you get only basic HTTP functionality, like routing, handling parameters, parsing request body, etc. Apart from the basics, you only get the functionality you need by specifying additional packages in your `Package.swift`. So to use a template engine, you have to specify dependencies on the template engine(s) you want to use in your `Package.swift`, e.g:
```swift
.Package(url: "https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine.git", majorVersion: 0, minor: 28)
```

>Tip: If you generated your Xcode project previously, you have to regenerate it once you add a new dependency so Xcode will be aware of the added dependency.

# Add your template files to your Kitura app
Template files are text files that follow the syntax of a template engine. Here is an example of a Mustache template, taken from [GRMustache.swift](https://github.com/groue/GRMustache.swift).

`document.mustache`:

```
Hello {{name}}
Your beard trimmer will arrive on {{format(date)}}.
{{#late}}
Well, on {{format(realDate)}} because of a Martian attack.
{{/late}}
```

[GRMustache.swift](https://github.com/groue/GRMustache.swift) uses [an extended Mustache syntax](https://github.com/groue/GRMustache.swift#features), in particular _Filters_ as `format` filter in the example above.

You should put your template files in a _views directory_ which should be known to _Kitura Router_. By default, _Kitura Router_ gets the template files from `Views` directory in the directory where `Kitura` runs. You can change the _views directory_ per [Router](https://github.com/IBM-Swift/Kitura/blob/master/Sources/Kitura/Router.swift) instance by setting `Router.viewsPath` variable.

# Register a template engine with a Router instance
To use a template engine, you must register it with a Router instance. You do it by calling `Router.add(templateEngine:)` function, e.g.:

```swift
router.add(templateEngine: MustacheTemplateEngine())
```

You should import the package of the template engine:
```swift
import KituraMustache
```

# Render a template
You can render a template by calling `RouterResponse.render(_:context)` function. Example code for the template above:

```swift
router.get("/trimmer") { _, response, next in
    defer {
        next()
    }
    // the example from https://github.com/groue/GRMustache.swift/blob/master/README.md
    var context: [String: Any] = [
        "name": "Arthur",
        "date": NSDate(),
        "realDate": NSDate().addingTimeInterval(60*60*24*3),
        "late": true
    ]

    // Let template format dates with `{{format(...)}}`
    let dateFormatter = DateFormatter()
    dateFormatter.dateStyle = .medium
    context["format"] = dateFormatter

    try response.render("document", context: context).end()
}
```

The following response is sent as a result:
> Hello Arthur
> 
Your beard trimmer will arrive on Sep 8, 2016.
>
Well, on Sep 11, 2016 because of a Martian attack.

Note how the `context` of the template is defined. The context contains values for [Mustache](https://mustache.github.io) _tags_ `name`, `date`, `realDate`, `late` and for [GRMustache.swift](https://github.com/groue/GRMustache.swift) _filter_ `format`.

# Work with multiple template engines
You can use templates from multiple template engines in your Kitura app. Kitura Router will know which template engine to use with a particular template file by the extension of the file. E.g., the extension for [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine) is `.mustache` and for [Kitura-StencilTemplateEngine](https://github.com/IBM-Swift/Kitura-StencilTemplateEngine) is `.stencil`. (The extension of a template engine is defined by `fileExtension` property of [TemplateEngine protocol](https://github.com/IBM-Swift/Kitura-TemplateEngine/blob/master/Sources/KituraTemplateEngine/TemplateEngine.swift))

# Set the default template engine
You can set the default template engine for a Router instance in order to save specifying template file extensions of that template engine.

For example, after you set [GRMustache.swift](https://github.com/groue/GRMustache.swift) as the default template engine:
```swift
router.setDefault(templateEngine: MustacheTemplateEngine())
```

You can render `document.mustache` by specifying the name of the file without extension:
```swift
response.render("document", context: context).
```
