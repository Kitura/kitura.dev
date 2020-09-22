---
title: Announcing Kitura 2.9, SwiftyRequest 3.0 and KituraKit 1.0
blurb: We’re excited to announce the release of Kitura 2.9, alongside a number of other releases and improvements to the Kitura ecosystem.
date: "2019-10-10"
author: David Jones
path: /blogs/announcing-kitura-2-9
---

We're pleased to announce the latest release of Kitura, as well as a new major version of the SwiftyRequest HTTP client. KituraKit, which is built on top of SwiftyRequest, has now been released at version 1.0.  Read on for some highlights for each of these releases:

## Kitura 2.9

You can check out the [release notes for Kitura 2.9](https://github.com/Kitura/Kitura/releases/tag/2.9.0) on GitHub. Features of this release are:

### Allow customization of the SwaggerDocument ([#1483](https://github.com/Kitura/Kitura/pull/1483))

The OpenAPI document's title, description and version properties can now be specified:
```swift
let customDocument = SwaggerDocument(title: "My Service", description: "A description", version: "1.0")
let router = Router(apiDocument: customDocument)
```

### Ability to limit request size and connection count ([#1481](https://github.com/Kitura/Kitura/pull/1481))

A Kitura server can now be configured to limit the number of concurrent connections it will accept, and to reject requests whose request body exceeds a certain size.  By default, 10,000 connections are permitted and a request body size of 100mb.  These values can be adjusted upon registering a server:
```swift
let options = ServerOptions(requestSizeLimit: 1024, connectionLimit: 10)
Kitura.addHTTPServer(onPort: port, with: router, options: options)
```

See the [`ServerOptions`](http://ibm-swift.github.io/Kitura-net/Structs/ServerOptions.html) documentation for more information.

## SwiftyRequest 3.0

SwiftyRequest provides a high-level HTTP client for making requests from your Swift application. This release represents a major re-working of the library to use swift-nio, via the async-http-client project currently under development by the Swift Server Working Group.

An advantage of adopting swift-nio is that SwiftyRequest can now support client certificates (2-way SSL). To learn more about this feature, check out the [SwiftyRequest README](https://github.com/Kitura/SwiftyRequest/) and the documentation for [`ClientCertificate`](https://ibm-swift.github.io/SwiftyRequest/Structs/ClientCertificate.html).

Although there are a number of API changes in this release, much of the previous SwiftyRequest API has been preserved, to reduce the work required to migrate.

## KituraKit 1.0

KituraKit is a client-side library designed to mirror Kitura's Codable Routing API. KituraKit uses SwiftyRequest under the covers, and the 1.0 release provides some improvements such as better error reporting for cases where the server's response does not match the expected structure (a decoding error).

A [new KituraKit guide](/docs/client/iOSClient) has been added to the kitura.io website demonstrating how KituraKit can be used to talk to a Kitura service.
