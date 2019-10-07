---
path: "/docs/getting-started/hello-world"
title: Create a simple Hello World application
---

#Create a simple Hello World application

This quick tutorial will take you through creating a simple Hello World example with Kitura.

---

##Step 1: Create project

First create a directory for our project, which will also serve as the project's name:

```
mkdir HelloKitura && cd HelloKitura
```

Initialize the directory as a Swift project:

```
swift package init --type executable
```

Swift Package Manager (SPM) creates a Swift project stub. All we need to do is add our project dependencies, like Kitura, to the project.

---

##Step 2: Add Kitura to our dependencies

To add Kitura to our dependencies we need to edit the `Package.swift` file.

Open `Package.swift` in your default text editor:

```
open Package.swift
```

Add Kitura to our dependencies so the `Package.swift` file looks like this:

```swift
// swift-tools-version:5.0
import PackageDescription

let package = Package(
    name: "HelloKitura",
    dependencies: [
        .package(url: "https://github.com/IBM-Swift/Kitura", from: "2.7.0")
    ],
    targets: [
        .target(
            name: "HelloKitura",
            dependencies: ["Kitura"]),
        .testTarget(
            name: "HelloKituraTests",
            dependencies: ["HelloKitura"]),
    ]
)
```

Now we can build the project to pull down our new dependency:

```
swift build
```

---

##Step 3: Add the server code

Open `main.swift` in our text editor:

```
open Sources/HelloKitura/main.swift
```

Replace the contents of the file with the following code:

```swift
import Kitura

let router = Router()

router.get("/") { request, response, next in
    response.send("Hello world!")
    next()
}

Kitura.addHTTPServer(onPort: 8080, with: router)
Kitura.run()
```

The code above is the simplest Kitura application we can create. This application starts a server and listens on port 8080 for connections. The application responds with “Hello World!” when requests are made to the root URL (/).

---

##Step 4: Start the server

Run the project:

```
swift run
```

Open your web browser at http://localhost:8080.

You should see the following in your browser:

```
"Hello, World!"
```

Congratulations! You have just created your first server-side Swift application using Kitura.

---

##Next steps

In this simple Kitura application all of our Swift code is contained in a single `main.swift` file.

In practice it's preferable to structure your project code in more than one file. To generate scaffolding for a more complex application checkout our [Create a Server](./create-server-cli) Guide and then explore our other guides!
