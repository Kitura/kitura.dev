---
title: Announcing Kitura 2.4
blurb: We’re very pleased to announce the release of Kitura 2.4, the latest update to the Kitura web framework
date: "2018-08-01"
author: Ian Partridge
path: /blogs/announcing-kitura-2-4
---

We’re very pleased to announce the release of Kitura 2.4, the latest update to the Kitura web framework. Kitura 2.4 brings full support for Swift 4.2, plus a large number of new features and enhancements.

##Type-safe middlewares

Kitura 2.0 introduced Codable routing, a powerful way to quickly build REST APIs from the Swift datatypes you already have in your application. Kitura 2.1, 2.2, and 2.3 enhanced Codable routing further, bringing features like Codable support for URL query parameters and URL-encoded HTML forms.

Now in Kitura 2.4 you can write a new kind of middleware and associate it with your Codable routes. We’re providing support for type-safe Sessions and Authentication for you, but you can use type-safe middlewares for anything you want.

--- 

##Swagger support

Swagger, also known as OpenAPI, is the most popular way to document RESTful web services. The Swagger ecosystem provides a broad range of tools and services for developers across the API lifecycle.

For a long time, the Kitura server generator enabled developers to generate a Kitura application from a provided Swagger document.

Now, Kitura has native support for generating a Swagger document from the currently running application, and a new Kitura-OpenAPI package makes adding a Swagger endpoint and SwaggerUI to your application one line of code.

---

##Kitura on SwiftNIO

SwiftNIO is a new framework for writing high-performance network applications in Swift. Kitura 2.4 brings experimental support for running Kitura on SwiftNIO, including support for both Linux and macOS. We invite the community to explore this new technology and give us feedback.

---

##Type-safe templating

Web applications are an important use-case for Kitura, and in Kitura 2.4 we’ve enhanced our templating APIs so they support easy rendering of Codable structures. Many thanks go to Steven van Impe from the Kitura community who contributed valuable ideas and code to this new feature.

---

##Other features…

Kitura 2.4 also comes with a slew of other minor improvements and fixes, including:

###Easily decode query parameters in raw routes (#1215)

A new request.getQueryParameters() function allows Kitura users to easily decode incoming query parameters to a Codable QueryParams structure.

###Decode comma-separated query parameters (#1238)

A new request.queryParametersMultiValues property for decoding comma-separated query parameters into an array of strings automatically.

###Extra Codable routing API (#1253)

Previously it was not possible to return a single Codable object from a Codable GET route with query parameters. We’ve added this extra API so it’s now possible, as this pattern was observed in some existing REST APIs.

###userInfo in RouterResponse (#1259)

For a long time we’ve provided a public dictionary in RouterRequest to allow Kitura users to stash arbitrary user data. Now we also provide this on RouterResponse, to provide API symmetry and help those users who write extensions on RouterResponse.

###asRaw property on ParsedBody (#1258)

Now you can decode body data as a `Data?` easily via a new `asRaw` property. This provides nice symmetry with the existing `asJSON` and `asURLEncoded` properties.


