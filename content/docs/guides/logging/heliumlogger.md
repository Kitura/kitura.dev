---
path: "/docs/logging/helium-logger"
title: HeliumLogger
---

#HeliumLogger

[Helium Logger](https://github.com/IBM-Swift/HeliumLogger) is a lightweight Swift logging framework which supports logging to standard output.

In this guide we are going to show you how to add Helium Logger to a Kitura server, log messages using the logger and set the level of logging that should be displayed.

> If you don't have a Kitura server, follow our [Create a server](../getting-started/create-server-cli) guide.

---

##Step 1: Add HeliumLogger to the project

If you created your server using the CLI or the macOS app, your project will have HeliumLogger by default. In this case, we can skip to step 3.

Otherwise, we need to [add HeliumLogger to our dependencies](https://github.com/IBM-Swift/HeliumLogger#add-dependencies).

We then need to import `LoggerAPI` and `HeliumLogger` inside our project.

Open your `main.swift` file:

```
open Sources/MyKituraApp/main.swift
```

At the top of the file, add `LoggerAPI` and `HeliumLogger` to our import statements:

```swift
import LoggerAPI
import HeliumLogger
```

> LoggerAPI is a logger protocol that provides a common logging interface for different kinds of loggers. HeliumLogger has LoggerAPI included as a dependency, so we do not need to add this to our `Package.swift` file.

---

##Step 2: Add logging code to the server

To use the default settings for HeliumLogger we just need to call the `use()` method in HeliumLogger.

Inside your `main.swift` add:

```swift
HeliumLogger.use()
```

We are going to use our new logger to log errors thrown by our server.

Inside the catch block, log the thrown error:

```swift
Log.error(error.localizedDescription)
```

Your `main.swift` should look like this:

```swift
import Foundation
import Kitura
import LoggerAPI
import HeliumLogger
import Application

HeliumLogger.use()
do {
    let app = try App()
    try app.run()
} catch let error {
    Log.error(error.localizedDescription)
}
```

Now if you start your server you should see some logging output. This should look something like:

```
[xxx] [VERBOSE] [Kitura.swift:118 run()] Starting Kitura framework...
[xxx] [VERBOSE] [Kitura.swift:135 start()] Starting an HTTP Server on port 8080...
[xxx] [INFO] [HTTPServer.swift:195 listen(on:)] Listening on port 8080
[xxx] [VERBOSE] [HTTPServer.swift:196 listen(on:)] Options for port 8080: maxPendingConnections: 100, allowPortReuse: false
```

---

##Step 3: Set logging level

HeliumLogger can be customized to change the level of logging.

This means you can decide how much information you'd like to be logged, based on importance.

If you'd like to customize the level of logging you can simply pass the level to the `use()` method.

Inside your `main.swift` file, set the logging level:

```swift
HeliumLogger.use(.debug)
```

There are several logging levels:

1. entry
2. exit
3. debug
4. verbose (default)
5. info
6. warning
7. error

Verbose is set by default. Setting a particular logging level also includes all levels below that.

For example, if you set a logging level of `verbose`:

```swift
HeliumLogger.use(.verbose)
```

You will get logging for; `verbose`, `info`, `warning` and `error`.

Similarly if you set a logging level of `warning`:

```swift
HeliumLogger.use(.warning)
```

You will get logging for `warning` and `error`.

---

##Step 4: Add logging to your application

Once you have your Logger configured, you can use it within your application.

Open your `Application.swift` file:

```
open Sources/Application/Application.swift
```

Ensure LoggerAPI is imported:

```swift
import LoggerAPI
```

Add a log message to the App's `init()` function:

```swift
Log.info("Hello World")
```

Restart your server and look through the logs. You should see your message:

```
[2019-03-13T16:23:08.078Z] [INFO] [Application.swift:22 init()] Hello World
```

Your log message is printed along with the time it occurred, the log level and the location in your code.

##Next steps

[Routing](../routing/what-is-routing): Learn about routing and the two types Kitura supports.
