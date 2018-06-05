---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Type-Safe Sessions
menu: resources
lang: en
redirect_from: 
    - "/en/resources/tutorials/typesafesessions.html"
    - "/resources/tutorials/typesafesessions.html"
    - "/guides/typesafesessions.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
  <h1>Type-Safe Sessions</h1>
  <p>How to add Session support to Kitura's Codable Routing</p>
</div>

## Introduction
Kitura 2.4 introduces "Type-safe Middleware": middlewares that have a structure and data types that you define, that are instantiated and passed to your handler upon a request. Type-Safe Sessions is an implementation of `TypeSafeMiddleware` that allows an application developer to describe the exact structure and content of a session, in the form of a `class` conforming to the `TypeSafeSession` protocol.

The key feature is in the name: type safety. The previous implementation of KituraSession that can be used alongside "Raw Routing" provides you with a general `[String: Any]` store, into which any type could be stored and retrieved. This places the burden of type checking on the user: any value retrieved from the session would need a downcast to its expected type, resulting in boilerplate checking and error handling, and the possibility of runtime errors.

In contrast, `TypeSafeSession` has been designed to provide the following guarantees:
- If your route is invoked, a session has already been successfully created (or retrieved from a store), and you are passed a (non-optional) instance of your session class. There is no need to check whether a session exists.
- All data in the session can be accessed directly from your class, with strongly typed properties. There is no need to downcast or handle failure.
- All data that can be stored in a session can be persisted, and this is enforced at compile time. A `TypeSafeSession` is `Codable`, so all types that are stored in the session must also be `Codable`.

## Adding TypeSafeSession to your project

Add `Kitura-Session` to your `Package.swift` dependencies:
```swift
    .package(url: "https://github.com/IBM-Swift/Kitura-Session.git", from: "3.2.0"),
```

Add `KituraSession` to your Application targets:

```swift
    .target(name: "Application", dependencies: [ "KituraSession", ...
```

Regenerate your Xcode project:
```bash
swift package generate-xcodeproj
```

## Defining a TypeSafeSession

To create a `TypeSafeSession`, declare a type that conforms to the `TypeSafeSession` protocol:

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
struct Book: Codable {
    let title: String
    let author: String
}

router.get("/cart") { (session: MySession, respondWith: ([Book]?, RequestError?) -> Void) -> Void in
    respondWith(session.books, nil)
}

router.post("/cart") { (session: MySession, book: Book, respondWith: (Book?, RequestError) -> Void) -> Void in
    session.books.append(book)
    session.save()
    respondWith(book, nil)
}
```

Here the cart accepts a book item of type `Book`, appends the book to the list of books in the session, and responds with the book that was added, or a `RequestError.internalServerError` if the session could not be saved (such as a failure of the session store).

Note that if you define `MySession` as a class, it must be marked `final`.

If you define `MySession` as a struct, then in order to modify it within a handler, you will first need to assign it to a local variable:
```swift
router.post("/cart") { (session: MySessionStruct, book: Book, respondWith: (Book?, RequestError) -> Void) -> Void in
    var session = session                // Required when mutating a Struct
    session.books.append(book)
    session.save()
    respondWith(book, nil)
}
```

## Saving a session

It is necessary to save the session when updates have been made:

```swift
    session.save()
```

## Terminating a session 

To explicitly terminate a session, removing it from the store, call:

```swift
    session.destroy()
```

## Handling store failure

It is possible that the session store could become inaccessible, resulting in a failure to persist or remove sessions from the store. In such cases, an error will be logged for you. However, you can also take additional steps in the case of an error by supplying a callback which takes an `Error?`:
```swift
router.post("/cart") { (session: MySession, book: Book, respondWith: @escaping (Book?, RequestError) -> Void) -> Void in
    session.books.append(book)
    session.save() { error in
        if let error = error {
            respondWith(nil, .internalServerError)
        } else {
            respondWith(book, nil)
        }
    }
}
```

## Automatic saving of sessions

If you have declared `MySession` as a class, it is possible to implement an automatic saving of the session by defining a deinitializer on the class:
```swift
    deinit {
        self.save()
    }
```
Be aware that the session will then be saved after every request, regardless of whether it has been modified.

You may also want a method of tracking whether `destroy()` has been called, to suppress calling `save()` during deinitialization - otherwise, the session will be persisted back into the store again. For example:
```swift
    var destroyed: Bool = false {
        didSet { destroy() }
    }

    deinit {
        if !self.destroyed {
            self.save()
        }
    }
```
Then, you can replace `session.destroy()` with `session.destroyed = true`.
