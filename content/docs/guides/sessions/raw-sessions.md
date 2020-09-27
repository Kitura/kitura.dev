---
path: "/docs/sessions/raw-session"
title: Raw Routing Session
---

#Raw Routing Session

HTTP is a stateless connection protocol, that is the server can't distinguish one request from another. Sessions and cookies provide HTTP with state, they allow the server to know who is making a specific request and respond accordingly.

This guide demonstrates how to use the [Kitura-Session](https://github.com/Kitura/Kitura-Session) package to manage user sessions in Kitura with Raw routing. If you are using Codable routing, follow the guide for [Kitura Session with type-safe sessions](./codable-session).

---

##Step 1: Create your session routes

In this guide we are going to create two Kitura routes:

- A GET route, where we retrieve the books from our session.

- A POST route, where we store a book in our session.

We are using [the Book model from the routing guide](/docs/routing/what-is-routing#codable-model) in our routes, however you could use any codable object.

To use Kitura-Session from a server, we need to [add Kitura-Session to our dependencies](https://github.com/Kitura/Kitura-Session#add-dependencies).

> If you don't have a server, follow our [Create a server](../getting-started/create-server-cli) guide.

Once that is complete, open your `Application.swift` file in your default text editor (or Xcode if you prefer):

```
open Sources/Application/Application.swift
```

Inside the `postInit()` function add:

```swift
initializeSessionRawRoutes(app: self)
```

Create a new file called `SessionRawRoutes.swift` to define the session routes in:

```
touch Sources/Application/Routes/SessionRawRoutes.swift
```

Open the `SessionRawRoutes.swift` file:

```
open Sources/Application/Routes/SessionRawRoutes.swift
```

Inside this file we will add the code for our session routes:

```swift
import KituraSession

func initializeSessionRawRoutes(app: App) {
    // Define the Session here

    app.router.get("/session") { request, response, next in
        // Get the books from the session here
        next()
    }

    app.router.post("/session") { request, response, next in
        // Add books to the session here
        next()
    }
}
```

---

##Step 2: Set up a session

We will use a session to persist data between the user's requests. The session will provide the user with a cookie that the user will attach to future requests. That cookie is then linked to a session store, where we keep data we want to be associated with that user's cookie. This allows us to add features such as an online shopping cart, where multiple requests add items to the cart until we are ready to checkout.

When we create our session we can configure it with the following parameters:

- `secret`: A `String` to be used for session encoding. This is your session's password and should be treated as such.

- `cookie`: A list of options for the session's cookies. In this example we will use this to set the cookie's name.

- `store`: A session backing store that implements the `Store` protocol. This determines where session data is persisted. In this example we do not set this, meaning the data is persisted on the server.

> For live applications, you should use a persistent store, such as a database, or [Kitura-Session-Redis](https://github.com/Kitura/Kitura-Session-Redis).

To set up our session, we create a `Session` middleware with our desired parameters.

Inside your `initializeSessionRawRoutes`, add the following code:

```swift
let session = Session(secret: "password", cookie: [CookieParameter.name("Raw-cookie")])
```

Below this line, register the middleware on our router:

```swift
app.router.all(middleware: session)
```

We should now have access to our session using `request.session`.

Add the following `guard` statement to both route handlers to ensure that this is the case:

```swift
guard let session = request.session else {
    return try response.status(.internalServerError).end()
}
```

Our `SessionRawRoutes.swift` file should now look as follows:

```swift
import KituraSession

func initializeSessionRawRoutes(app: App) {
    let session = Session(secret: "password", cookie: [CookieParameter.name("Raw-cookie")])
    app.router.all(middleware: session)

    app.router.get("/session") { request, response, next in
        guard let session = request.session else {
            return try response.status(.internalServerError).end()
        }
        // Get the books from the session here
        next()
    }

    app.router.post("/session") { request, response, next in
        guard let session = request.session else {
            return try response.status(.internalServerError).end()
        }
        // Add books to the session here
        next()
    }
}
```

---

##Step 3: Add the session GET route

Now we have access to our session, we can use it to persist data.

We are going to be persisting the `Book` model, but you can use any `Codable` Swift type.

The session is stored as a `[String: Any]` dictionary, however by declaring the expected type, we can directly decode our model from the session.

In our case, we decode an array of books by adding the following code to our GET handler:

```swift
let books: [Book] = session["books"] ?? []
```

This will get all the books stored for the "books" key in our model. If there are no books it returns an empty array.

Once we have our books, we send them to the user in the response:

```swift
response.send(books)
```

Our completed GET route should now look as follows:

```swift
app.router.get("/session") { request, response, next in
    guard let session = request.session else {
        return try response.status(.internalServerError).end()
    }
    let books: [Book] = session["books"] ?? []
    response.send(books)
    next()
}
```

---

##Step 4: Add the session POST route

Now we need some books to retrieve. We will do this by adding a book that has been posted into our route.

The first thing we need to do is decode the book.

We do this by adding the following code to our POST handler:

```swift
let inputBook = try request.read(as: Book.self)
```

Next we need to get the books that are currently in the session:

```swift
var books: [Book] = session["books"] ?? []
```

Now we append our new book to the existing books and store it in the session for the "books" key:

```swift
books.append(inputBook)
session["books"] = books
```

Finally we respond with the book which we added to the session, to represent a successful request.

```swift
response.status(.created)
response.send(inputBook)
```

Our completed POST route should now look as follows:

```swift
app.router.post("/session") { request, response, next in
    guard let session = request.session else {
        return try response.status(.internalServerError).end()
    }
    let inputBook = try request.read(as: Book.self)
    var books: [Book] = session["books"] ?? []
    books.append(inputBook)
    session["books"] = books
    response.status(.created)
    response.send(inputBook)
    next()
}
```

---

##Step 5: Test our Session

We have now completed the code for our session. This will allow us to add books to our cart and persist them between requests.

Our completed `SessionRawRoutes.swift` file should now look as follows:

```swift
import KituraSession

func initializeSessionRawRoutes(app: App) {
    let session = Session(secret: "password", cookie: [CookieParameter.name("Raw-cookie")])
    app.router.all(middleware: session)

    app.router.get("/session") { request, response, next in
        guard let session = request.session else {
            return try response.status(.internalServerError).end()
        }
        let books: [Book] = session["books"] ?? []
        response.send(books)
        next()
    }

    app.router.post("/session") { request, response, next in
        guard let session = request.session else {
            return try response.status(.internalServerError).end()
        }
        let inputBook = try request.read(as: Book.self)
        var books: [Book] = session["books"] ?? []
        books.append(inputBook)
        session["books"] = books
        response.status(.created)
        response.send(inputBook)
        next()
    }
}
```

To test our POST route, we will send a request using curl, with cookies enabled.

Open Terminal and enter the following:

```
curl -X POST \
http://localhost:8080/session \
-b cookies.txt -c cookies.txt \
-H 'content-type: application/json' \
-d '{
    "id": 1,
    "title": "War and Peace",
    "price": 10.99,
    "genre": "Historical drama"
}'
```

If our request was successful, our book will be returned to us:

```
{"id":1,"title":"War and Peace","price":10.99,"genre":"Historical drama"}
```

We will also have a cookie that curl has stored in the `cookies.txt` file.

To retrieve our book, we make another curl request to our server:

```
curl -X GET \
http://localhost:8080/session \
-b cookies.txt -c cookies.txt
```

If the request is successful, it will return the book we just sent to the server.

```
[{"id":1,"title":"War and Peace","price":10.99,"genre":"Historical drama"}]
```

The cookie we sent with our request has identifed our session, so that our saved book can be returned.

Each user making requests to these routes will create their own basket of books.

We can demonstrate this by deleting our cookie:

```
rm cookies.txt
```

Followed by making a new GET request:

```
curl -X GET \
http://localhost:8080/session \
-b cookies.txt -c cookies.txt
```

This represents a user without a session so we are returned an empty array:

```
[]
```
---

##Next steps

[Authentication](../authentication/what-is-authentication): Learn about authentication and what Kitura provides.
