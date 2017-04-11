---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Parsing Requests
menu: resources
lang: en
redirect_from: "/resources/parsingrequests.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
  <h1>Parsing requests</h1>
  <p>Examples showing the different ways that data can be parsed in Kitura</p>
</div>

## Parsing URL Encoded Parameters

You can specify matching to a URL parameter by starting the path name with a "`:`". The name afterwards is the key to the parameter dictionary

```swift
router.get("/name/:name") { request, response, _ in
    let name = request.parameters["name"] ?? ""
    try response.send("Hello \(name)").end()
}
```
This will match to `/name/Bob`, `/name/Joe` but not `/name`

---

## Parsing Query Parameters

You can access query parameters through the `queryParameters` dictionary in `RouterRequest`

```swift
router.get("/name") { request, response, _ in
    let name = request.queryParameters["name"] ?? ""
    try response.send("Hello \(name)").end()
}
```

In this example, if the incoming URL `/name?name=Dan`, then the output will be "Hello Dan".

---

## Parsing String Posts

For post requests, the post body can be read as a string with the `readString` method.

```swift
router.post("/name") { request, response, _ in
    let name = try request.readString() ?? ""
    try response.send("Hello \(name)").end()
}
```

---

## Parsing JSON Posts

The built in body parsing middleware can parse a variety of body types including JSON.

<span class="arrow">&#8227;</span> To use JSON objects in your app, simply add `import SwiftyJSON` to the top of your files. `SwiftyJSON` is included in the `Kitura` package so you don't need to add it to your app's `Package.swift` file.

> ![warning]
> 
> Warning: If you have another version of `SwiftyJSON` in your app, either from a different repository or a different version from the one specified in your app's `Packages/Kitura-x.x.x/Package.swift` file, remove it and use the version of `SwiftyJSON` as specified in `Packages/Kitura-x.x.x/Package.swift`. Otherwise, Swift Package Manager will give errors when you try install your package dependencies.

<span class="arrow">&#8227;</span> Specify that the body parser should be run on all paths starting with `/name`

```swift
router.all("/name", middleware: BodyParser())
```

<span class="arrow">&#8227;</span> Specify your path, retrieving the parsed body from the body property.

```swift
router.post("/name") { request, response, next in
    guard let parsedBody = request.body else {
        next()
        return
    }

    switch(parsedBody) {
    case .json(let jsonBody):
            let name = jsonBody["name"].string ?? ""
            try response.send("Hello \(name)").end()
    default:
        break
    }
    next()
}
```

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
