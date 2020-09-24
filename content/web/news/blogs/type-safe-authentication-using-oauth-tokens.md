---
title: Type-Safe Authentication using OAuth tokens
blurb: "In the 2.4 release of Kitura, we introduced a facility called Type-Safe Middleware, and with it two conforming implementations: Sessions and Credentials"
date: "2018-06-29"
author: David Jones
path: /blogs/type-safe-authentication-using-oauth-tokens
---

##Introduction

In the 2.4 release of Kitura, we introduced a facility called [Type-Safe Middleware](type-safe-middleware), and with it two conforming implementations: Sessions and Credentials.

If you need to authenticate users of your API, you can use Credentials to specify a middleware when registering your Codable route handler. The handler is invoked only after successful authentication, and an instance of that middleware provides convenient and type-safe access to the user’s profile.

With the release of Type-Safe Credentials, we provided a type-safe implementation of HTTP Basic authentication. We’re now pleased to introduce two additional forms of authentication: Google and Facebook OAuth tokens.

In addition, a new  [`TypeSafeMultiCredentials`](https://kitura.github.io/Kitura-Credentials/Protocols/TypeSafeMultiCredentials.html)  protocol allows a single route handler to accept multiple forms of authentication.

---

##Authentication using OAuth Tokens

A number of service providers support access delegation using [OAuth](https://en.wikipedia.org/wiki/OAuth) tokens: an ability for a subject to share elements of their user profile with your application, without specifying a password. The token grants the bearer limited access to the subject’s profile – such as to obtain their user id, name or e-mail address.

The token also acts as proof that the subject is who they claim to be: in order to generate the token, they must have successfully logged into that service provider, and consented to share information with your application.

Let’s take a look at how we can handle authentication using OAuth tokens from two providers: Google and Facebook.

###Google OAuth Token

[Kitura-CredentialsGoogle](https://github.com/Kitura/Kitura-CredentialsGoogle) makes it simple to create a type-safe middleware that authenticates an incoming request against [Google’s OAuth2 userinfo API](https://developers.google.com/identity/protocols/googlescopes#oauth2v2).

Start by declaring a dependency on  `Kitura-CredentialsGoogle`  in your  `Package.swift`:

```swift
let package = Package(name: "example", dependencies: [
    ...
    .package(url: "https://github.com/Kitura/Kitura-CredentialsGoogle.git", from: "2.2.0"),
  ],
  targets: [
    .target(name: "example",
            dependencies: [ "Kitura", ..., "CredentialsGoogle" ]),
```

and import the dependency within your application:

```swift
import CredentialsGoogle
```

To authenticate an incoming request that provides a Google OAuth token, you can use the pre-defined  [GoogleTokenProfile](https://kitura.github.io/Kitura-CredentialsGoogle/Structs/GoogleTokenProfile.html)  type as a middleware when registering a Codable route handler:

```swift
router.get("/protected") { (user: GoogleTokenProfile,
        respondWith: (GoogleTokenProfile?, RequestError?) -> Void) in

    respondWith(user, nil)
}
```

Alternatively, you can customize this type by defining a conformance to the  [TypeSafeGoogleToken](https://kitura.github.io/Kitura-CredentialsGoogle/Protocols/TypeSafeGoogleToken.html)  protocol:

```swift
import CredentialsGoogle

struct MyGoogleUser: TypeSafeGoogleToken {
    let id: String
    let name: String
    let email: String?
}
```

The `MyGoogleUser`  type can then be substituted for the  `GoogleTokenProfile`  type, and will provide access to only the three fields declared.

###Facebook OAuth Token

[Kitura-CredentialsFacebook](https://github.com/Kitura/Kitura-CredentialsFacebook) defines the equivalent types for authenticating against [Facebook’s Graph API](https://developers.facebook.com/docs/graph-api/).

Start by declaring a dependency on  `Kitura-CredentialsFacebook`  in your  `Package.swift`:

```swift
let package = Package(name: "example", dependencies: [
    ...
    .package(url: "https://github.com/Kitura/Kitura-CredentialsFacebook.git", from: "2.2.0"),
  ],
  targets: [
    .target(name: "example",
            dependencies: [ "Kitura", ..., "CredentialsFacebook" ]),
```

To authenticate an incoming request that provides a Facebook OAuth token, you can use the pre-defined [FacebookTokenProfile](https://kitura.github.io/Kitura-CredentialsFacebook/Structs/FacebookTokenProfile.html) type as a middleware:

```swift
import CredentialsFacebook
...
// Optionally, specify your Facebook App ID to only accept tokens that were
// issued to your application.
FacebookTokenProfile.appID = "<your app id>"
...
router.get("/protected") { (user: FacebookTokenProfile,
         respondWith: (FacebookTokenProfile?, RequestError?) -> Void) in

    respondWith(user, nil)
}
```

Again, you can create a custom type by defining a conformance to the [TypeSafeFacebookToken](https://kitura.github.io/Kitura-CredentialsFacebook/Protocols/TypeSafeFacebookToken.html) protocol:

```swift
import CredentialsFacebook

struct MyFacebookUser: TypeSafeFacebookToken {
    let id: String
    let name: String
    let email: String?

    static var appID: String? = "<your app id>"
}
```

However, there are some key differences between the Google and Facebook methods that warrant some closer examination:

1. Profile contents

The Google userinfo API provides a fixed profile of information where the subject may optionally choose to share their e-mail address and gender. Requests to Google’s API do not specify which fields are desired: all granted fields are returned.

In contrast, the Facebook Graph API requires you to specify which fields of a subject’s profile you wish to access. The token determines what subset of these fields have been granted to you by the subject.

In order to determine which fields should be requested from Facebook, the  [TypeSafeFacebook](https://kitura.github.io/Kitura-CredentialsFacebook/Protocols/TypeSafeFacebook.html)  protocol specifies a list of  `validFieldNames`  that can be requested from the API. The properties declared by your type are filtered against this list, and the resulting set requested from Facebook. The Facebook response is used to initialize those properties when a user is authenticated.

> This requires all other properties of your type to be `optional`.

The built-in list of field names is likely to be sufficient for most cases but can be overridden by your type if needed.

2. App-scoped Identifiers and OAuth AppID verification

The Facebook  `id`  field is application-scoped. This means that for a given subject, the value of their id is dependent on the OAuth app that was granted access. The value is still globally unique – meaning that the same value will not be assigned to a different subject in a different application scope.

In order to establish the user’s identity in the context of your application, we first verify that the supplied token was issued to your App. If the App ID matches, then the token is used to retrieve the subject’s identity. However, if you do not specify a value for  `appID`, this verification will be skipped and any valid token will be accepted.

###Caching of Tokens

Rather than querying the service provider upon every incoming request, profiles are cached against their respective token using an in-memory cache.

Note that there is a behavioral difference between profiles that are defined as structs or classes: if you declare your profile as a struct, changes are not persistent within the cache. If the profile type is a class, then if its properties are changed, the changes will be reflected upon subsequent retrievals from the cache. You should consider using a class type if you need to be able to modify the token profile type.

---

##Multiple authentication methods

The above examples show how to require a specific type of authentication to access a resource. However, it is common to accept multiple forms of authentication – such as tokens from multiple authentication providers.

The  [TypeSafeMultiCredentials](https://kitura.github.io/Kitura-Credentials/Protocols/TypeSafeMultiCredentials.html)  protocol provides a way to define a `TypeSafeMiddleware` that permits authentication against a list of methods – an array of  [TypeSafeCredentials](https://kitura.github.io/Kitura-Credentials/Protocols/TypeSafeCredentials.html)  types, such as the ones we defined above.

To use this facility, define a type that conforms to the protocol. This requires that you define an  `authenticationMethods`  property that lists the permitted authentication methods, and an initializer that takes a  `TypeSafeCredentials`  parameter. For example:

```swift
import Credentials

struct MyMultiAuthedUser: TypeSafeMultiCredentials {
    let id: String                   // Protocol requirement
    let provider: String             // Protocol requirement
    let name: String                 // Custom property
    let email: String?               // Custom, optional property

    static var authenticationMethods: [TypeSafeCredentials.Type]
            = [MyBasicAuth.self, MyFacebookUser.self, MyGoogleUser.self]

    init(successfulAuth: TypeSafeCredentials) {
        self.id = successfulAuth.id
        self.provider = successfulAuth.provider

        // Initialize additional properties based on authentication type.
        switch successfulAuth {
        case let googleToken as MyGoogleUser:
            self.name = googleToken.name
            self.email = googleToken.email
        case let facebookToken as MyFacebookUser:
            self.name = facebookToken.name
            self.email = facebookToken.email
        default:
            self.name = successfulAuth.id    // Map id to name for HTTP Basic
            self.email = nil
        }
    }
}
```

> The `MyBasicAuth` type represents HTTP Basic authentication, and the code can be found in the previous post: [A new kind of Kitura middleware: type-safe and easy to use](/blogs/type-safe-middleware).

This type can then be used in your Codable route handler, in the same way as before:

```swift
app.router.get("/multiAuthProfile") { (userProfile: MyMultiAuthedUser,
         respondWith: (MyMultiAuthedUser?, RequestError?) -> Void) in

    print("Authenticated \(userProfile.id) using \(userProfile.provider)")
    respondWith(userProfile, nil)
}
```

##Client-side support with KituraKit

Support has also been added to KituraKit for supplying token or HTTP Basic credentials. The client now has a  `defaultCredentials: ClientCredentials?`  property that can be used to specify the credentials that should be supplied for each request from this client.

As an example, let’s use KituraKit to retrieve the user profile corresponding to a set of credentials, using the `/multiAuthProfile` route we defined earlier. First we need a type to represent the profile information on the client side:

```swift
struct AuthedUser: Codable {
    let id: String
    let provider: String
    let name: String
    let email: String?
}
```

Now we can define a set of default credentials – in this case, HTTP Basic – to be used when accessing the server:

```swift
import KituraKit

// Create a KituraKit client
guard let client = KituraKit(baseURL: "http://localhost:8080") else {
    fatalError("Unable to create client")
}
// Assign default credentials to this client
client.defaultCredentials = HTTPBasic(username: "John", password: "12345")

// Make a request using the default credentials
client.get("/multiAuthProfile") { (returnedItem: AuthedUser?,
        error: Error?) -> Void in

    guard let returnedItem = returnedItem else {
        print("Failed to retrieve user profile with default credentials: \(error)")
        return
    }
    print("Response with default credentials: \(returnedItem)")
}
```

This results in the output:

```
Response with default credentials: AuthedUser(id: "John", provider: "HTTPBasic", name: "John", email: nil)
```

You can override the  `defaultCredentials`  for an individual request by specifying the `credentials: ClientCredentials?` parameter:

```swift
let googleToken = "abc123"  // Your Google access token

// Make a request using specific credentials
client.get("/multiAuthProfile", credentials: GoogleToken(token: googleToken)) {
        (returnedItem: AuthedUser?, error: Error?) -> Void in

    guard let returnedItem = returnedItem else {
        print("Failed to retrieve user profile with Google token: \(error)")
        return
    }
    print("Response with Google token: \(returnedItem)")
}
```

This results in output corresponding to the Google profile information provided via the token:

```
Response with Google token: AuthedUser(id: "1234567890", provider: "Google", name: "John Doe", email: Optional("john_doe@invalid.com"))
```

Finally, if you have set the default credentials but then wish to make a request from that client without supplying credentials, you can specify the `NilCredentials` type:

```swift
// Make a request without providing credentials
client.get("/multiAuthProfile", credentials: NilCredentials()) {
        (returnedItem: AuthedUser?, error: Error?) -> Void in

    guard let error = error else {
        print("Unexpected success without credentials: \(returnedItem)")
        return
    }
    print("Response without credentials: \(error)")
}
```

Which results in:

```
Response without credentials: 401 : Unauthorized
```

---

##Next steps

Now that we can identify a user and some basic profile information, we may wish to associate a more rich and domain-specific user profile with them, and have access to this profile within our handlers too.

In a future post, we’ll look at how we can use [Swift-Kuery-ORM](https://github.com/Kitura/Swift-Kuery-ORM) to easily store and retrieve user profiles in Codable routes.

Join the [Kitura community on Slack](http://swift-at-ibm-slack.mybluemix.net/?cm_sp=dw-bluemix-_-swift-_-devcenter&_ga=2.78945687.2052919715.1571393501-1533615335.1571393501) to discuss your thoughts or questions on this topic or Kitura in general.
