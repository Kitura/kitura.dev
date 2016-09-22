---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Credentials
menu: resources
lang: en
redirect_from: "/resources/tutorial-todo.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

You can add user authentication to your Kitura app via [Kitura-Credentials](https://github.com/IBM-Swift/Kitura-Credentials) by using an existing Credentials plugin implementation or by implementing your own Credentials plugin.

# How to setup Kitura-Credentials for user authentication

To integrate Kitura-Credentials with your Kitura app, first setup Kitura:

```swift
import Kitura

let router = Router()
```

Next, instantiate the Credentials framework:

```swift
import Credentials

let credentials = Credentials()
```

Then, configure the Credentials plugin you want to use and then register it with the Credentials framework. The following example configures a Credentials plugin for web-based Facebook login. You can find a list of available Credentials plugins [here](https://github.com/IBM-Swift/Kitura-Credentials#list-of-plugins).

## Example - Facebook Login
The [Kitura-CredentialsFacebook](https://github.com/IBM-Swift/Kitura-CredentialsFacebook) plugin supports Facebook login for both web-based and token flows. This guide assumes that you have registered your app with Facebook and have enabled Facebook Login in your app and is attempting to use the web-based OAuth flow to authenticate users against Facebook.

To use the Kitura-CredentialsFacebook web-based flow, first setup session:

```swift
// previous steps omitted for brevity

import KituraSession

// using in-memory session in this example; can also use other session stores
let session = Session(secret: "session_secret")

// configure Kitura router to use session
router.all(middleware: session)
```

Then, configure the plugin:

```swift
import CredentialsFacebook

let fbCredentials = CredentialsFacebook(clientId: "<your-app-id>", clientSecret: "<your-app-secret>", callbackUrl: “<your-app-domain>/login/facebook/callback”)
```

Next, register the plugin with the Credentials framework:

```swift
credentials.register(plugin: fbCredentials)
```

Lastly, set up endpoints on your server for handling user authentication:

```swift
// Endpoint for starting the OAuth login flow
router.get(“/login/facebook”, handler: credentials.authenticate(credentialsType: fbCredentials.name)

// Endpoint for Facebook callback; handles exchange of temporary code for access token
router.get(“/login/facebook/callback”, handler: credentials.authenticate(credentialsType: fbCredentials.name))
```

With these endpoints, you can redirect users to `/login/facebook` to begin the login process. **Note:** Make sure to whitelist `<your-app-domain>/login/facebook/callback` in your Facebook app’s developer settings in order to allow Facebook to redirect users back to your callback.

That’s the basic setup for web-based Facebook login. Please refer to Kitura-CredentialsFacebook for more usage and configurations.
