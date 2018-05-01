---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Codable Routing
menu: resources
lang: en
redirect_from: 
    - "/en/resources/tutorials/codablerouting.html"
    - "/resources/tutorials/codableoruting.html"
    - "/guides/codablerouting.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
  <h1>Codable Routing</h1>
</div>



## Introduction
Kitura 1.x supported “Raw Routing” only, where the route handlers were called with RouterRequest and RouterResponse objects with which to handle the client request and build the response, along with a next completion handler. This approach provides great flexibility and control, but requires you to understand the structure of requests, how to interpret HTTP request headers correctly, how to verify data, and to manually carry out things like JSON parsing.

Kitura 2.0 introduced “Codable Routing”. Here the the router handlers are much like normal functions you might define elsewhere in your code: they take struct or class types as parameters, and respond with stuct or class types via a completion handler, with just an additional requirement that those types implement Codable from Swift 4 (hence the name).

Codable Routing isn’t suitable for every use case and scenario, so Raw Routing is still available where you need the power and flexibility, but it is perfect for building REST APIs.

This guide shows you step by step how to set up Codable routes on a Kitura server. 

## Let's build a Server!

### Getting started
First we need a Kitura server to add our routes to. Kitura has a [command-line interface](https://github.com/IBM-Swift/kitura-cli) which provides us with utilities for quickly creating a Kitura server.  
> ![tip] You can find installation instructions for the command-line interface in the [Getting Started](/{{ page.lang }}/starter/gettingstarted.html) section. 

Once we've installed the Kitura command-line interface, open a terminal window and run the following:  

1. Create a directory:  

```
mkdir ~/CodableRouting
```
2. Change to the new directory:  

```
cd ~/CodableRouting
```
3. Create the Kitura server:  

```
kitura init
```

`kitura init` creates and builds a starter Kitura application and will take a couple of minutes to complete. This includes best-practice implementations of health checking and monitoring as well as configuration files to allow easy deployment to a Docker container, a Kubernetes cluster, or the IBM Cloud.

`kitura init` also generates an Xcode project.  
In a terminal run the following:  

```
open CodableRouting.xcodeproj
```
Now we're ready to start coding!

### Creating the models
Codable routing works directly with Swift value types, therefore we need to contruct a value type to use. A good example of this is a struct that conforms to Codable: 
```swift
struct User: Codable {
    let name: String
    let age: Int
}
```

It's good practice to keep value types (in this case models) and logic separated. Create a new file, to contain the models, called `Models.swift` as follows:  
1. In Xcode right click on the `Application` folder and select `New File`
2. Select `Swift File` in the UI pop up and click next.
3. In the `Save As` field, name the file `Models.swift`.
4. Ensure Group is `Application` and target is `Application`.
5. Click `Create` to create the file.

For now, let's create a very simple model: 
1. Open `Models.swift`
2. Copy in the following code:  

```swift
struct User: Codable {
    let name: String
    let age: Int
}
```

This provides a simple representation of a user that has two properties, a name and an age. In real applications models tend to be more complex, and typically would be made up of various different models.  

Now we have a model we can use, next we can create our Codable routes!

### Registering a POST endpoint
`POST` requests are used to send data to the server, but the server needs an `endpoint` for the request. That is, it needs to know what to do when a `POST` request comes in on a given URI. So how do we do this?  
It can actually be done quite simply: 
```swift
router.post("/users", handler: someHandler)
```
What we're doing here is invoking the `post` method on the given `Router()` instance, providing a URI, `/users`, and a handler. We can ignore the handler for now, we will go into more detail about that shortly.  
  
By default `kitura init` sets the server to run on `http://localhost`.  
When we provide a URI it is appended to the server's host address, so in our case our POST endpoint would be:  
```
http://localhost/users
```  
What this is saying is, if a POST request is made to the server on the specified adderess then do something. That 'something' is where the handler comes in.  
The handler, `someHandler` in our case, is a user defined function that contains some logic to be executed when a request is made on the given address:  
```
http://localhost/users
```  
The function looks something like this:  
```swift
func someHandler(user: User, completion: (User?, RequestError?) -> Void ) {
        //Perform some logic
        ...
        completion(user, nil)
    }
```
It accepts two parameters, the `User` we want to 'POST' to the server and a completion which is a [closure](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html).  
The completion parameter is a fuction, that accepts an optional `User` and an optional `RequestError`. This allows us to respond with the `User` if all went well or respond with an error if something went wrong by simply passing nil. 
```swift
func someHandler(user: User, completion: (User?, RequestError?) -> Void ) {
        //Perform some error handling
        ...
        completion(nil, error)
    }
```

Lets go ahead and actually implement a `POST` endpoint in our Kitura server.  
In our `CodableRouting` Xcode project, open the `Application.swift`. This is where we will be doing most of out development.  
Inside the `postInit()` function, underneath the line: 
```swift
initializeHealthRoutes(app: self)
```
Add the following:  
```swift
router.post("/users", handler: postHandler)
```
This will not compile as we haven't actually implemented the `postHandler` yet. So lets go ahead and do that.  
Underneath the `postInit()` function add the following:  
```swift
func storeHandler(user: User, completion: (User?, RequestError?) -> Void ) {
    completion(user, nil)
}
```

Our changes should look like this: 
```swift
...

func postInit() throws {
    // Endpoints
    initializeHealthRoutes(app: self)
    router.post("/users", handler: postHandler)
}

func postHandler(user: User, completion: (User?, RequestError?) -> Void ) {
    completion(user, nil)
}
...
```

And that's it. We've implemented our first Codable route!  

Lets see how this looks, start the server by running the Xcode project.  
The server is now up and running and waiting for a `POST` request to come in, so lets send a request.  
For this you can use any utility that allows you to send HTTP requests such as [Postman](https://www.getpostman.com/).  
We're going to use the terminal, using [curl](https://curl.haxx.se/docs/manual.html) which is a simple command line tool.  
So with your server still running open a terminal and run the following: 
```
curl -X POST \
  http://localhost:8080/users \
  -H 'content-type: application/json' \
  -d '{
    "name": "Hello World!",
    "age": 99
}'
```

Then in the terminal we should see the following:  
`{"name":"Hello World!","age":99}%`

But what just happened? Using curl we were able to make a `POST` request using `curl -X POST` to a specified address:  
```
http://localhost:8080/users
``` 
We also had to specify what type of content we are sending, in our case this is `application/json` and we also need to provide the actual JSON we want to send: 
```
{
    "name": "Hello World!",
    "age": 99
}
```

Kitura takes this JSON object and checks to see if it can be decoded to the type we're expecting, i.e. a `User`. If the JSON can be decoded to a `User` the server will respond with the `User` we posted as that's what our `postHandler` logic specifies.  
If it can't the server will log an error, to see this we can modify the JSON in the curl request to no longer match the `User` properties: 
```
curl -X POST \
  http://localhost:8080/users \
  -H 'content-type: application/json' \
  -d '{
    "random": "Hello World!",
    "age": 99
}'
```
In XCode you should see that an Error is logged in the output.

### Registering a GET endpoint
`GET` requests are used to retrieve data from a server. However we have a flaw in our server, it has no way of storing data for us to retrieve. So lets rectify that.  
In `Application.swift` underneath the line:  
`let cloudEnv = CloudEnv()`
Add the following:  
`private var userStore: [String: User] = [:]`  

We use a dictionary to handle cases where you may want to work with a single `User`, for example a `GET` request for a single user. 

We now also need to update our `postHandler` to add the `User` we post to the `userStore`. We can do this like so:  
```swift
func postHandler(user: User, completion: (User?, RequestError?) -> Void ) {
    userStore[user.name] = user
    completion(userStore[user.name], nil)
}
```
All we're doing here is using the user's name as the key, and then the actual `User` as the value.  
So now that we have a way of storing posted users, we can add a way for 'getting' all of them. First we need to register a `GET` endpoint like we did for `POST`. So underneath the line:  
```swift
router.post("/users", handler: postHandler)
```
Add the following:  
```swift
router.get("/users", handler: getAllHandler)
```
Once again this won't compile as we haven't defined a `getAllHandler` function yet, so lets do that now.  
Underneath the `postHandler` fuction add the following:  
```swift
func getAllHandler(completion: ([User]?, RequestError?) -> Void ) {
    let users: [User] = self.userStore.map({ $0.value })
    completion(users, nil)
}
```
So unlike the `postHandler` we don't need to pass a `User` as a parameter here as we're not wanting to send anything to the server. We still have the completion closure though, this time accepting an array of `User`. This makes sense as we're 'getting' all users, and this could be one user or it could be many users.  
We need to convert our `userStore` dictionary to an array, a simple way of doing that is using the [map](https://developer.apple.com/documentation/swift/array/2908681-map) function Swift provides.  
Once we have the array we can pass it to the completion, and thats it.  
We've implemented our second route!  

Like before we'll use `curl` to test that our routes work correctly (or use your preferred tool).  
Start the server by running your XCode project and then open a terminal and run the following:  
```
curl -X GET \
  http://localhost:8080/users \
  -H 'content-type: application/json'
```
In the terminal you should see the following: 
```
[]%
```
It's an empty array because we haven't posted any data to the server. Lets post some data to the server:  
```
curl -X POST \
  http://localhost:8080/users \
  -H 'content-type: application/json' \
  -d '{
    "name": "Hello World!",
    "age": 99
}'
```
Now that the server has data, lets try running the `GET` request again:  
```
curl -X GET \
  http://localhost:8080/users \
  -H 'content-type: application/json'
```
You should now see:  
```
[{"name":"Hello World!","age":99}]%
```

We have now posted data to a server, and then been able to retrieve it without having to write much code!  

## What next?

Want to use Codable routing within an iOS app? Check out our [FoodTrackerBackend](https://github.com/IBM/FoodTrackerBackend) tutorial!

[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png

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

