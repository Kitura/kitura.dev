---
path: "/docs/authentication/oauth2"
title: Add Oauth2 to your app
---

# OAuth 2.0 authentication with Google/Facebook

[OAuth 2.0](https://oauth.net/2/) is an authorization framework that enables you to authenticate a user via a trusted third party. A brief summary of the protocol flow is as follows:

*  The user wants to log in to a server (e.g. your Kitura application).

*  The user is redirected to the OAuth 2.0 provider (e.g. Facebook/Google).

*  The user authenticates with the OAuth 2.0 provider and is given a single use access code.

*  The user is sent back to the server and provides them with the access code.

*  The server sends the access code to the OAuth 2.0 provider and is given an access token.

*  The server uses the access token to request the user's information and authenticate them.

If you would like a more in-depth explanation of OAuth 2.0, you can read [this guide](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) by DigitalOcean.

Kitura supports OAuth 2.0 authentication using plugins for the [Kitura-Credentials](https://github.com/IBM-Swift/Kitura-Credentials) authentication framework. In this guide, we show you how to use the [Kitura-CredentialsGoogle](https://github.com/IBM-Swift/Kitura-CredentialsGoogle) and the [Kitura-CredentialsFacebook](https://github.com/IBM-Swift/Kitura-CredentialsFacebook) plugins. Because we are authenticating using a third party, the user does not need to create a new account for our service and we don't need to handle their username and password.

>This guide describes how to implement the OAuth 2.0 flow for a client accessing the server via a web browser.  
For a mobile application, the user must authenticate themselves on the device, send the access token to the server and have the token authenticated using a Credentials token plugin. We will not cover the mobile application flow in this guide.

---

## Step 1: Create your third party OAuth 2.0 application

For this guide we need a third party OAuth 2.0 provider who will authenticate the user. We will be using Google for this guide, but you can read instructions on how to create the OAuth 2.0 provider for Facebook below. After this initial setup, swapping Google for Facebook in code examples would create valid Facebook OAuth 2.0 authentication.

### Google OAuth 2.0:

*  Follow the Google [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en) guide.

*  Once you have created your client ID, add http://localhost:8080/oauth2/google to your authorized redirect URIs.

*  Note down the client ID and client secret. We will need them later.

### Facebook Oauth 2.0:

*  Log in/sign up to [Facebook developers.](https://developers.facebook.com/apps/)

*  Create a new Facebook App with a name of your choice.

*  From the dashboard, add the Facebook login product.

*  Inside Facebook login settings, add http://localhost:8080/oauth2/facebook to the Valid OAuth Redirect URIs.

*  Inside the App settings, note down the App ID and App Secret. We will need them later.

---

## Step 2: Create the OAuth 2.0 routes

In this guide we are going to create three Kitura routes:

*   A log in route, where we authenticate the user

*   A protected route, which can only be accessed by a user who is logged in

*   A log out route, where we revoke the users credentials

In this step we will create the framework for our protected and log out routes.

>If you don't have a server, follow our [Create a server](https://www.kitura.io/docs/getting-started/create-server.html) guide.

Firstly, open your `Application.swift` file in your default text editor (or Xcode if you prefer):
```
open Sources/Application/Application.swift
```
Inside the `postInit()` function add:
```swift
initializeOAuth2Routes(app: self)
```
Next, create a new file, called `OAuth2Routes.swift`, to contain the framework for our routes code:
```
touch Sources/Application/Routes/OAuth2Routes.swift
```
Open your `OAuth2Routes.swift` file:
```
open Sources/Application/Routes/OAuth2Routes.swift
```
Inside this file, add the framework for our routes code:
```swift
func initializeOAuth2Routes(app: App) {

    // Configure Credentials and session here

    app.router.get("/oauth2/protected") { request, response, next in
      // Check the user is authenticated here
      next()
    }

    app.router.get("/oauth2/logout") { request, response, next in
      // Log out user here
      next()
    }
}
```

---

## Step 3: Import dependencies

Add [Kitura-Credentials](https://github.com/IBM-Swift/Kitura-Credentials), [Kitura-CredentialsGoogle](https://github.com/IBM-Swift/Kitura-CredentialsGoogle) and [Kitura-Session](https://github.com/IBM-Swift/Kitura-Session) to the dependencies in the `Package.swift` file.

Inside the file which defines the routes, `OAuth2Routes.swift`, import Credentials, CredentialsGoogle and KituraSession:
```swift
import Credentials
import CredentialsGoogle
import KituraSession
```

---

## Step 4: Set up a session

Kitura-Credentials requires a session to be set up on the protected routes. This will use cookies to keep the user logged in after the initial authentication.
```swift
let session = Session(secret: "AuthSecret", cookie: [CookieParameter.name("Kitura-Auth-cookie")])
app.router.all("/oauth2", middleware: session)
```

---

## Step 5: Configure your Credentials middleware

We need to initialize an instance of our Credentials plugin using the id and secret from the OAuth 2.0 application we created in step 1.

We add the following code to our `initializeOAuth2Routes` function, substituting in our own id and secret:

```swift
let googleClientId = "<Your Google Client Id>"
let googleClientSecret = "<Your Google Client Secret>"
let googleCallbackUrl = "http://localhost:8080/oauth2/google"
let googleCredentials = CredentialsGoogle(clientId: googleClientId, clientSecret: googleClientSecret, callbackUrl: googleCallbackUrl)
```

---

## Step 6: Register your Credentials plugin

We need to register our plugin credentials to a `Credentials` middleware.

```swift
let googleCredMiddleware = Credentials(options: ["successRedirect": "/oauth2/protected"])
googleCredMiddleware.register(plugin: googleCredentials)
```

Next, we need to register our `Credentials` middleware on our login route.

When a user hits this route, they will be redirected to the OAuth 2.0 provider.

When the user is sent back to this route, their access code with be authenticated.

If they successfully authenticate, they will be redirected to the "successRedirect" we set on our middleware.
```swift
app.router.get("/oauth2/google", handler: googleCredMiddleware.authenticate(credentialsType: googleCredentials.name))
```

---

## Step 7: Check if a user is logged in

Once a user successfully authenticates, they will have a `userProfile` attached to all their requests via the session we set up in step 4.

Inside our `oauth2/protected` route, we want to check if they have logged in using the `userProfile`.
```swift
guard let user = request.userProfile else {
    return try response.send("Not authorized to view this route").end()
}
response.send("Hello \(user.displayName)")
```

>The user profile contains information about the user such as how they authenticated, their unique id and their displayName.

---

## Step 8: Logging out a user

The user will remain logged in as long as their cookie provides a valid `userProfile`. We can log out a user by invalidating the cookie with the session store or by setting the `userProfile` to `nil`.

Inside our logout route handler, call the `Credentials.logOut` function:

```swift
googleCredMiddleware.logOut(request: request)
```

Our completed OAuth 2.0 routes should now look as follows:

```swift
import Credentials
import CredentialsGoogle
import KituraSession

func initializeOAuth2Routes(app: App) {

    let session = Session(secret: "AuthSecret", cookie: [CookieParameter.name("Kitura-Auth-cookie")])
    app.router.all("/oauth2", middleware: session)

    let googleClientId = "<Your Google Client Id>"
    let googleClientSecret = "<Your Google Client Secret>"
    let googleCallbackUrl = "http://localhost:8080/oauth2/google"
    let googleCredentials = CredentialsGoogle(clientId: googleClientId, clientSecret: googleClientSecret, callbackUrl: googleCallbackUrl)

    let googleCredMiddleware = Credentials(options: ["successRedirect": "/oauth2/protected"])
    googleCredMiddleware.register(plugin: googleCredentials)

    app.router.get("/oauth2/google", handler: googleCredMiddleware.authenticate(credentialsType: googleCredentials.name))

    app.router.get("/oauth2/protected") { request, response, next in
      guard let user = request.userProfile else {
          return try response.send("Not authorized to view this route").end()
      }
      response.send("Hello \(user.displayName)")
      next()
    }

    app.router.get("/oauth2/logout") { request, response, next in
      googleCredMiddleware.logOut(request: request)
      next()
    }
}
```

---

## Step 9: Testing our OAuth 2.0 authentication system

Now that everything is set up we can test logging in using OAuth 2.0.

Start your server and open your browser at:

<a href="http://localhost:8080/oauth2/protected" target="blank">localhost:8080/oauth2/protected</a>

We will be sent our unauthorized message since we haven't logged in yet.

We authenticate by going to the login route for our plugin:

[http://localhost:8080/oauth2/google](http://localhost:8080/oauth2/google)

<a href="http://localhost:8080/oauth2/google" target="blank">localhost:8080/oauth2/google</a>

This will send you to the OAuth 2.0 provider who will request that you log in and provide access to our server.

Once you complete this you will be sent back to our server which will redirect you to our "/oauth2/protected" route.

This time you will be authenticated and will see a welcome message.

As long as your session persists, you can return to <a href="http://localhost:8080/oauth2/protected" target="blank">localhost:8080/oauth2/protected</a> and will be allowed access.

Congratulations! You have just set up OAuth 2.0 authentication on your Kitura server.
