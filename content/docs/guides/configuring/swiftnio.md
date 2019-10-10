---
path: "/docs/configuring/swiftnio"
title: Enabling SwiftNIO
---

# Enabling SwiftNIO

[SwiftNIO](https://github.com/apple/swift-nio)  is a cross-platform, asynchronous, event-driven networking framework for building network servers and clients in Swift. Since Kitura 2.5 you have the option of running your Kitura application using SwiftNIO instead of the [Kitura-net](https://github.com/IBM-Swift/Kitura-net) and [BlueSocket](https://github.com/IBM-Swift/BlueSocket) libraries which Kitura has traditionally been based upon. This support is enabled through the [Kitura-NIO](https://github.com/IBM-Swift/Kitura-NIO) package.

Kitura-NIO has been designed to be API-compatible with the current Kitura-net API, though the underlying implementation uses SwiftNIO.

The major reason behind the decision to keep the API compatible with Kitura-net was API stability. We wanted Kitura users to be able to use Kitura-NIO, without needing to make any code changes to their Kitura applications.

Kitura-NIO fully supports HTTP and HTTPS, both servers and clients. It also has IPv6 support. A SwiftNIO based implementation of Kitura-WebSocket ([Kitura-WebSocket-NIO](https://github.com/IBM-Swift/Kitura-WebSocket-NIO)) was released in April 2019, as part of [Kitura 2.7](https://developer.ibm.com/swift/2019/04/17/announcing-kitura-2-7-and-more/).

It is our intent to make Kitura-NIO the default networking stack in a future release of Kitura.

---

## Using Kitura-NIO

With Kitura 2.5 and future releases, to run on top of Kitura-NIO (instead of the current default Kitura-net) all you need to do is set an environment variable called `KITURA_NIO` before building your Kitura application:
```
export KITURA_NIO=1 && swift build
```
Note, there is no need to set anything at runtime, choosing your underlying networking can only be done when you build your application.

If you have already built your Kitura application using Kitura-net and want to switch to using `KITURA_NIO`, you need to update the package before building:
```
export KITURA_NIO=1 && swift package update && swift build
```
Using the environment variable we make sure that only one out of Kitura-NIO and Kitura-Net is linked into your application's binary.

Please note that though Kitura-NIO has its own GitHub repository, the package name is KituraNet. This is because Kitura-NIO and Kitura-net are expected to provide identical APIs, therefore it makes sense if they share the package name too.

---

## Using Kitura WebSocket NIO

[Kitura WebSocket NIO](https://github.com/IBM-Swift/Kitura-WebSocket-NIO) and [Kitura WebSocket](https://github.com/IBM-Swift/Kitura-WebSocket) have separate GitHub repositories, but an identical API. The underlying code, however is different in how it functions, so it is often helpful to include this snippet of code in your `Package.swift` file so that the correct package is used:
```swift
// Use alternate implementation of Kitura-WebSocket while building in NIO mode
if ProcessInfo.processInfo.environment["KITURA_NIO"] != nil {
    dependencies.append(.package(url:  "https://github.com/IBM-Swift/Kitura-WebSocket-NIO.git", from: "2.0.0"))
} else {
    dependencies.append(.package(url: "https://github.com/IBM-Swift/Kitura-WebSocket.git", from: "2.0.0"))
}
```
