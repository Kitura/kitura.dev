---
path: "/docs/web/markdown"
title: Kitura Markdown
---

#Kitura Markdown

In this guide, we will show you how to serve a web page generated from [Markdown templates](http://stencil.fuller.li/en/latest/) (.md files) using [Kitura-Markdown](https://github.com/Kitura/Kitura-Markdown).

---

##Step 1: Add KituraMarkdown to Project

To use Markdown from a server, we first need to [add Kitura-Markdown to our dependencies](https://github.com/Kitura/Kitura-Markdown#add-dependencies).

> If you don't have a server, follow our [Create a server](../getting-started/create-server-cli) guide.

Next, we need to import the KituraMarkdown package.

Open your `Application.swift` file:

```
open Sources/Application/Application.swift
```

Then at the top of the file add the import statement for KituraMarkdown:

```swift
import KituraMarkdown
```

Now we can register the KituraMarkdown Template Engine to our router instance.

Inside the `postInit()` function add:

```swift
router.add(templateEngine: KituraMarkdown())
```

> Kitura supports multiple template engines being registered to a single instance of a router. By default each templating engine will handle files in the `./Views` directory that match the file extension it supports.

---

##Step 2: Configure KituraMarkdown

We may wish to provide a custom configuration for these properties, for example, to configure the contents of the `<head>` tag.

To provide this configuration we can provide a HTML wrapper template for our rendered Markdown using MarkdownOptions.

Inside the `postInit()` function add:

```swift
let markdownOptions = MarkdownOptions(pageTemplate: "default")
```

> We have selected the default template which provides the following HTML wrapper:
> ```html
> <!DOCTYPE html>
>    <html lang=\"en\">
>      <head>
>        <meta charset=\"UTF-8\">
>      </head>
>      <body>
>        <div>
>          <snippetInsertLocation></snippetInsertLocation>
>        </div>
>      </body>
>    </html>
> ```
> Alternatively you can provide your own template using MarkdownOptions:
> ```html
> let markdownOptions = MarkdownOptions(pageTemplate: """
>  <!DOCTYPE html>
>  <html lang=\"en\">
>      <head>
>          <meta charset=\"UTF-8\">
>      </head>
>      <body>
>          <div>
>              <h1>My Page Title</h1>
>          </div>
>          <div>
>              <snippetInsertLocation></snippetInsertLocation>
>          </div>
>      </body>
>  </html>
>  """)
> ```       

During the rendering of the Markdown file, our rendered Markdown content replaces the `<snippetInsertLocation></snippetInsertLocation>` tag.

---

##Step 3: Create the template file

By default, Kitura looks for template files in a `./Views` directory found at the root of the project.

> Typically the root of your project is where the `.xcodeproj` directory is.

Once we are in the root of our project we can create the directory:

```
mkdir Views
```

Then we need to create our template file within the Views directory:

```
cd Views && touch book.md
```

Now we have everything we need to start creating our templates.

> If you are using Xcode and used the command line to create your Views directory you will need to regenerate your Xcode project:
> ```
> swift package generate-xcodeproj
> ```
> This is to enable Xcode to detect the new directory.

Now we can add some Markdown to render:

So in the `book.md` file add:

```
# Books Header

Description with **bold** text

* Book1
* Book2
```

---

##Step 4: Render the Markdown

We've added the KituraMarkdown template engine to our router, so now we can use it in a route.

Just below our other registered routes we can create a new route for KituraMarkdown:

```swift
router.get("/book") { request, response, next in
    try response.render("book.md", context: [:], options: markdownOptions))
}
```

> You will notice a `context` parameter is required, however as Markdown files provide all the context this value is ignored, so we simply pass in an empty context.

The `response.render()` method attempts to populate the template file with the provided data.

So in our case KituraMarkdown will take the `book.md` file and render the Markdown in it to be viewed in a browser.

Now to test our templating we first need to start the Kitura server.

Then in a brower we can open:

<a href="http://localhost:8080/book" target="blank">localhost:8080/book</a>

In the browser we should see:

# Books Header

Description with **bold** text

* Book1
* Book2

That's it! We've successfully rendered some Markdown into a browser using KituraMarkdown.
