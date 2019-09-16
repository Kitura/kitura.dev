---
title: Raw and Codable support for URL Encoded Forms in Kitura 2.3
blurb: In Kitura 2.3 , we added support for receiving POST requests, which use the application/x-www-form-urlencoded content type
date: "2018-05-02"
author: Andrew Lees
path: /blogs/url-encoded-forms-kitura
---

In Kitura 2.3 , we added support for receiving POST requests, which use the application/x-www-form-urlencoded content type. This blog describes the new APIs to handle these URL encoded forms for both Raw and Codable routes. We then provide a step by step example of a Kitura server receiving an HTML form and mapping the request to a Codable Swift object.

##URL Encoded POST Forms

Typically, webpages use HTML forms to send POST requests. The sender marks the request as URL encoded using the content-type header application/x-www-form-urlencoded. This indicates that the request body is a query string consisting of “key=value” pairs, separated by the “&” symbol. As a result, Kitura can use its query decoder to map the body of a URL encoded form to a Swift object. For our demonstrations, we will use the following HTML form POST request:

```
POST / HTTP/1.1
Host: http://localhost:8080
Content-Type: application/x-www-form-urlencoded
Content-Length: 17

name=David&age=42
```

---

##Receiving URL Encoded Forms in Kitura Routes

With the release of Kitura 2.3, your Kitura application can now receive HTML form data in a convenient and type-safe way. As an example, we will map the POST request above to a Swift struct called User.

```swift
struct User: Codable {
    let name: String
    let age: Int
}
```

Previously, this would require the following boilerplate code:

```swift
router.post("/form", middleware: BodyParser())
  
router.post("/form") { request, response, next in
    guard let body = request.body?.asURLEncoded,
        let ageString = body["id"],
        let age = Int(ageString),
        let name = body["name"]
    else {
        return try response.status(.unprocessableEntity).end()
    }
    let user = User(name: name, age: age)
    // Application logic
    response.status(.created).send(json: user)
    next()
}
```

But in Kitura 2.3 you can use request.read(as: <Codable.protocol>) to decode URL encoded forms into a Codable type. This means that, while using Raw routing, we can vastly simplify the code above to:

```swift
router.post("/form") { request, response, next in
    guard let user = try? request.read(as: User.self)
    else {
        return try response.status(.unprocessableEntity).end()
    }
    // Application logic
    response.status(.created).send(json: user)
    next()
}
```

Furthermore, you can use URL encoded forms within Codable routes. This means that, you can receive the form, parse it to a Swift object and use it within your route just by declaring the expected Swift object in the route handler:

```swift
router.post("/form", handler: formHandler)
func formHandler(user: User, respondWith: (User?, RequestError?) -> Void) {
    // Application logic
    respondWith(user, nil)
}
```

---

##URL Encoded GET Forms

A webpage can also send an HTML form using a HTTP GET request. In this case, the form data is sent as query parameters on the end of the url. You can then map the received query parameters to a Swift object:

For Raw routes you can use QueryDecoder to decode the query parameters into your Codable Swift object.

```swift
router.get("/form") { request, response, next in
    guard let user = try? QueryDecoder(dictionary: request.queryParameters).decode(User.self)
    else {
        return try response.status(.unprocessableEntity).end()
    }
    // Application logic
    response.status(.created).send(json: user)
    next()
}
```

For Codable routes, you just need to define your Swift object as conforming to QueryParams:

```swift
struct User: Codable, QueryParams {
```

You can then use the object within your route by declaring it in the route handler:

```swift
router.get("/form", handler: getFormHandler)
func getFormHandler(user: User, respondWith: ([User]?, RequestError?) -> Void) {
    // Application logic
    respondWith([user], nil)
}
```

Currently Codable routes with QueryParams cannot return a single codable object so we are returning an array. This feature has been added to the master branch and will be in the next Kitura release.

--- 

##Example: Kitura Server receiving URL Encoded Forms in Routes

To demonstrate these new capabilities, we will create a simple Kitura web server. We will serve a static webpage, which will send GET and POST HTML forms. This server will then have Raw and Codable routes, which will receive these forms and return the corresponding Swift struct.

1. In the terminal, using the Kitura command-line interface, generate a basic Kitura server:

```
mkdir ~/URLEncodedForms
cd ~/URLEncodedForms
kitura init
```

2. Create your web page HTML file:

```
mkdir ~/URLEncodedForms/public
cd ~/URLEncodedForms/public
touch formwebpage.html
open -a Xcode.app formwebpage.html
```

3. Copy in the following HTML:

```html
<!DOCTYPE html>
<html>
<body>
<h2>URL Encoded Forms</h2>
 
<h4>Post to Raw route</h4>
<form action="raw" method="post" enctype="application/x-www-form-urlencoded" target="redirect">
    Name: <input type="text" name="name" required="required"><br>
    Age: <input type="number" name="age" required="required"><br>
    <input type="submit" value="Submit">
</form>
 
<h4>Post to Codable route</h4>
<form action="codable" method="post" enctype="application/x-www-form-urlencoded" target="redirect">
    Name: <input type="text" name="name" required="required"><br>
    Age: <input type="number" name="age" required="required"><br>
    <input type="submit" value="Submit">
</form>
 
<h4>Get to Raw route</h4>
<form action="raw" method="get" enctype="application/x-www-form-urlencoded" target="redirect">
    Name: <input type="text" name="name" required="required"><br>
    Age: <input type="number" name="age" required="required"><br>
    <input type="submit" value="Submit">
</form>
 
<h4>Get to Codable route</h4>
<form action="codable" method="get" enctype="application/x-www-form-urlencoded" target="redirect">
    Name: <input type="text" name="name" required="required"><br>
    Age: <input type="number" name="age" required="required"><br>
    <input type="submit" value="Submit">
</form>
 
<iframe name="redirect" style="display:none;"></iframe>
</body>
</html>
```

4. Open your Kitura Xcode project:

```
cd ~/URLEncodedForms
open URLEncodedForms.xcodeproj/
```

5. Open Sources > Application > Application.swift
6. Add your User struct after the App class:

```swift
struct User: Codable, QueryParams {
    let name: String
    let age: Int
}
```

7. Inside the postInit function, add the static file server middleware:
```swift
router.get("/", middleware: StaticFileServer())
```

8. Below your static file server, add a Raw route to receive a POST form:

```swift
router.post("/raw") { request, response, next in
    guard let user = try? request.read(as: User.self)
    else {
        return try response.status(.unprocessableEntity).end()
    }
    print("Raw POST route: \(user.name), is \(user.age) years old")
    response.status(.created).send(json: user)
    next()
}
```

9. Below the previous route, add a Raw route to receive a GET form:

```swift
router.get("/raw") { request, response, next in
    guard let user = try? QueryDecoder(dictionary: request.queryParameters).decode(User.self)
    else {
        return try response.status(.unprocessableEntity).end()
    }
    print("Raw GET route: \(user.name), is \(user.age) years old")
    response.status(.created).send(json: user)
    next()
}
```

10. Below your Raw routes, register the handlers for GET and POST requests on “codable”.

```swift
router.post("/codable", handler: postFormHandler)
router.get("/codable", handler: getFormHandler)
```

11. After the postInit function, add your postFormHandler function:

```swift
func postFormHandler(user: User, respondWith: (User?, RequestError?) -> Void) {
    print("Codable POST route: \(user.name), is \(user.age) years old")
    respondWith(user, nil)
}
```

12. Below the previous handler, add your getFormHandler function:

```swift
func getFormHandler(user: User, respondWith: ([User]?, RequestError?) -> Void) {
    print("Codable GET route: \(user.name), is \(user.age) years old")
    respondWith([user], nil)
}
```

13. In the top left corner of Xcode you should see a small toolbox icon with the text “URLEncodedForms-Package” next to it. Click this icon and then click “URLEncodedForms” from the dropdown menu.

14. Press the Run button or use the ⌘+R key shortcut to start your server.

Go to http://localhost:8080/formwebpage.html. You will see a very basic HTML page with four forms. When you submit the forms, they will send the data to the routes we just created. If you open your Xcode project, you should see the user’s name and age being printed to the console.

Congratulations! You have just set up a simple website which submits URL encoded forms to a Kitura server. Within a real application you would probably use Swift-Kuery-ORM to save the users in a database and a template engine to produce a dynamic webpage based on the user.