---
title: End-to-end Kitura testing with OpenAPI
blurb: Kitura 2.4 now includes a feature that allows you to view the OpenAPI specification of your Kitura application
date: "2018-06-05"
author: Neil Hardman
path: /blogs/kitura-openapi
---

OpenAPI is the most popular way to document RESTful APIs. It allows developers to define interface specifications in a structured machine readable format. These specifications can be both generated and consumed by tools that help in the building of verifiable interfaces. It can make development faster too!

Kitura 2.4 now includes a feature that allows you to view the OpenAPI specification of your Kitura application. Kitura can expose an OpenAPI document that describes the application interfaces that are defined in your application as Codable routes. Change your application, recompile, and the OpenAPI document will reflect those changes!

At first this might not seem that exciting, however, integrate it with some extra tooling and this can turn into a powerful development tool.

So how do you see this OpenAPI document? First, there are a few steps needed to integrate OpenAPI tooling into your application…

- import KituraOpenAPI into your application:

```swift
import KituraOpenAPI
```

- Add a call to add API endpoints from the router into KituraOpenAPI. The call should go in your application startup code – perhaps your init() method:

```swift
public init() throws {
    KituraOpenAPI.addEndpoints(to: router)
}
```

- Add Kitura-OpenAPI.git as a dependency in your Package.swift:

```swift
.package(url: "https://github.com/IBM-Swift/Kitura-OpenAPI.git", from: "1.0.0"),
```

- Then update your dependencies by running swift package update.

Now go ahead, recompile and restart the application and you should be able to view the OpenAPI document by visiting the openapi page: http://localhost:8080/openapi

That is good, however it gets much better if you visit the SwaggerUI page: http://localhost:8080/openapi/ui as this will present an API Explorer that is populated from the OpenAPI document, so it shows the routes you have configured in the currently running application.

One click on a route will expand it so you can see what arguments it takes, what results it can return and a status code, but better still, you can click the “Try it out!” button to exercise that API immediately.