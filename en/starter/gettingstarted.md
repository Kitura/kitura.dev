---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Kitura "Hello World" example
menu: starter
lang: en
redirect_from: "/starter/helloworld.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---
# Getting Started

Let's develop your first Kitura web application!

First, create a new project directory.

```
$ mkdir myFirstProject
```

Next, create a new Swift project using the Swift Package Manager.

```
$ cd myFirstProject
$ swift package init --type executable
```

Now your directory structure under myFirstProject should look like this:
<pre>
myFirstProject
├── Package.swift
├── Sources
│   └── main.swift
└── Tests
</pre>

> Note: For more information on the Swift Package Manager, visit [swift.org](https://swift.org/package-manager).

In `Package.swift`, add Kitura as a dependency for your project.

```swift
import PackageDescription

let package = Package(
    name: "myFirstProject",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 0, minor: 32)
    ])
```

In `Sources/main.swift`, add the following code.

```swift
import Kitura

// Create a new router
let router = Router()

// Handle HTTP GET requests to /
router.get("/") {
    request, response, next in
    response.send("Hello, World!")
    next()
}

// Add an HTTP server and connect it to the router
Kitura.addHTTPServer(onPort: 8090, with: router)

// Start the Kitura runloop (this call never returns)
Kitura.run()
```

Compile your application:

```
$ swift build
```

Or copy our [Makefile and build scripts](https://github.com/IBM-Swift/Package-Builder/blob/master/build) to your project directory and run `make build`. You may want to customize this Makefile and use it for building, testing and running your application. For example, you can clean your build directory, refetch all the dependencies, build, test and run your application by running `make clean refetch test run`.

Now run your new web application:

```
$ .build/debug/myFirstProject
```

Open your browser at [http://localhost:8090](http://localhost:8090)

## Add logging (optional)

 In the code example above no messages from Kitura will be logged to the console. You may want to add a logger to help diagnose any problems that occur.

 Add a HeliumLogger dependency to `Package.swift`.

```swift
import PackageDescription

let package = Package(
    name: "myFirstProject",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 0, minor: 32),
        .Package(url: "https://github.com/IBM-Swift/HeliumLogger.git", majorVersion: 0, minor: 17)
    ])
```

Enable HeliumLogger in `Sources/main.swift`.

```swift
import Kitura
import HeliumLogger

// Initialize HeliumLogger
HeliumLogger.use()

// Create a new router
let router = Router()

// Handle HTTP GET requests to /
router.get("/") {
    request, response, next in
    response.send("Hello, World!")
    next()
}

// Add an HTTP server and connect it to the router
Kitura.addHTTPServer(onPort: 8090, with: router)

// Start the Kitura runloop (this call never returns)
Kitura.run()
```

# Next Steps

Learn how to [deploy your application to the cloud](/en/starter/deploying.html).

