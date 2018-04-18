---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Writing Custom Paths
menu: resources
lang: en
redirect_from: "/resources/tutorials/pathsyntax.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png

<div class="titleBlock">
	<h1>Writing Custom Paths</h1>
</div>

When hooking up middleware and handlers to your Kitura server, you can customize your paths using Kitura's path syntax. This guide assumes familiarity with the concepts of Kitura app and route handler.

---

## Static Paths
The most basic of paths, static paths, are supported. Simply specify the path as it is when mounting your middleware or handler, like so:

```swift
// handler example
app.get("/test") { req, res, next in
    try res.send("Hello world").end()
}
```

In this case, the path `/test` will be matched for `/test` only.

---

## Paths with Parameter(s)
`Kitura` supports parameters in the path for use cases such as performing CRUD operations against an object. Simply tag the parameter using `:`, like so:

```swift
app.get("/:id") { req, res, next in
    let id = req.parameters["id"] ?? ""
    try res.send("Hello world to user \(id)").end()
}
```

In this case, the path `/:id` will be for `/123` as well as `/abc`. You can then access the `id` parameter's value via `req.parameters["id"]`.

---

## Parameter Modifiers

### <span class="arrow">&#8227;</span> Zero or One
You can specify that a parameter is optional by using the `?` operator, like so:

```swift
app.get("/:id?") { req, res, next in
    let id = req.parameters["id"] ?? ""
    try res.send("Hello world to user \(id)").end()
}
```

In this case, the path `/:id?` will be matched for both `/` and `/123`.

### <span class="arrow">&#8227;</span> Zero or Many
You can specify that a parameter should be matched zero times, or as many times as possible, by using the `*` operator, like so:

```swift
app.get("/:id*") { req, res, next in
    let id = req.parameters["id"] ?? ""
    try res.send("Hello world to user \(id)").end()
}
```

In this case, the path `/:id*` will be matched for `/`, `/123`, and `/abc/def/ghi`.

### <span class="arrow">&#8227;</span> One or Many
You can specify that a parameter should be matched one or more times by using the `+` operator, like so:

```swift
app.get("/:id+") { req, res, next in
    let id = req.parameters["id"] ?? ""
    try res.send("Hello world to user \(id)").end()
}
```

In this case, the path `/:id+` will be matched for `/123` and `/abc/def/ghi`, but not `/`.

### <span class="arrow">&#8227;</span> Custom Matching
In addition to modifying parameters, you can also use regular expressions to specify what kinds of URLs can be matched and captured as parameters. Simply enclose your regex in `()` and append it to the parameter name, like so:

```swift
app.get("/:id(\\d+)") { req, res, next in
    let id = req.parameters["id"] ?? ""
    try res.send("Hello world to user \(id)").end()
}
```

In this case, the path `/:id(\\d+)` specifies that only digits should be matched; this path will be matched for `/123`, but not `/` or `/abc`.

### <span class="arrow">&#8227;</span> Unnamed Parameters
You can use custom matching without naming a parameter, like so:

```swift
app.get("/(\\d+)") { req, res, next in
    let id = req.parameters["0"] ?? ""
    try res.send("Hello world to user \(id)").end()
}
```

In this case, the path `/(\\d+)` will be matched for `/123`, but not `/` or `/abc`. The matched parameter can then be referenced via its index; in this case, since this is the first unnamed parameter, its index is `0`.

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
