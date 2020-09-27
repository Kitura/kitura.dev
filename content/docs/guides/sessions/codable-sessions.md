---
path: "/docs/sessions/codable-session"
title: Codable Routing Session
---

#Codable Routing Session

HTTP is a stateless connection protocol, that is the server can't distinguish one request from another. Sessions and cookies provide HTTP with state, they allow the server to know who is making a specific request and respond accordingly.

This guide uses [Kitura-Session](https://github.com/Kitura/Kitura-Session) with Codable routing leveraging type-safe sessions. If you want to use sessions with raw routing, check out the [Kitura Session with raw routing guide](./raw-session).

---

##Step 1: Create your session routes

In this guide we are going to create two Kitura routes:

- A GET route, where we retrieve the books from our session.

- A POST route, where we store a book in our session.

We are using [the Book model from the routing guide](/docs/routing/what-is-routing#codable-model) in our routes, however you could use any codable object.

To use Kitura-Session from a server, we need to [add Kitura-Session to our dependencies](https://github.com/Kitura/Kitura-Session#add-dependencies).

> If you don't have a server, follow our [Create a server](../getting-started/create-server-cli) guide.

Once that is complete, open your `Application.swift` file in your default text editor (or Xcode if you prefer):

Open your `Application.swift` file:

```
open Sources/Application/Application.swift
```

Inside the `postInit()` function add:

```swift
initializeTypeSafeSessionRoutes(app: self)
```

Create a new file, called `TypeSafeSessionRoutes.swift`:

```
touch Sources/Application/Routes/TypeSafeSessionRoutes.swift
```

Open your `TypeSafeSessionRoutes.swift` file:

```
open Sources/Application/Routes/TypeSafeSessionRoutes.swift
```

Inside this file, add the framework for our routes code:

```swift
import KituraContracts
import KituraSession

func initializeTypeSafeSessionRoutes(app: App) {
    app.router.post("/cart", handler: app.postSessionHandler)
    app.router.get("/cart", handler: app.getSessionHandler)
}
extension App {
    // Define handlers here
}
```

We will add our `postSessionHandler` and `getSessionHandler` later in this guide.

---

##Step 2: Define your Session

To use sessions with Codable routes, we need to model the structure of what we will store in the session. We do this by defining a Swift type that conforms to the `TypeSafeSession` protocol.

If you don't already have one, create a `Middlewares` folder:

```
mkdir Sources/Application/Middlewares
```

Create a new file, called `CheckoutSession.swift`:

```
touch Sources/Application/Middlewares/CheckoutSession.swift
```

Open your `CheckoutSession.swift` file:

```
open Sources/Application/Middlewares/CheckoutSession.swift
```

We can use either a class or a struct for `TypeSafeMiddleware` here but we will use a Class.

Inside this file, define your `CheckoutSession` class:

```swift
import KituraSession

final class CheckoutSession: TypeSafeSession {

    let sessionId: String                       // Requirement: every session must have an ID
    var books: [Book]                           // User-defined type, where Book conforms to Codable

    init(sessionId: String) {                   // Requirement: must be able to create a new (empty)
        self.sessionId = sessionId              // session containing just an ID. Assign a default or
        books = []                              // empty value for any non-optional properties.
    }
}
// Defines the configuration of the user's type: how the cookie is constructed and how
// the session is persisted.
extension CheckoutSession {
    static let sessionCookie: SessionCookie = SessionCookie(name: "MySession", secret: "Top Secret")
    static var store: Store?
}
```

> When using a class you need to declare it as final.

The minimum requirements for a type-safe session are:

- sessionID: An identifier that is unique to the session
- Initilizer: Used to create a new session from a sessionId
- sessionCookie: Defines the name of the cookie and the secret data used to encrypt it
- An optional store: Defines how sessions should be persisted

With our class, we have created a session that will store an array of books, via a cookie called "MySession" and using "Top Secret" as the password to encrypt that cookie. Since we didn't specify a store a default in memory store is used.

> For an example of a persistent store for sessions see [Kitura-Session-Redis](https://github.com/Kitura/Kitura-Session-Redis)

---

##Step 3: Add session POST route

Inside the app extension in `TypeSafeSessionRoutes.swift`, we add our `postSessionHandler`:

```swift
func postSessionHandler(session: CheckoutSession, book: Book, completion: (Book?, RequestError?) -> Void) {

}
```

We have registered our TypeSafeSession on our handler by adding it to the signature.

When the handler is called the middleware is run and our session is created.

Within `postSessionHandler`, we can then interact with our session:

```swift
session.books.append(book)
session.save()
completion(book, nil)
```

What we're doing here is storing the posted Book into the session.

We use the `append` method as we know `books` is an Array as we defined it as an Array in the CheckoutSession class.

Then we need to save the session.

Now we can add a route for retrieving the data.

---

##Step 4: Add session GET route

Below our `postSessionHandler` handler add:

```swift
func getSessionHandler(session: CheckoutSession, completion: ([Book]?, RequestError?) -> Void) -> Void {
    completion(session.books, nil)
}
```

Add that's it! We've now enabled a Kitura Session on our server.

Your completed TypeSafeSessionRoutes.swift should now look as follows:

```swift
import KituraContracts
import KituraSession

func initializeTypeSafeSessionRoutes(app: App) {
    app.router.post("/cart", handler: app.postSessionHandler)
    app.router.get("/cart", handler: app.getSessionHandler)
}
extension App {
    func postSessionHandler(session: CheckoutSession, book: Book, completion: (Book?, RequestError?) -> Void) {
        session.books.append(book)
        session.save()
        completion(book, nil)
    }
    func getSessionHandler(session: CheckoutSession, completion: ([Book]?, RequestError?) -> Void) -> Void {
        completion(session.books, nil)
    }
}
```

---

##Step 5: Test our Session

An easy way to test our our session is using [Kitura OpenAPI](https://github.com/Kitura/Kitura-OpenAPI). You can follow our [Kitura OpenAPI Guide](../routing/kitura-openapi) to learn how to set up OpenAPI and use the interface for testing.

Alternatively, we can test our routes by sending a request using curl, with cookies enabled.

Open Terminal and enter the following:

```
curl -X POST \
http://localhost:8080/cart \
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
http://localhost:8080/cart \
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
http://localhost:8080/cart \
-b cookies.txt -c cookies.txt
```

This represents a user without a session so we are returned an empty array:

```
[]
```

##Next steps

[Authentication](../authentication/what-is-authentication): Learn about authentication and what Kitura provides.
