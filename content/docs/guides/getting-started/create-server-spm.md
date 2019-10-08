---
path: "/docs/getting-started/create-server-spm"
title: Create a Kitura server using SPM
---

# Create a server with Swift Package Manager

The Swift Package Manager (SPM) is installed as part of Swift by default. In this guide we will use SPM to create a Kitura project from scratch.

---

## Step 1: Create project

To work with Swift Package Manager (SPM) we need to use the command line.

>If you're new to this simply open the Terminal (on macOS or Linux) to get started.

Create a directory for our project:
```
mkdir MyKituraApp && cd MyKituraApp
```

>The name of the directory will also be the name of the generated project.

Initialize the directory as a Swift project:
```
swift package init --type executable
```

SPM creates a Swift project stub. All we need to do is add our project dependencies, like Kitura, to the project.

---

## Step 2: Create the Application directory

Within our `Sources` directory we will first create an `Application` directory:
```
mkdir Sources/Application
```

This is the directory where we will store all of our application code. Note, code in the project's `main.swift` file isn't easy to test because you can't import an executable target as a module, so to encourage the creation of easily testable code we have minimal code in our `main.swift` file and recommend putting application code into a separate `Application` directory.

Next we will create our `Application.swift` file:
```
touch Sources/Application/Application.swift
```

Next we need to create our `Routes` directory:
```
mkdir Sources/Application/Routes
```

This is where we will store all of our route handlers.

Next we will rename the directory within `Tests` to `ApplicationTests`:
```
mv Tests/MyKituraAppTests/ Tests/ApplicationTests
```

---

## Step 3: Add Kitura to our dependencies

To add Kitura to our dependencies we need to edit the `Package.swift` file.

Open `Package.swift` in your default text editor:
```
open Package.swift
```

Add Kitura to our dependencies so the `Package.swift` file looks like this:
```swift
// swift-tools-version:x.x
import PackageDescription

let package = Package(
    name: "MyKituraApp",
    dependencies: [
        .package(url: "https://github.com/IBM-Swift/Kitura", from: "y.y.y")
    ],
    targets: [
        .target(name: "MyKituraApp", dependencies: [ .target(name: "Application"), "Kitura"]),
        .target(name: "Application", dependencies: [ "Kitura" ]),

        .testTarget(name: "ApplicationTests" , dependencies: [.target(name: "Application"), "Kitura" ])
    ]
)
```

Substitute "y.y.y" with the latest Kitura [release](https://github.com/IBM-Swift/Kitura/releases) and "x.x" with the minimum version of Swift required to build the package (e.g. 4.0, 4.2, 5.0).

---

## Step 4: Add code to the Application.swift file

Earlier, we created the `Application.swift` file but we didn't add any code to it.

Open the `Application.swift` file in our default text editor:
```
open Sources/Application/Application.swift
```

The `Application.swift` file will be responsible for starting our Kitura server.

Add the following code to the `Application.swift` file:
```swift
import Kitura

public class App {

    let router = Router()

    public init() throws {

    }

    func postInit() throws {

    }

    public func run() throws {
        try postInit()
        Kitura.addHTTPServer(onPort: 8080, with: router)
        Kitura.run()
    }
}
```

This code creates an instance of Router, which will route incoming requests to the correct endpoints. Within the `run()` method we register our `router` instance to run on port 8080\. The call to `Kitura.run()` does not return immediately - it will block until the server is stopped.

The `postInit()` function is where we configure and set up the router, prior to starting the server.

---

## Step 5: Add code to the main.swift file

Now that we have created our `App` class in our `Application.swift` file we can use it within our `main.swift` file.

Open the `main.swift` file in your editor:
```
open Sources/MyKituraApp/main.swift
```

Replace the existing code with the following:
```swift
import Application

do {
    let app = try App()
    try app.run()
} catch let error {
    print(error.localizedDescription)
}
```
This code will create an `App` instance and run it.

---

## Step 6: Start the server

To start our project we need to run our Swift executable:
```
swift run
```

>To run the project in Xcode ensure your build target is set to `My Mac` then simply run the project.  You may be prompted to allow the app to accept incoming connections.

Navigate to <a href="http://localhost:8080" target="blank">localhost:8080</a>.

You should be able to see the Kitura landing page.

## Project Structure

We have just created a Kitura project with the following structure:

```
MyKituraApp
├── Package.swift
├── Sources/
│    ├── MyKituraApp/
│    │    └── main.swift
│    ├── Application/
│    │    └── Application.swift
│    └── Routes/
└── Tests/
     └── ApplicationTests/
```

*   Package.swift – defines packages that your app depends on and their versions
*   main.swift - the file that is run to initialize your app and start your server
*   Application.swift - the application that glues everything together
*   Routes/ - folder containing the routing logic for how to handle HTTP requests
*   ApplicationTests/ – folder containing the Swift tests for your project

This matches the structure generated by the Kitura command-line interface and will be used throughout the guides.

---

## Next steps

[Logging:](../logging/logging.html#) Learn how to add logging to your Kitura server.

[Routing:](../routing/routing.html#) Learn about routing and the two types Kitura supports.
