---
title: Using swift-log with Kitura
blurb: With the release of Kitura’s LoggerAPI 1.9, you can now easily direct your log messages to a swift-log logging backend
date: "2019-06-12"
author: David Jones
path: /blogs/using-swift-log-with-kitura
---

swift-log is a new logging API package for Swift, developed by the Swift Server Working Group. It aims to provide a consistent and standardised logging solution across the server-side Swift ecosystem.

With the release of Kitura’s LoggerAPI 1.9, you can now easily direct your log messages to a swift-log logging backend.

In addition, the upcoming Kitura 2.8 release will allow you to configure Kitura to log via swift-log with a single line of code:

```swift
Kitura.logTo(mySwiftLogger)
```

##Why use a logging API?

When writing an application, you may wish to generate messages – to aid debugging, to record normal program flow, or audit user input. Some of those messages may be relevant in different contexts – while developing, you may want as much information as possible to understand how your code behaves, whereas in production, that would be too much noise – you want only the important messages that tell you when something requires your attention. In addition, producing messages affects performance.

Logging APIs decouple the production of log messages from their output. They allow code to emit messages at different levels: warnings and errors for important messages, and debug for understanding program execution. Which messages are output and their destination (stdout, database, file) can be configured independently, by the application author or during deployment. This means that an application does not need to be recompiled to toggle logging, or change the logging level. In addition, if all code uses the same logging API, then all messages produced by the application and its dependencies can be sent to a single destination.

By configuring Kitura and your existing code that uses LoggerAPI to output to swift-log, you can take advantage of swift-log in your own code, combine with other dependencies that adopt swift-log, all logging to the same destination.

---

##Configuring LoggerAPI with swift-log

To direct your existing LoggerAPI log statements to swift-log, you need only set the Log.swiftLogger property:

```swift
import Logging
import LoggerAPI
 
var mySwiftLogger = Logger(label: "my-swift-logger")
mySwiftLogger.logLevel = .info
 
Log.swiftLogger = mySwiftLogger
```

Note that there are some minor differences in the hierarchy of logging levels defined by LoggerAPI and swift-log. See the LoggerAPI documentation Log.isLogging() for details of how log levels are mapped.

##How does swift-log compare to LoggerAPI?

Both LoggerAPI and swift-log provide a means to decouple log message production from the logging implementation (backend). In both cases, the producer (your own code, or one of your dependencies) calls a logging API function indicating the logging level and the message content. And in both cases, the application author decides what level of log messages should be logged, and where the log messages should be sent.

There are some differences in the architecture, however: LoggerAPI provides a global Log type that can be invoked from anywhere in your code, and from any thread. Swift-log provides a local Logger with instance functions for logging, and this must be passed around or stored as a property. LoggerAPI effectively allows you to store an instance globally, and internally uses locks to provide thread-safe access to these global loggers.

There are pro’s and con’s to each approach, which are nicely summarised in the thread for the swift-log pitch on the Swift Forums.

If you wish to use swift-log throughout your application, you can configure Kitura to log to it, but then use your own swift-log Logger instances to perform logging. Because the logging backend configuration is global, all log messages will be emitted to the same destination.

