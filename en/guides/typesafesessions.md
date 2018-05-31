<div class="titleBlock">
  <h1>Type-Safe Sessions</h1>
  <p>How to add Session support to Kitura's Codable Routing</p>
</div>

## Introduction
Kitura 2.4 introduces "Type-safe Middleware": middlewares that have a structure and data types that you define, that are instantiated and passed to your handler upon a request. Type-Safe Sessions is an implementation of `TypeSafeMiddleware` that allows an application developer to describe the exact structure and content of a Session, in the form of a `class` conforming to the `TypeSafeSession` protocol.

The key feature is in the name: type safety. The previous implementation of Session that can be used alongside "Raw Routing" provides you with a general `[String: Any]` store, into which any type could be stored and retrieved. This places the burden of type checking on the user: any value retrieved from the session would need a downcast to its expected type, resulting in boilerplate checking and error handling, and the possibility of runtime errors.

In contrast, TypeSafeSession has been designed to provide the following guarantees:
- If your route is invoked, a session has already been successfully created (or retrieved from a store), and you are passed a (non-optional) instance of your session class. There is no need to check whether a session exists.
- All data in the session can be accessed directly from your class, with strongly typed properties - there is no need to downcast or handle failure.
- All data that can be stored on a session can be persisted, and this is enforced at compile time. A `TypeSafeSession` is `Codable`, so all types that are stored in the session must also be `Codable`.

## Adding TypeSafeSession to your project

TODO (Package.swift, import)

## Defining a TypeSafeSession

To create a TypeSafeSession, declare a `final class` that conforms to the `TypeSafeSession` protocol:

```swift
// Defines the session instance data
final class MySession: TypeSafeSession {

    let sessionId: String                       // Requirement: every session must have an ID
    var books: [Book]                           // User-defined type, where Book conforms to Codable
    
    init(sessionId: String) {                   // Requirement: must be able to create a new (empty)
        self.sessionId = sessionId              // session containing just an ID. Assign a default or
        books = []                              // empty value for any non-optional properties.
    }
}

// Defines the configuration of the user's type: how the cookie is constructed, and how the session is
// persisted.
extension MySession {
    static let sessionCookie: SessionCookie = SessionCookie(name: "MySession", secret: "Top Secret")
    static var store: Store?
}
```

The minimum requirements for a `TypeSafeSession` are:
- a `sessionId: String`,
- an initializer that creates a new session from a new `sessionId`,
- a `sessionCookie: SessionCookie` that defines the name of the cookie and the secret data used to encrypt it, 
- an optional `store: Store?` that defines how sessions should be persisted.

If `store` is not assigned, then a default in-memory store is used. [Kitura-Session-Redis](https://github.com/IBM-Swift/Kitura-Session-Redis) is an example of a persistent store for sessions, which supports expiry.

The `MySession` type can then be included in the application's Codable route handlers. For example:

```swift
router.get("/cart") { (session: MySession, respondWith: ([Book]?, RequestError?) -> Void) -> Void in
    respondWith(session.books, nil)
}

router.post("/cart") { (session: MySession, book: Book, respondWith: (Book?, RequestError) -> Void) -> Void in
    session.books.append(book)
    do {
        try session.save()
        respondWith(book, nil)
    } catch {
        Log.error("Unable to persist session: \(error.localizedDescription)")
        respondWith(nil, .internalServerError)
    }
}
```

Here the cart accepts a book item of type `Book`, appends the book to the list of books in the session, and responds with the book that was added, or a `RequestError.internalServerError` if the session could not be saved (such as a failure of the session store).

## Saving a session

Note that it is currently necessary to save the session explicitly when updates have been made:

```swift
    try session.save()
```

It is planned to introduce an automatic save feature at a later time that a `TypeSafeSession` type can opt in to.

## Terminating a session 

To explicitly terminate a session, removing it from the store, call:

```swift
    try session.destroy()
```

This removes the session from the store, or throws an error if there was a failure of the session store.
