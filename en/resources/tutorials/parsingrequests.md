---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Parsing Requests
menu: resources
lang: en
redirect_from: "/resources/tutorial-todo.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

Below are examples showing the different ways that data can be parsed in Kitura.

### Parsing URL Encoded Parameters

You can specify matching to a URL parameter by starting the path name with a ":". The name afterwards is the key to the parameter dictionary

```swift
router.get("/name/:name") { request, response, _ in
    let name = request.parameters["name"] ?? ""
    try response.send("Hello \(name)").end()
}
```
This will match to `/name/Bob`, `/name/Joe` but not `/name`

### Parsing Query Parameters

You can access query parameters through the `queryParameters` dictionary in `RouterRequest`

```swift
router.get("/name") { request, response, _ in
    let name = request.queryParameters["name"] ?? ""
    try response.send("Hello \(name)").end()
}
```

In this example, if the incoming URL `/name?name=Dan`, then the output will be "Hello Dan".

### Parsing String Posts

For post requests, the post body can be read as a string with the `readString` method.

```swift
router.post("/name") { request, response, _ in
    let name = try request.readString() ?? ""
    try response.send("Hello \(name)").end()
}
```

### Parsing JSON Posts

The built in body parsing middleware can parse a variety of body types including JSON.

1. Import SwiftyJSON by adding it to your `Package.swift` file and by adding `import SwiftyJSON` to the top of your file.

2. Specify that the body parser should be run on all paths starting with `/name`

```swift
router.all("/name", middleware: BodyParser())
```
  
3. Specify your path, retrieving the parsed body from the body property.

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

