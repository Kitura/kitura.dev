---
path: "/docs/routing/what-is-routing"
title: What is routing?
---

#What is routing?

Routing is the way in which requests (the combination of a URL and a HTTP method) are routed to the code that handles them.

When you navigated to www.kitura.io in your browser you were requesting the HTML file that is located there. The server hosting the files will respond with the requested file, if it exists, and you will see the file rendered in your browser. This means that under the covers there’s a server hosting the files for the kitura.io website. In this server there is a route defined that states if we receive a GET request on "/" then respond with the home page.

Here we mentioned a GET request being made on "/" but what does that mean? In the next section we will look at GET, which is an HTTP Method, in more detail.

---

##REST APIs

Representational state transfer (REST) or RESTful APIs are a way of building web services to allow clients and servers to communicate using standard HTTP protocols. Essentially it’s an architectural and design pattern for building an API using HTTP methods, URI paths, and request and response body data.

###HTTP Methods

An HTTP method is the part that defines what type of REST API we are calling. For example: A GET request gets a resource from the specified location, hence the name GET.

Below is a table of the main HTTP methods used in REST, listing their primary usage, what the request body should contain and what response we should expect from a call of that type.

| HTTP Method | Usage                                                 | Request Body                   | Response Body                      |
| ----------- | ----------------------------------------------------- | ------------------------------ | ---------------------------------- |
| GET         | The GET method is used to retrieve resources only	    | No request body needed	       | Reponds with resource              |
| POST        | The POST method is used to create a new resource    	| The resource to be created	   | Reponds with the created resource  |
| PUT         | The PUT method updates an existing resource	          | The new version of a resource	 | Responds with the updated resource |
| DELETE      | The DELETE method deletes an existing resource	      | No request body needed	       | No reponse body                    |
| PATCH       | The PATCH method makes a partial update to a resource	| The partially updated resource | Responds with the updated resource |

###URI Paths

A URI path is the path upon which this route is linked. That is to say when a request is made to the specified path we know this is the code block to execute. Here is an example:

```swift
router.get("/hello")
```

Above is an example of registering a GET method on the "/hello" path. Let's assume our server is running at localhost:8080, then if I want to make a call to this endpoint I could open http://localhost:8080/hello in my browser and view the response.

###Route handler

Each route has a route handler. This is a closure or function that is executed when a request is made to the route's path. The route handlers contain the developer's logic for how to process incoming requests and what response should be sent.

If multiple route handlers match the path, they will be executed in the order that they are registered on the router. This is important when using middlewares, since they should normally be executed before the other handlers.

Kitura provides two 'types' of routing, Raw Routing and Codable Routing. Over the next couple of sections we will discuss them and highlight their differences.

---

##Raw Routing

Raw routing is where the route handlers were called with RouterRequest and RouterResponse objects with which to handle the client request and build the response, along with a next completion handler. This approach provides great flexibility and control, but requires you to understand the structure of requests, how to interpret HTTP request headers correctly, how to verify data, and to manually carry out things like JSON parsing.

The following is an example of a Raw Route:

```swift
router.get("/") { request, response, next in
    response.send("Hello world")
    next()
}
```

###Router Request

The RouterRequest class is used to interact with incoming HTTP requests to the router. It contains and allows access to the request’s headers and body as well as other properties of the request. It can also perform content negotiation based on the request’s Accept header.

###Router Response

The RouterResponse class is used to define and work with the response that will be sent by the router. It contains and allows access to the HTTP response code (e.g. 404 Not Found), the HTTP headers and the body of the response. It can also render template files, using a template engine registered to the router.

###Next

In Kitura, multiple handlers can be registered on a single route. The handlers can alter the request or response before passing them to the next handler. By having the next closure, we can register a handler that acts as a middleware and is called before your routes.

Once a handler is finished, it calls the next handler using the next() closure. If there are no more handlers, the router will send the response. If there was an error and you do not want to call the next handler, you can call request.end() to send back the response immediately. You must call next() or request.end() once, and only once, in each route handler because the route handlers are asynchronous.

For example:

```swift
router.get("/") { request, response, next in
    response.send("Hello from the 1st route!")
    next()
}

router.get("/") { request, response, next in
    response.send("Hello from the 2nd route!")
    next()
}
```

If a request comes into the server on "/" then the following would be returned to the client:

```
"Hello from the 1st route!"
"Hello from the 2nd route!"
```

As you can see one route is called immediately after the other, this is made possible because of next().

---

##Codable Routing

Codable routing is where the route handlers are like normal functions you might define elsewhere in your code; they take struct or class types as parameters, and respond with struct or class types via a completion handler. The only requirement is that those types conform to the Codable protocol introduced in Swift 4 (hence the name).

```swift
func getHandler(completion: ([String]?, RequestError?) -> Void) {
    completion(["Hello World!"], nil)
}

router.get("/", handler: getHandler)
```

###Codable model

Any type that conforms to Codable can be used as a parameter in Codable routing, including custom structs and classes. As we are simulating a bookstore in our guides, we are going to need to define a book. The book is a model so the first thing we need to do is create our Models folder:

```
mkdir Sources/Application/Models
```

This is the directory where we will store all of our models.

Next we will create our Book.swift file:

```
touch Sources/Application/Models/Book.swift
```

We will open the Book.swift file in our default text editor:

```
open Sources/Application/Models/Book.swift
```

Inside this file we define our Book:

```swift
struct Book: Codable {
    let id: Int
    let title: String
    let price: Double
    let genre: String

    init(id: Int, title: String, price: Double, genre: String) {
        self.id = id
        self.title = title
        self.price = price
        self.genre = genre
    }
}
```

---

##Conclusion

Codable routing provides a simple approach to building RESTful APIs. It adds compile-time type safety, creates cleaner code and can automatically generate an OpenAPI specification. If you are building a Backend For Frontend (BFF) for an iOS app, you should probably use Codable routing.

Raw routing is more flexible and provides greater control over your route handler implementation but does not have the same inherent type safety. If you are creating a non-RESTful API, such as a web application, then you will need to use Raw routing.

