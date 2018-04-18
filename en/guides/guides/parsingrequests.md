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
  <p>Learn how to parse HTTP requests in Kitura</p>
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

    switch parsedBody {
    case .json(let jsonBody):
            let name = jsonBody["name"] as? String ?? ""
            try response.send("Hello \(name)").end()
    default:
        break
    }
    next()
}
```
<section class="social-section">
	<div class="social-link">
		<a rel="nofollow" href="http://swift-at-ibm-slack.mybluemix.net">
		<img src="https://developer.ibm.com/swift/wp-content/uploads/sites/69/2018/01/slack-150x150.png" alt="Slack Logo" width="60" height="60" class="social-image"/></a>
		<p class="social-header">Join the discussion on Slack</p>
	</div>
	<div  class="social-link">
		<iframe class="social-image" src="https://ghbtns.com/github-btn.html?user=IBM-Swift&amp;repo=Kitura&amp;type=star&amp;count=true&amp;size=large" frameborder="0" scrolling="0" width="150px" height="30px"></iframe>
		<p class="social-header">Star Kitura on GitHub</p>
	</div>
</section>
[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
