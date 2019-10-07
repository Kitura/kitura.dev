---
path: "/docs/routing/codable-routing"
title: Codable Routing
---

#Codable Routing

Codable routing is where the router handlers are just normal functions you might define elsewhere in your code; they take struct or class types as parameters, and respond with struct or class types via a completion handler. The only requirement is that those types conform to the Codable protocol introduced in Swift 4 (hence the name).

In this guide, we will show you how to set up Codable routes on your server. We will store a Swift object that is sent via a POST request. We will then return that object when a user sends a GET request.

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
initializeCodableRoutes(app: self)
```

Create a new file, called `CodableRoutes.swift`:

```
touch Sources/Application/Routes/CodableRoutes.swift
```

Open your `CodableRoutes.swift` file:

```
open Sources/Application/Routes/CodableRoutes.swift
```

Inside this file, add the framework for our routes code:

```swift
import KituraContracts

func initializeCodableRoutes(app: App) {
    // Register routes here
}
extension App {
    static var codableStore = [Book]()
    // Write handlers here
}
```

This code contains two sections. The first is the `initializeCodableRoutes` function. This will be run after the application has been initialized and is where we register routes on our router. The second is the `App` extension. This is where we write the logic to handle requests.

We also have a `codableStore` where we will store an array of objects. We will use the [Book model from the routing guide](./what-is-routing#bookmodel), however you could use any Codable type.

Finally, we have imported the KituraContracts library, which is pulled in with Kitura, as it contains the shared type definition for `RequestError` which we will use in the next step.

---

##Step 2: Create a POST Codable Route

We will now create a POST route that will recieve a Codable type and store it in our `codableStore`.

Inside the `initializeCodableRoutes` function add:

```swift
app.router.post("/codable", handler: app.postHandler)
```

This code will register a POST endpoint on our router that will handle any POST requests made to "/codable".

This will not compile as we haven't actually implemented the `postHandler` yet, so let's go ahead and do that.

The `postHandler` is a block of code, called a closure, that is executed when a POST request is made to "/codable".

Inside the `App` extension add:

```swift
func postHandler(book: Book, completion: (Book?, RequestError?) -> Void) {
    App.codableStore.append(book)
    completion(book, nil)
}
```

Here the postHandler accepts an object of type `Book` and responds using an asynchronous completion handler. The handler then stores the received book in the `codableStore` and returns the book in the completion to indicate success.

> The input parameter and the response parameter in the completion handler can be any Swift type, as long as it conforms to Codable.

We can now successfully compile the project!

---

##Step 3: Test the POST route

With the project now compiling we can start the server.

> Kitura has support for OpenAPI which makes testing Codable routes easy and provides a UI for testing. You can add OpenAPI to your server using our [OpenAPI guide](./kitura-openapi).

To test the route using curl, open Terminal and enter the following:

```
curl -X POST \
  http://localhost:8080/codable \
  -H 'content-type: application/json' \
  -d '{
    "id": 0,
    "title": "A Game of Thrones",
    "price": 14.99,
    "genre": "Fantasy"
  }'
```

If the Codable route was created correctly we should see the following:

```
{"id": 0,"title":"A Game of Thrones","price":14.99,"genre":"Fantasy"}
```

We have just successfully posted a book to the server and had it returned.

---

##Step 4: Create a GET ALL Codable Route

We register a GET route in a similar way to the POST route.

Inside the `initializeCodableRoutes` function add:

```swift
app.router.get("/codable", handler: app.getAllHandler)
```

Just like before we now need to define the handler.

Inside the `App` extension add:

```swift
func getAllHandler(completion: ([Book]?, RequestError?) -> Void) {
    completion(App.codableStore, nil)
}
```

You may have noticed that the completion here is expecting an array of books, this is because our route does not provide an identifier, so we retrieve all of the books.

Now we can restart our server to test our new endpoint.

Once the server is running, post a book using the curl command in Step 3.

Open a browser at:

[localhost:8080/codable](localhost:8080/codable)

This will make a GET request to the server and we should see the book we posted:

```
[{
  "id": 0,
  "title": "A Game of Thrones",
  "price": 14.99,
  "genre": "Fantasy"
}]
```

---

##Step 5: Create a GET ONE Codable Route

Now we will create another GET route. This time we will register a handler for GET requests on "/codable/<id>" which will allow an identifier, <id> to be sent from the client which will identify the book to return information for.

Inside the `initializeCodableRoutes` function add:

```swift
app.router.get("/codable", handler: app.getOneHandler)
```

Just like before we now need to define the handler.

Inside the `App` extension add:

```swift
func getOneHandler(id: Int, completion: (Book?, RequestError?) -> Void) {
    guard id < App.codableStore.count, id >= 0 else {
        return completion(nil, .notFound)
    }
    completion(App.codableStore[id], nil)
}
```

In the handler, we are provided with an identifier `id`. This is the value following our route and can be either an `Int` or a `String`, in our example we use `Int`, as our model contains an identifier of type Int. We then use this identifier to return a single `Book`.

Now we can restart our server to test our new endpoint.

Once the server is running, open the browser at:

[localhost:8080/codable/0](localhost:8080/codable/0)

This will make a GET request to the server and we should see the first book in JSON format:

```
{
  "id": 0,
  "title": "A Game of Thrones",
  "price": 14.99,
  "genre": "Fantasy"
}
```

Now we will POST a second book to the server:

```
curl -X POST \
http://localhost:8080/codable \
-H 'content-type: application/json' \
-d '{
  "id": 0,
  "title": "Harry Potter",
  "price": 10.00,
  "genre": "Fantasy"
}'
```

Then open the browser at:

[localhost:8080/codable/1](localhost:8080/codable/1)

This will make a new GET request to the server and we should see the second book in JSON format:

```
{"id": 1,"title":"Harry Potter","price":10.00,"genre":"Fantasy"}
```

---

##Step 6: Adding thread safety (Optional)

Kitura route handlers are asynchronous. If threads from different routes try to change the same object at the same time they will crash. To prevent these collisions in our example, we can serialize access to the `codableStore`.

> If you have completed the [Raw Routing guide](./raw-routing), you will already have the execute function.

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

Back in `CodableRoutes.swift`, we wrap the code in our handlers with this execute function.

Your completed `CodableRouting.swift` should now look as follows:

```swift
import KituraContracts

func initializeCodableRoutes(app: App) {
    app.router.post("/codable", handler: app.postHandler)
    app.router.get("/codable", handler: app.getAllHandler)
    app.router.get("/codable", handler: app.getOneHandler)
}
extension App {
    static var codableStore = [Book]()

    func postHandler(book: Book, completion: (Book?, RequestError?) -> Void) {
        execute {
            App.codableStore.append(book)
        }
        completion(book, nil)
    }

    func getAllHandler(completion: ([Book]?, RequestError?) -> Void) {
        execute {
            completion(App.codableStore, nil)
        }
    }
    func getOneHandler(id: Int, completion: (Book?, RequestError?) -> Void) {
        execute {
            guard id < App.codableStore.count, id >= 0 else {
                return completion(nil, .notFound)
            }
            completion(App.codableStore[id], nil)
        }
    }
}
```

We can continue to make POST and GET requests from our bookstore.

However, if the server is restarted, all the data will be lost and we will have an empty array again.

In the Database Guide we will look to resolve this issue and add persistence.

## Next steps

[Add Kitura OpenAPI](./kitura-openapi): Provides a UI for viewing information about Codable routes.
