---
title: "A new kind of Kitura middleware: type-safe and easy to use"
blurb: Kitura 2.4 enhances Codable routing by introducing “Type-Safe Middlewares”
date: "2018-06-05"
author: Andrew Lees
path: /blogs/type-safe-middleware
---

Kitura 2.0 introduced Codable routing, a powerful way to quickly build REST APIs from Swift datatypes. Kitura 2.4 enhances Codable routing by introducing “Type-Safe Middlewares”. This is a facility that centralizes your middleware logic in one place, guarantees that routes are invoked only after any required middlewares have successfully executed, and provides compile-time type safety to your Kitura app. This blog introduces the TypeSafeMiddleware protocol and demonstrates it being used with sessions and HTTP Basic authentication.

##Type-Safe Middleware

Traditional Kitura middlewares are functions that you can register against routes. They run code and change the request and response before the execution of the route handlers. This is implemented by the handle() function in the following protocol:

```swift
public protocol RouterMiddleware {
    func handle(request: RouterRequest,
                response: RouterResponse,
                next: @escaping () -> Void) throws
}
```

However, Codable routes abstract away the request and response, so the results of standard middlewares are not available within the route handler.

Type-safe middlewares, rather than augmenting the request/response objects, are responsible for returning an instance of a concrete Swift type:

```swift
public protocol TypeSafeMiddleware {
    static func handle(request: RouterRequest,
                       response: RouterResponse,
                       completion: @escaping (Self?, RequestError?) -> Void)
}
```

The concrete type is Self, because this centralizes the middleware’s structure and behavior into a single place. The Codable route handler is passed a successfully executed middleware instance. This provides the user access to the middleware and the instance properties they specified when defining the type.

To add a type-safe middleware to your Codable route, specify the middleware in the application route handler. For example, a handler for GET requests that requires an instance of MyMiddleware becomes:

```swift
router.get("/example", handler: getHandler)
 
func getHandler(middleware: MyMiddleware, completion: @escaping (User?, RequestError?) -> Void) {
    let user: User = middleware.user
    completion(user, nil)
}
```

Kitura will invoke your static MyMiddleware.handle() function, and if an instance of MyMiddleware is successfully created, it is passed to the route handler. If no instance is created, the route handler is not called. This removes the requirement for type checking or dealing with middleware failure within the handler itself. As a result, you have all the data you expect and type mismatches are checked at compile time (hence “type-safe”).

---

##Type-safe Sessions

We have added an implementation of type-safe sessions in Kitura-Session. This defines a TypeSafeSession protocol, which is also Codable. You can create a type that conforms to TypeSafeSession and contains exactly the data needed by your application. This type is then used as a type-safe middleware in your Codable routes. To demonstrate the benefits, let’s compare traditional and type-safe sessions for retrieving some books from a shopping cart:

```swift
struct Book: Codable {
    let title: String
    let author: String
}
```

###Raw sessions:

Initialize the session:

```swift
let session = Session(secret: "secret", cookie: [CookieParameter.name("cookie-name")])
```

Register the session on the route:

```swift
router.get("/cart", middleware: session) 
```

Interact with the session within the route:

```swift
router.get("/cart") { request, response, next in
    guard let session = request.session,
          let bookData = session["books"] as? [[String: String]]
    else {
         return try response.status(.internalServerError).end()
    }
    var books: [Book] = []
    for book in bookData {
        guard let bookTitle = book["title"],
              let bookAuthor = book["author"]
        else { continue }
        books.append(Book(title: bookTitle, author: bookAuthor))
    }
    // Work with your books from the session
    response.send(json: books)
    next()    
}
```

###Type-safe sessions:

Define and set up your session class with expected fields:

```swift
final class MySession: TypeSafeSession {
    let sessionId: String             // Requirement: every session must have an ID          
    var books: [Book]                 // User-defined type         
    init(sessionId: String) {         // Requirement: must be able to create a new (empty)          
        self.sessionId = sessionId    // Initialise the sessionId         
        books = []                    // empty value for any non-optional properties.          
    }
}
 
extension MySession {
    static let cookie = SessionCookie(name: "cookie-name", secret: "secret")
    static var store: Store?           // Store for the sessions (nil defaults to in memory store)
}
```

By convention, we have defined the instance properties separate from the static properties, which are in an extension. This is to distinguish between data provided by an instance, and static configuration properties on the type.

Interact with the session within the route:

```swift
router.get("/cart") { (session: MySession, respondWith: ([Book]?, RequestError?) -> Void) in
    var books: [Book] = session.books
    // Work with your books from the session
    respondWith(books, nil)
}
```

By using type-safe sessions, we have ensured that:

- When the route handler is invoked, a session has already been successfully created (or retrieved from a store), and passed to the handler. There is no need to check whether a session exists.
- All data in the session can be accessed directly from your class, with strongly typed properties. There is no need to downcast.
- All data stored on a session can be persisted. A TypeSafeSession is Codable, so all types that are stored in the session must also be Codable.

---

##HTTP Basic Authentication

We have also added an implemention of type-safe HTTP Basic authentication in Kitura-CredentialsHTTP. HTTP Basic authentication transmits credentials in an “Authorization” header as base64 encoded user ID/password pairs. Kitura also allows you to send the username and password in the URL as follows:

```
https://username:password@www.example.com/
```

Note: some web browsers disable this for security reasons.

###Raw HTTP Basic authentication:

In raw routing, you could implement HTTP basic code as follows:

Initialize the basicCredentials:

```swift
let credentials = Credentials()
 
static let users = ["John" : "12345", "Mary" : "qwerasdf"]
 
let basicCredentials = CredentialsHTTPBasic(verifyPassword: { userId, password, callback in
    if let storedPassword = users[userId], storedPassword == password {
        callback(UserProfile(id: userId, displayName: userId, provider: "HTTPBasic"))
    } else {
        callback(nil)
    }
})
```

Note: This is a simplified example. In practice, passwords would not be stored in plain text.

Register the middleware on the route:

```swift
credentials.register(plugin: basicCredentials)
router.all("/profile", middleware: credentials)
```

Interact with the credentials within the route:

```swift
router.get("/profile") { request, response, next in
    guard let profile = request.userProfile else {
        return try response.status(.unauthorized).end()
    } 
    response.send(profile.id)
    next()
}
```

###Type-safe HTTP Basic authentication:

Type-safe middleware makes this simpler and safer. We create a new type conforming to TypeSafeHTTPBasic:

```swift
public struct MyBasicAuth: TypeSafeHTTPBasic {
    public let id: String
}
 
extension MyBasicAuth {
    static let users = ["John" : "12345", "Mary" : "qwerasdf"]
 
    public static func verifyPassword(username: String, password: String, callback: @escaping (MyBasicAuth?) -> Void) {
        if let storedPassword = users[username], storedPassword == password {
            callback(MyBasicAuth(id: username))
        } else {
            callback(nil)
        }
    }
}
```

We interact with the credentials within the route:

```swift
router.get("/profile") { (userProfile: MyBasicAuth, respondWith: (MyBasicAuth?, RequestError?) -> Void) in
   respondWith(userProfile, nil)
}
```

The route will now only be invoked if authentication has been successful. The handler is passed a MyBasicAuth instance with the id field initialized appropriately, as well as any additional user-defined fields, instead of a generic [String: Any] dictionary.

A further benefit of this approach can be seen when combining HTTP basic authentication with Swift-Kuery-ORM for user persistence. Because MyBasicAuth is Codable, we can also make it conform to Model. Then you can initialize your user type by using id as a primary key to retrieve the instance from the database:

```swift
public struct MyBasicAuth: TypeSafeHTTPBasic, Model {
    public let id: String
    private let password: String
    public let firstName: String
    public let lastName: String
    public let age: Int?
}
 
extension MyBasicAuth {
    static var idColumnName = "id"
 
    public static func verifyPassword(username: String, password: String, callback: @escaping (MyBasicAuth?) -> Void) {
        MyBasicAuth.find(id: username) { userProfile, error in
            if let userProfile = userProfile {
                if password == userProfile.password {
                    callback(userProfile)
                    return
                }   
            }
            callback(nil)
        }
    }
}
```

In this example, we have implemented the verifyPassword function by retrieving a user’s profile from a database. A profile with an id matching the supplied username is retrieved. If no matching id is found, or if the supplied password does not match, the middleware fails. If a match is found, the ORM returns an instance of MyBasicAuth, which is then provided to the route handler.