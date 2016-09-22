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

You can save user session data in your Kitura app by using the `Kitura-Session` middleware. In this tutorial, we will be storing an email address in our session and destroying our session data to emulate logging in and out of a website.

How to setup Kitura-Session
-

Before being abe to create sessions, you must have the `Kitura-Session` dependency added in your `Package.swift` file: 

```swift
.Package(url: "https://github.com/IBM-Swift/Kitura-Session.git"),
```

>Hint: If you have already built your app you will need to generate a new xcodeproj in order to use `import KituraSession`

To integrate sessions in your Kitura app, you will need the following imports:

```swift
import Foundation
import KituraSession
import SwiftyJSON
```

Next, you want your Kitura router to use the session middleware and have the ability to store the current session in a variable:

```swift
// Where we will store the current session data
var sess: SessionState?

// Initialising our KituraSession
let session = Session(secret: "kitura_session")

router.all(middleware: session)
```


# Creating session data

We will be adding two routes: `/` and `/login`. Starting with the `/login` router, which is where we will be getting the `POST` data from the login: 

```swift
router.post("/login") {
    request, response, next in
    
    //Get current session 
    sess = request.session
```

In order to get the data from the request we must add another middleware:

```swift
router.all(middleware: session)

router.all(middleware: BodyParser())
```

Kitura can get both urlEncoded and JSON data usign the `BodyParser()` middleware:

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

Next we will:

- add the email value to our session
    - In order to add the value we must convert to JSON format 
- respond back to the client:

```swift
    if let email = maybeEmail, let sess = sess {
        sess["email"] = JSON(email)
        try response.send("done").end()
    }
}
```
-
Now we can add our route for `"/"` :

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

The above snippet checks whether or not we have already "logged in" and takes us straight to `index.html` if we have and if not we ask the user to "log in" to gain access.

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
                 $.post("http://localhost:8090/login",{email:email}, function(data){
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

Our `index.html` can look like anything for now.

-
So far we have:

- Created a session
- Used the session data to determine what to respond with
- And created the corresponding html and jQuery that will use all the code

All of this allows a "user" to "login" to the website and have the ability to refresh or open the website again and still be logged in.

Next:

- We will destroy session data
- Customize our session e.g How long a session will last etc.

-

# Destroying session data

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
            $.post("http://localhost:8090/logout" ,function(data){
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

-
#Customizing your session

To customize your session you will have to add some extra values when you create your session:

```swift
public init(secret: String, cookie: [CookieParameter]?=nil, store: Store?=nil)
```

**Where**:

- *secret*: is a String to be used for session encoding.
- *cookie*: is a list of options for session cookies
    - name: defaults to "kitura-session-id"
    - path: defaults to "/"
    - secure: defaults to *false*
    - maxAge: defaults to *no expiration*
- store: is an instance of a plugin for session backing store that implements Store protocol. If not set, InMemoryStore is used (all data will be lost on server restart).  


Notes
-
To stop all data being lost on server restart, you can use [Kitura-Session-Redis](https://github.com/IBM-Swift/Kitura-Session-Redis) along with a redis server
