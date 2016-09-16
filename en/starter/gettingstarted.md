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
    └── <i>empty</i>
</pre>

Note: For more information on the Swift Package Manager, go [here](https://swift.org/package-manager).

In `Package.swift`, add Kitura as a dependency for your project.

```swift
import PackageDescription

let package = Package(
    name: "myFirstProject",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 0, minor: 28)
    ])
```

In `Sources/main.swift`, import the Kitura module.

```swift
import Kitura
```

Add a router and a path:

```swift
let router = Router()

router.get("/") {
    request, response, next in
    response.send("Hello, World!")
    next()
}
```

Add an HTTP server and start the Kitura framework.

```swift
Kitura.addHTTPServer(onPort: 8090, with: router)
Kitura.run()
```

Your `Sources/main.swift` file should now look like this.

```swift
import Kitura

let router = Router()

router.get("/") {
    request, response, next in
    response.send("Hello, World!")
    next()
}

Kitura.addHTTPServer(onPort: 8090, with: router)
Kitura.run()
```

Optionally, add logging.

 In the code example above, no messages from Kitura will logged. You may want to add a logger to help diagnose any problems that occur.

 Add a HeliumLogger dependency to `Package.swift`.

```swift
import PackageDescription

let package = Package(
    name: "myFirstProject",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 0, minor: 28),
        .Package(url: "https://github.com/IBM-Swift/HeliumLogger.git", majorVersion: 0, minor: 15)
    ])
```

Enable HeliumLogger in `Sources/main.swift`.

```swift
import HeliumLogger

HeliumLogger.use()
```

Here is the finished `Sources/main.swift` file.

```swift
import Kitura
import HeliumLogger

HeliumLogger.use()

let router = Router()

router.get("/") {
    request, response, next in
    response.send("Hello, World!")
    next()
}

Kitura.addHTTPServer(onPort: 8090, with: router)
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

