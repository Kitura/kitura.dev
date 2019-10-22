---
title: Introducing Kitura-NIO
blurb: Kitura-NIO has been designed to be API-compatible with current Kitura-net API, though the underlying implementation uses SwiftNIO
date: "2018-05-31"
author: Pushkar Kulkarni
path: /blogs/introducing-kitura-nio
---

In February 2018, at the try! Swift Tokyo conference, [Apple announced SwiftNIO](https://www.youtube.com/watch?v=QJ3WG9kRLMo) — a new cross-platform, asynchronous, event-driven networking framework for building servers and clients in Swift. [SwiftNIO](https://github.com/apple/swift-nio) has the potential to provide all the low-level socket-handling and HTTP protocol support in Kitura, and hence could be a replacement for the current Kitura-net and BlueSocket libraries which underpin Kitura today. The Kitura team have been working on [Kitura-NIO](https://github.com/IBM-Swift/Kitura-NIO), a Kitura interface to SwiftNIO and we think now is a good time to release it for wider experimentation, testing and feedback.

Kitura-NIO has been designed to be API-compatible with current Kitura-net API, though the underlying implementation uses SwiftNIO. As a consequence, Kitura itself needs very few changes to run on top of Kitura-NIO. These changes are available in the new [kitura-nio](https://github.com/IBM-Swift/Kitura/tree/kitura-nio) and [kitura-2.4-nio](https://github.com/IBM-Swift/Kitura/tree/kitura-2.4-nio) branches. To use Kitura with Kitura-NIO, users just need to point to one of these branches from their application’s Package.swift and rebuild their Kitura application:

```swift
dependencies: [
   //other dependencies
   .package(url: "https://github.com/IBM-Swift/Kitura"), .branch("kitura-nio")),
]
```

These new branches will be updated and rebased regularly. If you have existing Kitura applications, Kitura-NIO is likely to provide all that your application needs, barring the FastCGI protocol implementation which we believe is not widely used. We urge you to test your applications’ functionality and performance and we will be happy to receive feedback — pull requests, bug reports, performance comparison reports, enhancement requests or anything else. We’re available on [Slack](http://swift-at-ibm-slack.mybluemix.net/?cm_sp=dw-bluemix-_-swift-_-devcenter&_ga=2.151948217.186671014.1570626561-1743126121.1570022962) or you can open an issue at the [Kitura-NIO](https://github.com/IBM-Swift/Kitura-NIO) GitHub repository.

Kitura-NIO fully supports HTTP and HTTPS, both servers and clients. It also has IPv6 support. A NIO based implementation of Kitura-WebSocket is also on its way. Kitura-NIO is currently supported with Swift 4.1 and 4.2 on Ubuntu 14.04, Ubuntu 16.04 and macOS.

The major reason behind the decision to keep the API compatible with Kitura-net was API stability. We wanted Kitura users to experiment with Kitura-NIO, with zero code changes to their Kitura applications.

Performance analysis of Kitura-NIO is work-in-progress. We’ve identified a few bottlenecks and implemented some performance improvements already. Translating between the Kitura-net types and the SwiftNIO types does incur a cost. In future, we may want to eliminate this cost by exposing NIO types (or opaque wrappers of them) directly to Kitura users. This may require API changes, but it could be the path to better performance. However, we also know that Kitura users strongly value API stability, backward compatibility and ease of migration. So, we have an interesting trade-off problem at hand and we’d like to solve it in a way that best suits Kitura’s users. We would love to hear your opinion on this.

This blog post would be incomplete without thanking the SwiftNIO team — especially [@johannesweiss](https://twitter.com/johannesweiss) and [@Lukasaoz](https://twitter.com/Lukasaoz). The team has been approachable, extremely helpful and amazingly quick with our questions and bug reports!
