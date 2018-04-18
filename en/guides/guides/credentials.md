---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Credentials
menu: resources
lang: en
redirect_from: "/resources/credentials.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png

<div class="titleBlock">
	<h1>Kitura-Credentials</h1>
	<p>You can add user authentication to your Kitura app via <a href="https://github.com/IBM-Swift/Kitura-Credentials">Kitura-Credentials</a>.<br>Either use an existing Credentials plugin, or your own Credentials plugin.</p>
</div>

## How to set up Kitura-Credentials for user authentication

<span class="arrow">&#8227;</span> To integrate Kitura-Credentials with your Kitura app, first setup Kitura:

```swift
import Kitura

let router = Router()
```

<span class="arrow">&#8227;</span> Next, instantiate the Credentials framework:

```swift
import Credentials

let credentials = Credentials()
```

<span class="arrow">&#8227;</span> Then, configure the Credentials plugin you want to use and then register it with the Credentials framework. The following example configures a Credentials plugin for web-based Facebook login. You can find a list of available Credentials plugins [here](https://github.com/IBM-Swift/Kitura-Credentials#list-of-plugins).

---

## Example: Facebook Login
The [Kitura-CredentialsFacebook](https://github.com/IBM-Swift/Kitura-CredentialsFacebook) plugin supports Facebook login for both web-based and token flows. This guide assumes that you have registered your app with Facebook and have enabled Facebook Login in your app and is attempting to use the web-based OAuth flow to authenticate users against Facebook.

<span class="arrow">&#8227;</span> To use the Kitura-CredentialsFacebook web-based flow, first setup session:

```swift
// previous steps omitted for brevity

import KituraSession

// using in-memory session in this example; can also use other session stores
let session = Session(secret: "session_secret")

// configure Kitura router to use session
router.all(middleware: session)
```

<span class="arrow">&#8227;</span> Then, configure the plugin:

```swift
import CredentialsFacebook

let fbCredentials = CredentialsFacebook(clientId: "<your-app-id>", clientSecret: "<your-app-secret>", callbackUrl: “<your-app-domain>/login/facebook/callback”)
```

<span class="arrow">&#8227;</span> Next, register the plugin with the Credentials framework:

```swift
credentials.register(plugin: fbCredentials)
```

<span class="arrow">&#8227;</span> Lastly, set up endpoints on your server for handling user authentication:

```swift
// Endpoint for starting the OAuth login flow
router.get(“/login/facebook”, handler: credentials.authenticate(credentialsType: fbCredentials.name))

// Endpoint for Facebook callback; handles exchange of temporary code for access token
router.get(“/login/facebook/callback”, handler: credentials.authenticate(credentialsType: fbCredentials.name))
```

With these endpoints, you can redirect users to `/login/facebook` to begin the login process.

> ![tip] Make sure to whitelist `<your-app-domain>/login/facebook/callback` in your Facebook app’s developer settings in order to allow Facebook to redirect users back to your callback.

That’s the basic setup for web-based Facebook login. Please refer to Kitura-CredentialsFacebook for more usage and configurations.
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
