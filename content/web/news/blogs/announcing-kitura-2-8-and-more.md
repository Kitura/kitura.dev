---
title: Announcing Kitura 2.8 and more
blurb: We’re excited to announce the release of Kitura 2.8, alongside a number of other releases and improvements to the Kitura ecosystem.
date: "2019-08-11"
author: David Jones
path: /blogs/announcing-kitura-2-8-and-more
---

We’re excited to announce the release of Kitura 2.8, alongside a number of other releases and improvements to the Kitura ecosystem.

##Kitura 2.8

Kitura 2.8 adds compatibility with Swift 5.1, and comes with a range of improvements and bug fixes, many of which are community requests and contributions. You can find full information in the [GitHub release notes](https://github.com/Kitura/Kitura/releases/tag/2.8.0).

###Logging with swift-log

[In a previous article](/blogs/using-swift-log-with-kitura), we described how LoggerAPI can be set up to direct Kitura’s logging output to swift-log. With Kitura 2.8, a new convenience function `Kitura.logTo(myLogger)` makes it easy to direct all of Kitura’s log output to swift-log, without needing to import (or declare a dependency on) the LoggerAPI package in your code.

HeliumLogger can now be used as a [`LogHandler` logging backend for swift-log](https://github.com/Kitura/HeliumLogger/pull/73).

###Improvements to server startup and listening

You can now [detect failure when starting a Kitura server](https://github.com/Kitura/Kitura/pull/1430) through the process exit code – for example, when the server’s port is already in use. By default, `Kitura.run()` will now terminate the process with a non-zero status in the event that a server fails to start. To handle failure yourself, a new API `Kitura.startWithStatus() -> Int` has been introduced, which returns the number of servers that failed to start.

[Listening on a specific address](https://github.com/Kitura/Kitura/pull/1453) is now possible – an optional `onAddress: String` parameter has been added to `Kitura.addHTTPServer`. This allows a Kitura server to be exposed only on a specific network – for example, localhost – rather than listening on all adapters.

###Easy cookies

We’ve also made it [easier to add cookies to a response](https://github.com/Kitura/Kitura/pull/1468), by including a convenience response.addCookie() function. This removes a lot of the boilerplate code otherwise required to work with Foundation’s HTTPCookie type:

```swift
router.get("/bakery") {request, response, next in
    response.status(HTTPStatusCode.OK)
    response.addCookie(name: "variant", value: "gluten-free", domain: "my.biz", path: "/", otherAttributes: [.isSecure(true)])
    next()
}
```

###Single-page applications

[Support for single-page applications](https://github.com/Kitura/Kitura/pull/1464) has been added. `StaticFileServer` can now be configured to serve a default file (for example, /`index.html`) if the requested path is not found.

---

##New features in the Kitura ecosystem

Beyond these core Kitura improvements, we’d like to highlight some other new features we’ve been working on:

###JWT Authentication

Use of JSON web tokens for authentication has become increasingly popular – we recently released `Kitura-CredentialsJWT` which enables JWT authentication for Codable routes, and have added support for supplying JWT authentication tokens in `KituraKit`.

Read more in: [JWT authentication using KituraKit](/blogs/jwt-authentication-using-kiturakit).

###Event Streams support with SwiftKafka

We recently released SwiftKafka, a Swift package for producing and consuming events from an Apache Kafka platform. SwiftKafka is a standalone library and does not require Kitura, but they work well together!

Read more in: [Introducing SwiftKafka: Accessing Event Streams in Swift](/blogs/swift-kafka-event-streams)

###Documentation

The “Learn” section of [kitura.io](http://kitura.io) has been updated with:

- Improved walkthrough of building your project using Docker([kitura.io#388](https://github.com/Kitura/kitura.io/pull/388))
- Improved guides for deploying to Kubernetes or CloudFoundry ([kitura.io#386](https://github.com/Kitura/kitura.io/pull/386), [kitura.io#392](https://github.com/Kitura/kitura.io/pull/392))
- New guide for building your Kitura project with Swift-NIO ([kitura.io#400](https://github.com/Kitura/kitura.io/pull/400))
