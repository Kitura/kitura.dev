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

<div class="titleBlock">
	<h1>Getting Started</h1>
	<p>Let's develop your first Kitura web application!</p>
</div>

<span class="arrow">&#8227;</span> First, create a new project directory:

```
$ mkdir myFirstProject
```

---
<span class="arrow">&#8227;</span> Next, create a new Swift project using the Swift Package Manager.

```
$ cd myFirstProject
$ swift package init --type executable
```

---
<span class="arrow">&#8227;</span> Now your directory structure under `myFirstProject` should look like this:

<pre>
myFirstProject
├── Package.swift
├── Sources
│   └── main.swift
└── Tests
</pre>

> ![info] For more information on the Swift Package Manager, visit [swift.org](https://swift.org/package-manager).

---
<span class="arrow">&#8227;</span> In `Package.swift`, add Kitura as a dependency for your project.

```swift
import PackageDescription

let package = Package(
    name: "myFirstProject",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 1, minor: 7)
    ])
```

---
<span class="arrow">&#8227;</span> In `Sources/main.swift`, add the following code.

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
Kitura.addHTTPServer(onPort: 8080, with: router)

// Start the Kitura runloop (this call never returns)
Kitura.run()
```

---
<span class="arrow">&#8227;</span> Compile your application:

```
$ swift build
```

---
<span class="arrow">&#8227;</span> Now run your new web application:

```
$ .build/debug/myFirstProject
```
---
<span class="arrow">&#8227;</span> Open your browser at [http://localhost:8080](http://localhost:8080)

---

## Specify a version of Swift (optional)

 In the code example above, the Swift application will build with the version from in the local toolchain. Using a `.swift-version` is a common convention to specify the version of Swift needed for your application.

---
<span class="arrow">&#8227;</span> Add a `.swift-version` file with the desired version or snapshot of Swift

```bash
echo "3.0.2" > .swift-version
```

---

## Add logging (optional)

 In the code example above no messages from Kitura will be logged to the console. You may want to add a logger to help diagnose any problems that occur.

---
<span class="arrow">&#8227;</span> Add a HeliumLogger dependency to `Package.swift`.

```swift
import PackageDescription

let package = Package(
    name: "myFirstProject",
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 1, minor: 7),
        .Package(url: "https://github.com/IBM-Swift/HeliumLogger.git", majorVersion: 1, minor: 7)
    ])
```
---
<span class="arrow">&#8227;</span> Enable HeliumLogger in `Sources/main.swift`.


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
Kitura.addHTTPServer(onPort: 8080, with: router)

// Start the Kitura runloop (this call never returns)
Kitura.run()
```
<hr>
## Next Steps

Learn how to [Deploy your Application to the Cloud](/{{ page.lang }}/starter/deploying.html).

[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png
