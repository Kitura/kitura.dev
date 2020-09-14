---
title: JWT authentication using KituraKit
blurb: With the release of KituraKit 0.0.24, it is now possible to make type-safe requests to a Kitura server using a JWT for authentication
date: "2019-08-12"
author: David Jones
path: /blogs/jwt-authentication-using-kiturakit
---

With the release of [KituraKit 0.0.24](https://github.com/IBM-Swift/KituraKit/releases/tag/0.0.24), it is now possible to make type-safe requests to a Kitura server using a JWT for authentication. In addition, we’d like to introduce [Kitura-CredentialsJWT](https://github.com/Kitura/Kitura-CredentialsJWT), which provides a convenient way to add JWT authentication to Codable routes.

In a previous blog post [Swift JWT 3.0: Codable JSON web tokens](/blogs/swift-jwt-3-0-codable-json-web-tokens), we outlined the code for implementing JWT authentication in Kitura for Codable routes. In this post, we’ll show how KituraKit makes it easy to perform type-safe requests to APIs requiring JWT authentication, and how Kitura-CredentialsJWT reduces the boilerplate required on the server side.

##What is a JSON Web Token?

In short, a JWT is a small JSON payload consisting of a Header object, a Claims object and a signature. They are a self-contained way for securely transmitting information between parties. If you would like to know more about JWTs, check out [jwt.io](https://jwt.io).

---

##Setting up JWT authentication using KituraKit

Sending a JWT for authentication is simple: attach a `JWTCredentials` to your request, as in this example:

```swift
// Replace with a valid JWT string: three base64-encoded values separated by full stops.
let jwtString = "<my_jwt_token_string>"

client.get("/protected", credentials: JWTCredentials(token: jwtString)) { (user: User?, error: RequestError?) in
    guard let user = user else {
        return print("Failed to access protected resource")
    }
    print("User obtained: \(user)")
}
```

Under the covers, KituraKit will send your token in an `Authorization: Bearer <token>` header. When Kitura receives a request to the protected route, it will verify the token’s signature, and can then choose whether the JWT permits access to that resource based on its claims.

##Server-side authentication using Kitura-CredentialsJWT

In a previous blog post [Type-Safe Authentication using OAuth tokens](/blogs/type-safe-authentication-using-oauth-tokens), we introduced the TypeSafeCredentials protocol as part of Kitura-Credentials, and with it a number of initial implementations: `TypeSafeGoogleToken`, `TypeSafeFacebookToken` and `TypeSafeHTTPBasic`.

We’ve released 0.0.1 of [Kitura-CredentialsJWT](https://github.com/Kitura/Kitura-CredentialsJWT), which extends the `JWT` type to conform to TypeSafeMiddleware. This means that you can include it in your Codable route handler as follows:

```swift
import SwiftJWT
import CredentialsJWT

// Define the claims that must appear in the JWT
struct MyClaims: Claims {
    // Subject's id (e.g. name)
    let sub: String
}

// Set up TypeSafeJWT by specifying the method for verifying a JWT signature
let key = "<PrivateKey>".data(using: .utf8)!
TypeSafeJWT.verifier = .hs256(key: key)

// Use the JWT type as a Type-Safe Middleware to protect a route. The handler
// will only be invoked if the JWT can be successfully verified, and contains
// the required claims.
router.get("/protected") {  (jwt: JWT<MyClaims>, respondWith: (User?, RequestError?) -> Void) in
    // (Decide whether to permit the user access to this resource, based on the JWT claims)
    // Send the requested resource:
    let user = User(name: jwt.claims.sub)
    respondWith(user, nil)
}
```

Notice that, compared to the example in our previous post, there is no longer a requirement to implement the TypeSafeMiddleware protocol yourself. We just need to bootstrap the TypeSafeJWT configuration with a method (and key) for validating incoming JWTs.

The TypeSafeJWT type also provides a basic token cache facility, which can remember previously validated JWTs to reduce the computational overhead of verifying the same JWT repeatedly.

---

##Using JWTs alongside other authentication methods

In addition, you can use JWT authentication as part of Kitura-Credentials’ `TypeSafeMultiCredentials`, which allows a single route handler to accept multiple types of authentication. For example:

```swift
import Credentials
import CredentialsJWT
import SwiftJWT

struct MyMultiAuthedUser: TypeSafeMultiCredentials {
    let id: String            // Protocol requirement
    let provider: String      // Protocol requirement
    let name: String          // Custom property

    // Acceptable methods of authentication: Google token, JWT and HTTP Basic
    static var authenticationMethods: [TypeSafeCredentials.Type] = [MyGoogleUser.self, MyBasicAuth.self, JWT<MyClaims>.self]

    init(successfulAuth: TypeSafeCredentials) {
        self.id = successfulAuth.id
        self.provider = successfulAuth.provider

        // Initialize additional properties based on authentication type.
        switch successfulAuth {
        case let googleToken as GoogleTokenProfile:
            self.name = googleToken.name
        case let jwt as JWT<MyClaims>:
            self.name = jwt.claims.sub
        default:  // HTTP Basic
            self.name = successfulAuth.id
        }
    }
}
```

The `MyMultiAuthedUser` type can then be used in place of `JWT` in your handler. (Note: the implementation of MyGoogleUser and MyBasicAuth is omitted here for brevity but more details can be found in the Multiple authentication methods section of [Type-Safe Authentication using OAuth tokens](/blogs/type-safe-authentication-using-oauth-tokens).

For more details, you can check out the code at the [Kitura/Kitura-CredentialsJWT project](https://github.com/Kitura/Kitura-CredentialsJWT) on GitHub, and the API documentation on [Kitura.io](http://kitura.io), and you are welcome to discuss the project by [joining our Slack community](http://swift-at-ibm-slack.mybluemix.net/?cm_sp=dw-bluemix-_-swift-_-devcenter&cm_sp=dw-bluemix-_-swift-_-devcenter&cm_mc_uid=83263075142115698398229&cm_mc_sid_50200000=53695431570707266328&_ga=2.114805639.186671014.1570626561-1743126121.1570022962). As always, feedback and contributions are welcomed!
