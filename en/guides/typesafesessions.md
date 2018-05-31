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
    
    init(sessionId: String) {                   // Requirement: must be able to create a new (empty)
        self.sessionId = sessionId              // session containing just an ID. Any non-optional 
    }                                           // properties should be assigned default / empty values.
}

// Defines the configuration of the user's type: how the cookie is constructed, and how the session is
// persisted.
extension MySession {
    static let sessionCookie: SessionCookie = SessionCookie(name: "MySession", secret: "Top Secret")
    static var store: Store?
}
```






and then provide an implementation of the storeHandler:

```swift
func storeHandler(todo: ToDo, completion: (ToDo?, RequestError?) -> Void ) -> Void {
    todoStore.append(todo)
    completion(todo, nil)
}
```

Here the store handler accepts a todo item of type `ToDo` and responds using an asynchronous completion handler. The handler then stores the received todo item in the todoStore and returns with the created todo item in the case of success, and an `Error` in the the case of failure.

The input parameter and the response parameter in completion handler can be any Swift type you want, as long as it conforms to Codable. For example, we could use the following as our `ToDo` type:

```swift
public struct ToDo : Codable {
    public var title: String        // title of the todo item
    public var order: Int           // order to display the todo item
    public var completed: Bool      // has the item been completed
}
```

At this point the server has stored the item, but the client has no way of referring to that specific item on the server if it wants to get, update, or delete that item. In order to do that, some kind of unique identifier is required.

Returning an identifier to the client for the stored data is typically done in one of two ways:

* ### Adding an additional Optional field to the type
Here the ToDo struct would be updated to add an extra field:
```swift
public struct ToDo : Codable {
    public var title: String       
    public var order: Int      
    public var completed: Bool
    public var id: Int?         // Additional field for identifier
}
```

And the storeHandler function would then set it:

```swift
func storeHandler(todo: ToDo, completion: (ToDo?, RequestError?) -> Void ) -> Void {
    var todo = todo
    let id = todoStore.count
    todo.id = id
    todoStore.append(todo)
    completion(todo, nil)
}
```

* ### Responding with an additional Identifier value
Alternatively you can choose to respond with an additional value in the completion handler that conforms to the Identifier protocol, which String and Int have been extended to conform to already. The additional identifier value is then written into the “Location” header of the response.

Here the storeHandler would become the following:
```swift
func storeHandler(todo: ToDo, completion: (Int?, ToDo?, RequestError?) -> Void ) -> Void {
    var todo = todo
    let id = todoStore.count
    todoStore.append(todo)
    completion(id, todo, nil)
}
```

## Building a Read API for GET requests

Now that the Kitura application can store a `ToDo` item and inform the client where it is, there needs to be a REST API to allow the client to read it. This is done by registering a handler for GET requests on ‘/todos/id’.

```swift
router.get("/todos", handler: getOneHandler)
```

The registration of the handler is only against the “/todos” path, but we also need to accept an id sent from the client. This id is then appended to the URI to create the full '/todos/id' URI, you do not need to append the id. This is done in the handler itself:

```swift
func getOneHandler(id: Int, completion: (ToDo?, RequestError?) -> Void ) -> Void {
    completion(todoStore[id], nil)
}
```

Here the Kitura router itself parses the URI path, and converts the id into an Int before calling the handler.
Similar to the way that you can specify incoming data parameters as a type that implements Codable, it is possible to specify identifier parameters as any type that implements Identifier – which is a protocol provided by Kitura.

## Building Identifiers with the Identifier Protocol
Defining an Identifier for use with Codable Routing has two requirements. The first is that it must implement the Identifier protocol, creating an instance that can be used as an identifier from a string constructor.

The following is an example of a custom Identifier called `Item`:
```swift
public struct Item: Identifier {
    public var value: String
    public let id: Int

    public init(value: String) throws {
        if let id = Int(value) {
            self.id = id
            self.value = value
        } else {
            throw IdentifierError.invalidValue
        }
    }
}
```

The second requirement is that the original String used in the constructor must be stored in the value field. The reason for this is to allow the Identifier to be used with data types, APIs, and the KituraKit client.

## Sharing code with the client using KituraKit
Because the Codable Handlers that are registered with the Router do not use complex RouterRequest and RouterResponse objects but instead work with concrete Swift Types, it becomes must easier to share code between the client and the server.

The ease with which you can share code (including the Codable Types), depends on the client connection library used. If the client library does not support passing Codable types directly, then the types need to be encoded to JSON manually using `JSONEncoder.encode()`, and the responses decoded using JSONDecoder.decode(). Additionally the Identifiers need to be encoded into the URL.

In order to simplify this as much as possible, Kitura also provides [KituraKit](https://github.com/IBM-Swift/KituraKit): a pure-Swift client library that can be used on both iOS and Linux that mirrors the Kitura Router API as closely as possible in order to maximize code sharing.

With KituraKit it becomes possible to share and import your Codable and Identifier types and use KituraKit to make client calls to the Kitura server with matching APIs. The following code makes a Read (GET) call from the client to the Kitura server using KituraKit:
```swift
let client = KituraKit(baseURL: "http://localhost:8080")

let id = todo.id
client.get("/todos", id: id, completion: completion)

func completion(todo: ToDo?, error: RequestError?) {
    guard error == nil else {
        print("Error reading ToDo item from Kitura: \(error!)")
        return
    }
    guard let todo = todo else {
        print("Error reading todo from Kitura, no error and no response")
        return
    }
    print("Read \(todo.title) from Kitura server")
}
```

To see an example of KituraKit in use you can check out the [sample app](https://github.com/IBM-Swift/iOSSampleKituraKit)!

## Building a real REST API with Codable Routing and KituraKit

The above examples are just fragments of what’s required to use Codable Routing to implement a real RESTful API, and KituraKit to share code and exploit it from a Swift client. The following provide two step-by-step tutorials for building a real API:

* [FoodTracker Backend](https://github.com/IBM/FoodTrackerBackend)  
  This builds a Kitura backend for the FoodTracker iOS application that is provided as part of the Apple tutorials for building your first iOS app. This uses Codable Routing to build the server, and updates the FoodTracker iOS app with KituraKit to be able to store and retrieve data from the Kitura server.

* [ToDo Backend](https://github.com/IBM/ToDoBackend)  
  This builds a Kitura backend that passes the specification and tests for the ToDo web client using Codable Routing. Additionally we provide an example iOS app implementation of the ToDo web client that uses KituraKit to communicate with the Kitura server.
  <section class="social-section">
  	<div class="social-link">
  		<a rel="nofollow" href="http://swift-at-ibm-slack.mybluemix.net">
  		<img src="../../../assets/slack.png" alt="Slack Logo" width="60" height="60" class="social-image"/></a>
  		<p class="social-header">Join the discussion on Slack</p>
  	</div>
  	<div  class="social-link">
  		<iframe class="social-image" src="https://ghbtns.com/github-btn.html?user=IBM-Swift&amp;repo=Kitura&amp;type=star&amp;count=true&amp;size=large" frameborder="0" scrolling="0" width="150px" height="30px"></iframe>
  		<p class="social-header">Star Kitura on GitHub</p>
  	</div>
  </section>
