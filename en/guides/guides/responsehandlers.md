---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Response Handlers
menu: resources
lang: en
redirect_from: "/resources/responsehandlers.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png

<div class="titleBlock">
	<h1>Response Handlers</h1>
	<p>Kitura allows a variety of ways to specify handlers in order to express complex behavior</p>
</div>

## Multi-handlers

Responses can accept multiple handlers allowing logic to be broken up into sections.

```swift
router.get("foo", handler: { request, response, next in
    if request.queryParameters["bar"] == nil {
        response.error = NSError(domain: "RouterTestDomain", code: 1, userInfo: [:])
    }
    next()
}, { request, response, next in
    // Only gets called if no error
})
```

---

## Multi-HTTP Verbs

Multiple HTTP verbs can be specified for one path using the `route` method.

```swift
router.route("foo")
.get() { request, response, next in
    // Get logic here
}
.post() { request, response, next in
    // Post logic here
}
```

---

## Sub-routers

A large router can be broken up into sub-routers and be mounted under a path prefix. These sub-routers can even be placed in separate files.

```swift
let subrouter = Router()
subrouter.get("/") { _, response, _ in
    try response.send("Hello from subsection").end()
}

subrouter.get("/about") {_, response, _ in
    try response.send("About the subsection").end()
}

let mainRouter = Router()
mainRouter.get("/") {_, response, _ in
    try response.send("Welcome").end()
}
mainRouter.all("sub", middleware: subrouter)

// Add HTTP Server to listen on port 8080
Kitura.addHTTPServer(onPort: 8080, with: mainRouter)

// start the framework - the servers added until now will start listening
Kitura.run()
```
A GET request to localhost:8080 will return "Welcome" and a request to localhost:8080/sub will return "Hello from subsection"

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
