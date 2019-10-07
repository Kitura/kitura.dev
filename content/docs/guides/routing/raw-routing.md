---
path: "/docs/routing/raw-routing"
title: Raw Routing
---

#Raw Routing

Raw routing is based on the [Express](https://expressjs.com) framework for Node.js where the route handlers are called with `RouterRequest` and `RouterResponse` objects, which respectively handle the client request and build the response, along with a `next` completion handler.

Raw routing provides great flexibility and control, but requires you to understand the structure of requests, how to interpret HTTP request headers correctly, how to verify data, and to manually carry out things like JSON parsing.

In this guide, we will show you how to set up Raw routes on your server. We will store a Swift object that is sent via a POST request. We will then return that object when a user sends a GET request.

> If you don't have a Kitura server, follow our [Create a server](../getting-started/create-server-cli) guide.

---

##Step 1: Create a file to contain the routes

We are going to create a new file, where we will define the routes for this guide.

Open your `Application.swift` file:

```
open Sources/Application/Application.swift
```

Inside the `postInit()` function add:

```swift
initializeRawRoutes(app: self)
```

Create a new file, called `RawRoutes.swift`:

```
touch Sources/Application/Routes/RawRoutes.swift
```

Open your `RawRoutes.swift` file:

```
open Sources/Application/Routes/RawRoutes.swift
```

Inside this file, add the framework for our routes code:

```swift
func initializeRawRoutes(app: App) {
    // Register routes with handlers here
}
extension App {
    static var bookStore = [Book]()
}
```

This code contains two sections. The first is the `initializeRawRoutes` function. This will be run after the application has been initialized and is where we register routes on our router. The second is the `App` extension. This is where we define a `bookStore` which will store an array of objects. We will use the [Book model from the routing guide](./what-is-routing#bookmodel), however you could use any Codable type.

---

##Step 2: Create a POST route

Inside the `initializeRawRoutes` function add:

```swift
app.router.post("/raw") { request, response, next in
    next()
}
```

What we've done is register a POST on our router that will handle any POST requests made on "/raw".

> If the values `request`, `response` and `next` are unfamiliar to you, learn more about them in our [What is Routing?](./what-is-routing) guide.

The POST route will be used to send information about our books to the server, therefore we need a way of reading this data from the request.

To do this we will use the `read(as:)` method of the `RouterRequest` class, as this method can throw we wrap it in a do-catch block:

```swift
do {
    let book = try request.read(as: Book.self)
} catch {
    let _ = response.send(status: .badRequest)
}
```

We will now save this book to our bookstore and return it to the user with `send()`:

```swift
App.bookStore.append(book)
response.send(book)
```

Your completed POST route should now look as follows:

```swift
app.router.post("/raw") { request, response, next in
    do {
        let book = try request.read(as: Book.self)
        App.bookStore.append(book)
        response.send(book)
    } catch {
        let _ = response.send(status: .badRequest)
    }
    next()
}
```

Now if we start our Kitura server we can use curl to test our route.

In a terminal enter the following:

```
curl -X POST \
      http://localhost:8080/raw \
      -H 'content-type: application/json' \
      -d '{
            "id": 0,
            "title": "A Game of Thrones",
            "price": 14.99,
            "genre": "Fantasy"
          }'
```

We should then see the following printed to the terminal:

```
{"id":0,"title":"A Game of Thrones","price":14.99,"genre":"Fantasy"}
```

That's it! We've implemented a basic POST route.

---

##Step 3: Create a GET route

We register a GET route in a similar way to the POST route.

Inside the `initializeRawRoutes` function add:

```swift
app.router.get("/raw") { request, response, next in
    next()
}
```

In our GET route, we respond with our bookstore.

```swift
response.send(App.bookStore)
```

The completed GET route, should then look as follows:

```swift
app.router.get("/raw") { request, response, next in
    response.send(App.bookStore)
    next()
}
```

Now we need to restart our server, once it is running we can post a book using the curl command from step 2.

Then if we navigate to http://localhost:8080/raw, we should see the book we posted:

```
{
    "id": 0,
    "title": "A Game of Thrones",
    "price": 14.99,
    "genre": "Fantasy"
}
```

That's it! We've now implemented a simple GET route.

---

##Step 4: Create a GET one route

When we register a GET one route, rather than a GET all route, we use an id parameter.

Inside the `initializeRawRoutes` function add:

```swift
app.router.get("/raw/:id") { request, response, next in
    next()
}
```

In this case, the path "/:id" will be for "/123" as well as "/abc". You can then access the id parameter’s value via `request.parameters["id"]`:

```swift
guard let idString = request.parameters["id"],
    let id = Int(idString),
    id >= 0,
    id < App.bookStore.count
else {
    let _ = response.send(status: .badRequest)
    return next()
}
response.send(App.bookStore[id])
```

Your completed GET with `id` route, should then look as follows:

```swift
app.router.get("/raw/:id") { request, response, next in
    guard let idString = request.parameters["id"],
        let id = Int(idString),
        id >= 0,
        id < App.bookStore.count
    else {
        let _ = response.send(status: .badRequest)
        return next()
    }
    response.send(App.bookStore[id])
    next()
}
```

Now we need to restart our server and make a POST request using the curl command from step 2.

Use a browser to navigate to http://localhost:8080/raw/0

This will make a GET request to the server and you should see the first book in JSON format:

```
{
    "id": 0,
    "title": "A Game of Thrones",
    "price": 14.99,
    "genre": "Fantasy"
}
```

In Terminal enter the following to post a second book to the server:

```
curl -X POST \
    http://localhost:8080/raw \
    -H 'content-type: application/json' \
    -d '{
          "id": 1,
          "title": "Harry Potter",
          "price": 10.00,
          "genre": "Fantasy"
       }'
```

Then open the browser at http://localhost:8080/raw/1

This will make a new GET request to the server and you should see the second book in JSON format:

```
{
    "id": 1,
    "title": "Harry Potter",
    "price": 10.00,
    "genre": "Fantasy"
}
```

That's it! We've now also implemented a GET one route.

---

##Step 5: Making bookstore thread safe (Optional)

Kitura route handlers are asynchronous. If multiple route threads access the same object at the same time they will crash. To prevent these collisions, we will serialize access to the `rawStore`.

> If you have completed the [Codable Routing guide](./codable-routing), you will already have the execute function.

Open your `Application.swift` file:

```
open Sources/Application/Application.swift
```

Add `Dispatch` to the import statements:

```swift
import Dispatch
```

Inside the `App` class, add a `DispatchQueue`:

```swift
let workerQueue = DispatchQueue(label: "worker")
```

At the end of the `App` class, add a helper function for atomically executing code:

```swift
func execute(_ block: (() -> Void)) {
    workerQueue.sync {
        block()
    }
}
```

Back in `RawRoutes.swift`, we wrap the code in our handlers with this execute function.

Your completed `RawRouting.swift` should now look as follows:

```swift
func initializeRawRoutes(app: App) {

    app.router.post("/raw") { request, response, next in
        do {
            let book = try request.read(as: Book.self)
            app.execute {
                App.bookStore.append(book)
            }
            response.send(book)
        } catch {
            let _ = response.send(status: .badRequest)
        }
        next()
    }

    app.router.get("/raw") { request, response, next in
        app.execute {
            response.send(App.bookStore)
        }
        next()
    }

    app.router.get("/raw/:id") { request, response, next in
        app.execute {
            guard let idString = request.parameters["id"],
                let id = Int(idString),
                id >= 0,
                id < App.bookStore.count
                else {
                    let _ = response.send(status: .badRequest)
                    return next()
            }
            response.send(App.bookStore[id])
        }
        next()
    }
}
extension App {
    static var bookStore = [Book]()
}
```

We can continue to make POST and GET requests from our bookstore.

However, if the server is restarted, all the data will be lost and we will have an empty array again.

In the Database Guide we will look to resolve this issue and add persistence.

##Next steps

[Databases](../databases/what-are-databases): Learn about databases and the database providers Kitura supports.
