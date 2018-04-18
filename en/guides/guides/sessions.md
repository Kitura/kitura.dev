---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Sessions
menu: resources
lang: en
redirect_from: "/resources/sessions.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png

<div class="titleBlock">
	<h1>Adding Sessions With Kitura-Session</h1>
</div>

You can save user session data in your Kitura app by using the `Kitura-Session` middleware. In this tutorial, we will be storing an email address in our session and destroying our session data to emulate logging in and out of a website.

---

## How to set up Kitura-Session

<span class="arrow">&#8227;</span> Before being able to create sessions, you must have the `Kitura-Session` dependency added in your `Package.swift` file:

```swift
.Package(url: "https://github.com/IBM-Swift/Kitura-Session.git"),
```

> ![tip] If you have already built your app, you will need to generate a new xcodeproj in order to use `import KituraSession`

<span class="arrow">&#8227;</span> To integrate sessions in your Kitura app, you will need the following imports:

```swift
import Foundation
import KituraSession
import SwiftyJSON
```

<span class="arrow">&#8227;</span> Next, you want your Kitura router to use the session middleware and have the ability to store the current session in a variable:

```swift
// Where we will store the current session data
var sess: SessionState?

// Initialising our KituraSession
let session = Session(secret: "kitura_session")

router.all(middleware: session)
```

---

## Creating session data

We will be adding two routes: `/` and `/login`.

<span class="arrow">&#8227;</span> Start with the `/login` router, which is where we will be getting the `POST` data from the login:

```swift
router.post("/login") {
    request, response, next in

    //Get current session
    sess = request.session
```

<span class="arrow">&#8227;</span> To get the data from the request, we must add another middleware:

```swift
router.all(middleware: session)

router.all(middleware: BodyParser())
```

<span class="arrow">&#8227;</span> Kitura can get both urlEncoded and JSON data using the `BodyParser()` middleware:

```swift
    var maybeEmail: String?

    switch request.body {
    case .urlEncoded(let params)?:
        maybeEmail = params["email"]
    case .json(let params)?:
        maybeEmail = params["email"].string
    default: break
    }
```

<span class="arrow">&#8227;</span> Next we will:

- Add the email value to our session
    - To add the value we must convert to JSON format
- Respond back to the client:

```swift
    if let email = maybeEmail, let sess = sess {
        sess["email"] = JSON(email)
        try response.send("done").end()
    }
}
```

<span class="arrow">&#8227;</span> Now we can add our route for `"/"` :

```swift
router.get("/") {
    request, response, next in

    //Again get the current session
    sess = request.session

    //Check if we have a session and it has a value for email
    if let sess = sess, let email = sess["email"].string {
        try response.send(fileName: pathToFile).end()
    } else {
       try response.send(fileName: pathToAnotherFile).end()
    }
}
```

The above snippet checks whether or not the user has already "logged in" and if they have routes straight to `index.html`, otherwise it requests the user to "log in" to gain access.

---

## HTML and jQuery

Once we have set that up we can create some basic HTML and jQuery to use what we have made. For this example we will be creating two HTML files, `login.html` and `index.html`.

Our `login.html` will look something like this:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script>
        $(document).ready(function(){
            var email,pass;
            $("#submit").click(function(){
                email=$("#email").val();
                pass=$("#password").val();
                /*
                * Add your authentication here
                */
                 $.post("http://localhost:8080/login",{email:email}, function(data){
                      if(data==='done')
                           {
                                window.location.href="/";
                           }
                 });
            });
        });
     </script>


        <h1>Please login</h1>
        <input type="text" size="40" placeholder="Type your email" id="email"><br />
        <input type="password" size="40" placeholder="Type your password" id="password"><br />
        <input type="button" value="Submit" id="submit">
```

<span class="arrow">&#8227;</span> Our `index.html` can look like anything for now.

---

## So far, we have:

- Created a session
- Used the session data to determine what to respond with
- And created the corresponding html and jQuery that will use all the code

All of this allows a "user" to "login" to the website and have the ability to refresh or open the website again and still be logged in.

Next:

- We will destroy session data
- Customize our session, e.g. how long a session will last.

---

## Destroying session data

We are going to add another route for `/logout` now, so we can destroy all our session data.

Destroying session data is very simple:

```swift
router.post("/logout") {
    request, response, next in

    //Destroy all data in our session
    sess?.destroy() {
        (error: NSError?) in
        if let error = error {
            if Log.isLogging(.error) {
                Log.error("\(error)")
            }
        }
    }
    try response.send("done").end()
}
```
And that's it for removing the data from our session.

To be able to destroy our data in this example we are going to have to modify our `index.html` to actually use this, it will end up looking something like this:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script>
    $(document).ready(function(){
        $("#submit").click(function(){
            $.post("http://localhost:8080/logout" ,function(data){
                if(data==='done')
                {
                    window.location.href="/";
                }
            });
        });
    });
</script>
```

And the html:

```html
<h1>Your profile</h1>
<input type="button" value="Logout" id="submit">
```
Clicking on the button will destroy the session data and take us back to the login page.

---

## Customizing your session

To customize your session you will have to add some extra values when you create your session:

```swift
public init(secret: String, cookie: [CookieParameter]?=nil, store: Store?=nil)
```

**Where**:

- *secret*: is a String to be used for session encoding.This should be a large unguessable string.
    - Recommended minimum length is 14 characters.
    - The secret parameter is used to derive a pair of encryption and signature keys via PBKDF2 and a fixed IV to make the session id cookie be authenticated encrypted. The secret isn't used directly to encrypt or compute the MAC of the cookie.

- *cookie*: is a list of options for session cookies
    - name: defaults to "kitura-session-id"
    - path: defaults to "/"
    - secure: defaults to *false*
    - maxAge: defaults to *no expiration*
- store: is an instance of a plugin for session backing store that implements Store protocol. If not set, InMemoryStore is used (all data will be lost on server restart).  

---

## Notes

To stop all data being lost on server restart, you can use [Kitura-Session-Redis](https://github.com/IBM-Swift/Kitura-Session-Redis) along with a redis server

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
