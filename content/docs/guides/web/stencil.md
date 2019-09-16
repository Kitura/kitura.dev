---
path: "/docs/web/stencil"
title: Kitura Stencil
---

#Kitura Stencil

To implement Stencil templating with a Kitura server, we use Kitura-StencilTemplateEngine. This package makes it easy to to create an HTML page with integrated Swift variables.

---

##Step 1: Create your Stencil routes

To use Stencil from a server, we first need to add Kitura-StencilTemplateEngine to our dependencies.

> If you don't have a server, follow our Create a server guide.

Next, we need to import the Stencil package:

```swift
import Stencil
```

Next, we need a file for our Stencil routes.

Open your Application.swift file:

```
open Sources/Application/Application.swift
```

Inside the postInit() function add:

```swift
initializeStencilRoutes(app: self)
```

Create a new file, called StencilRoutes.swift:

```
touch Sources/Application/Routes/StencilRoutes.swift
```

Open your StencilRoutes.swift file:

```
open Sources/Application/Routes/StencilRoutes.swift
```

Inside this file, add the framework for our routes code:

```swift
import KituraStencil

func initializeStencilRoutes(app: App) {
    // register template engine here
    app.router.get("/stencil") { request, response, next in
        // render response here
        next()
    }
}
```

---

##Step 2: Add a Stencil template engine

Next we'll register a Stencil temple engine to our router instance.

Open your Application.swift file:

```
open Sources/Application/Application.swift
```

Inside the postInit() function, below the line where we define the router, add:

```swift
app.router.add(templateEngine: StencilTemplateEngine())
```

The above line of code tells the server that on this instance of the router we'd like to use the Stencil template engine.

> Kitura supports multiple template engines being registered to a single instance of a router. By default each templating engine will handle files in the ./Views directory that match the file extension it supports.

We've just added the Stencil template engine to our router, so now we can use it in a route.

Inside our get route, add the following:

```swift
let book = Book(id: 0, title: "A Game of Thrones", price: 14.99, genre: "fantasy")
try response.render("book.stencil", with: book)
```

Your completed StencilRoutes.swift should now look as follows:

```swift
import KituraStencil

func initializeStencilRoutes(app: App) {
    app.router.add(templateEngine: StencilTemplateEngine())
    app.router.get("/stencil") { request, response, next in
        let book = Book(id: 0, title: "A Game of Thrones", price: 14.99, genre: "fantasy")
        try response.render("book.stencil", with: book)
        next()
    }
}
```

The response.render() method attempts to populate the provided template file with the provided data.

In our case, the file book.stencil template will be populated with the book data and then rendered in the browser on "/book".

This obviously will not work as we haven't created our book.stencil file.

---

##Step 3: Create the template file

By default Kitura looks for template files in a ./Views directory found at the root of the project.

> Typically the root of your project is where the .xcodeproj directory is.

Once we are in the root of our project we can create the directory:

```
mkdir Views
```

Then we need to create our template file within the Views directory.

In a terminal run the following:

```
cd Views && touch book.stencil
```

Now we have everything we need to start creating our templates.

The last thing we need to do is recreate our Xcode project:

```
swift package generate-xcodeproj
```

This is to enable Xcode to pick up the new directory we've just added.

---

##Step 4: Populate the Stencil template file

> Stencil is a templating language that has a lot of powerful features, you can learn about them in the Stencil guide.

We first need some template code to populate.

Open the book.stencil file and add the following:

```html
<html>
  <p> Id: {{ id }} </p>
  <p> Title: {{ title }} </p>
  <p> Price: {{ price }} </p>
  <p> Genre: {{ genre }} </p>
</html>
```

Now to test our templating, we first need to start the Kitura server.

Then in a browser open: http://localhost:8080/stencil

In the browser we should see:

```
Id: 0

Title: A Game of Thrones

Price: 14.99

Genre: "fantasy"
```

That's it! We've just rendered a simple data type in the browser using Kitura Stencil.

