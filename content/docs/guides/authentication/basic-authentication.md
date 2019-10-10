---
path: "/docs/authentication/basic-authentication"
title: HTTP Basic Authentication with Codable routes
---

#HTTP Basic Authentication with Codable routes

Authentication is the process of confirming a user’s identity, usually via a username and password. Authentication ensures that the user is allowed access to the secured system.

In this guide, we use [Kitura-CredentialsHTTP](https://github.com/IBM-Swift/Kitura-CredentialsHTTP) to add HTTP basic authentication to Codable routes.

---

##Step 1: Define the authentication middleware

To add basic authentication to our server, we need to [add Kitura-CredentialsHTTP to our dependencies](https://github.com/IBM-Swift/Kitura-CredentialsHTTP#add-dependencies).

> If you don't have a server, follow our [Create a server](../getting-started/create-server-cli) guide.

Next, we will define a `TypeSafeMiddleware` which conforms to `TypeSafeHTTPBasic`.

This will be initialized when our route is successfully authenticated and we will be able to access the authenticated user's id within our Codable route.

If you don't already have one, create a `Middlewares` folder:

```
mkdir Sources/Application/Middlewares
```

Create a new file, called `MyBasicAuth.swift`:

```
touch Sources/Application/Middlewares/MyBasicAuth.swift
```

Open your `MyBasicAuth.swift` file:

```
open Sources/Application/Middlewares/MyBasicAuth.swift
```

Inside this file, define your `MyBasicAuth` struct:

```swift
import Credentials
import CredentialsHTTP
import LoggerAPI

public struct MyBasicAuth: TypeSafeHTTPBasic {

}
```

If you're using Xcode it should display the message: Type 'MyBasicAuth' does not conform to protocol 'TypeSafeCredentials'

Click "Fix" to autogenerate the stubs for `verifyPassword` and `id`:

```swift
public static func verifyPassword(username: String, password: String, callback: @escaping (MyBasicAuth?) -> Void) {

}

public var id: String
```

Inside MyBasicAuth, add an authentication dictionary:

```swift
public static let authenticate = ["username" : "password"]
```

> In a real project, never store passwords in plain text!

The function, verifyPassword, takes a username and password and, on success, returns a `MyBasicAuth` instance.

We want to check if the password matches the user's stored password. On successful match, we initialize MyBasicAuth with an id equal to username.

```swift
if let storedPassword = authenticate[username], storedPassword == password {
    return callback(MyBasicAuth(id: username))
}
callback(nil)
```

This function is async, so that we can perform async actions to verify the password, e.g. looking up the username and password in a database.

We must call the callback closure with either an instance of Self or nil before exiting verifyPassword.

If we do not, the server will not know to continue and we will recieve a 503 "Service Unavailable" error, when we call the route.

Our completed struct should now look as follows:

```swift
public struct MyBasicAuth: TypeSafeHTTPBasic {

    public static let authenticate = ["username" : "password"]

    public static func verifyPassword(username: String, password: String, callback: @escaping (MyBasicAuth?) -> Void) {
        if let storedPassword = authenticate[username], storedPassword == password {
            return callback(MyBasicAuth(id: username))
        }
        callback(nil)
    }

    public var id: String
}
```

---

##Step 2: Create your authentication routes

Firstly, open your `Application.swift` file in your default text editor:

```
open Sources/Application/Application.swift
```

Inside the `postInit()` function add:

```swift
initializeTypeSafeAuthRoutes(app: self)
```

Next, create a new file, called `TypeSafeAuthRoutes.swift`, to contain the code for our routes:

```
touch Sources/Application/Routes/TypeSafeAuthRoutes.swift
```

Open your `TypeSafeAuthRoutes.swift` file:

```
open Sources/Application/Routes/TypeSafeAuthRoutes.swift
```

Inside this file, add the framework for our routes code:
```swift
import KituraContracts
import Credentials
import CredentialsHTTP
import LoggerAPI

func initializeTypeSafeAuthRoutes(app: App) {
    app.router.get("/basic", handler: app.protectedGetHandler)
}

extension App {
    // Define handlers here
}
```

In this guide, we will have a single route `GET` route. This route will only return a book to a user who has authenticated using HTTP basic authentication.

---

##Step 3: Using TypeSafeHTTPBasic in a route

Underneath our other Codable routes we will add:

```swift
func protectedGetHandler(user: MyBasicAuth, respondWith: (Book?, RequestError?) -> Void) {

}
```

> This route is returning the [Book model from the routing guide](/docs/routing/what-is-routing#bookmodel), however you could use any Codable type.

We have registered `MyBasicAuth` on our handler by adding it to the signature.

When the handler is called the middleware and the request is authenticated.

Within `protectedGetHandler`, we can then interact with our authenticated user:

```swift
Log.info("authenticated: \(user.id)")
let secretBook = Book(id: 451, title: "1984", price: 9001, genre: "Science Fiction")
respondWith(secretBook, nil)
```

That's it! We've implemented HTTP basic authentication of a Codable route.

Your completed `TypeSafeAuthRoutes.swift` should now look as follows:

```swift
import KituraContracts
import Credentials
import CredentialsHTTP
import LoggerAPI

func initializeTypeSafeAuthRoutes(app: App) {
    app.router.get("/basic", handler: app.protectedGetHandler)
}

extension App {
    func protectedGetHandler(user: MyBasicAuth, respondWith: (Book?, RequestError?) -> Void) {
        Log.info("authenticated \(user.id)")
        let secretBook = Book(id: 451, title: "1984", price: 9001, genre: "Science Fiction")
        respondWith(secretBook, nil)
    }
}
```
---

##Step 4: Test TypeSafeHTTPBasic routes

We need to first start our Kitura server.

Then navigate to: <a href="http://localhost:808/basic" target="blank">localhost:8080/basic</a>

Log in with the credentials we defined:

```
User Name: username
```

```
Password: password
```

We then should be logged in and see "username" in the browser.

The browser will store your login credentials and automatically log you in if you return to the route.

Use a private window if you would like to test incorrect authentication.

---

##Next steps

[Web Application](../web/what-is-templating): Learn about web applications and what Kitura provides.
