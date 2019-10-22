---
title: "Swift-JWT 3.0: Codable JSON web tokens"
blurb: We have just released version 3.0 of Swift-JWT, our library for creating, signing, and verifying JSON Web Tokens
date: "2018-12-18"
author: Andrew Lees
path: /blogs/swift-jwt-3-0-codable-json-web-tokens
---

We have just released version 3.0 of [Swift-JWT](https://github.com/IBM-Swift/Swift-JWT), our library for creating, signing, and verifying JSON Web Tokens. This release adds Codable conformance to the JWTs for easy encoding and decoding. As a result, you can now use JWTs with Kitura’s Codable Routing feature. Furthermore, this release adds support for signing and verifying JWTs using the HMAC hash function. This blog post will explain the new APIs by demonstrating JWT authentication in Codable routes.

##What is a JSON Web Token?

In short, a JWT is a small JSON payload consisting of a Header object, a Claims object and a signature. They are a self-contained way for securely transmitting information between parties. If you would like to know more about JWTs, please read our last [blog post](/blogs/swift-jwt) announcing the release of our Swift-JWT library or check out [jwt.io](https://jwt.io).

---

##Importing Swift-JWT

Let’s start by adding Swift-JWT to the dependencies of a Kitura Server. If you don’t have a project set up, please follow the [getting started](/docs/getting-started/create-server-cli) guide to create one.

1. In your Package.swift, add Swift-JWT 3.1.0 to the dependencies and targets:

```swift
// dependencies
.package(url: "https://github.com/IBM-Swift/Swift-JWT.git", from: "3.1.0")
// targets
.target(name: "Application", dependencies: ["SwiftJWT"]),
```

2. Import the SwiftJWT library:

```swift
// Inside Application.swift
import SwiftJWT
```

---

##Returning a JWT from a Codable route

We are going to write a Codable route will received a user’s name and returns a signed JWT String.

1. We begin by defining the User and Access token structs:

```swift
struct User: Codable {
    let name: String
}

struct AccessToken: Codable {
    let accessToken: String
}
```

2. Next, we write a Codable route that receives the user’s query and returns a JWT:

```swift
// Inside app.postInit()
router.post("/generateJWT", handler: loginHandler)

// Inside App
func loginHandler(user: User, respondWith: (AccessToken?, RequestError?) -> Void) {
    var jwt = JWT(claims: ClaimsStandardJWT(iss: "Kitura", sub: user.name))
    guard let key = "<PrivateKey>".data(using: .utf8),
          let signedJWT = try? jwt.sign(using: .hs256(key: key))
    else {
        return respondWith(nil, .internalServerError)
    }
    respondWith(AccessToken(accessToken: signedJWT), nil)
}
```

This route represents the “Login” route when using JWT authentication.
– The user provides their name (at which point the server would usually authenticate them).
– The server takes the user’s information and creates the JWT with their claims.
– The server signs and encodes the JWT using a private key.
– The server sends the signed JWT String back to the user

3. Run your Kitura server and send a POST request to your route.

There are many utilities for testing REST APIs, such as Postman. Here we’ll use “curl”, which is a simple command line utility:

```
curl -X POST \
  http://localhost:8080/generateJWT \
  -d '{"name":"Joe Bloggs"}' \
  -H 'content-type: application/json'
```

You should be sent back an access token which looks something like this:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLaXR1cmEiLCJzdWIiOiJKb2UgQmxvZ2dzIn0.Q2UbWSsU-AecEBBNBWr2NiqJdeV2OQF43yQZhXF0LB4
```

This is a signed JSON Web Token. If you would like to view its headers and claims, you can decode it at [jwt.io](https://jwt.io).

---

##Authenticating a User using a JWT in a Codable route

The signed JWT is the user’s credentials and should be protected in the same way as a password. The user can then send the JWT in their Authentication header so the server knows who is making the request. We will now write a protected route that will only respond to an authenticated user.

1. Create a [TypeSafeMiddleware](/blogs/type-safe-middleware) to extract the JWT:

```swift
struct TypeSafeJWT<C: Claims>: TypeSafeMiddleware {
    let jwt: JWT<C>

    static func handle(request: RouterRequest, response: RouterResponse, completion: @escaping (TypeSafeJWT?, RequestError?) -> Void) {
        let auth = request.headers["Authorization"]
        guard let authParts = auth?.split(separator: " ", maxSplits: 2),
            authParts.count == 2,
            authParts[0] == "Bearer",
            let key = "<PrivateKey>".data(using: .utf8),
            let jwt = try? JWT<C>(jwtString: String(authParts[1]), verifier: .hs256(key: key))
            else {
                return completion(nil, .unauthorized)
        }
        completion(TypeSafeJWT(jwt: jwt), nil)
    }
}
```

This middleware will:
* Read the JWT string from the “Authorization” header of the request.
* Verify the JWT signature (Ensuring we created the JWT and it hasn’t been altered)
* Decode the JWT from the string

Because HMAC is a symmetric algorithm, the JWT is verified using the same key that it was signed with.

2. Create a Codable route, protected by JWT authentication:

```swift
// Inside App.PostInit
router.get("/protected", handler: protected)

// Inside App
func protected(typeSafeJWT: TypeSafeJWT<ClaimsStandardJWT>, respondWith: (User?, RequestError?) -> Void) {
    guard let userName = typeSafeJWT.jwt.claims.sub else {
        return respondWith(nil, .internalServerError)
    }
    respondWith(User(name: userName), nil)
}
```

3. Run your Kitura server and send a GET request to the protected route.

```
curl -i http://localhost:8080/protected
```

You should receive an 401 Unauthorized status code back.

Now send a request using a JWT from the generateJWT route:

```
curl -i -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLaXR1cmEiLCJzdWIiOiJKb2UgQmxvZ2dzIn0.Q2UbWSsU-AecEBBNBWr2NiqJdeV2OQF43yQZhXF0LB4" http://localhost:8080/protected
```

The name from the JWT will be returned to you. If you change the JWT token or generate one using a different key then it will be rejected by the server.

Congratulations! You have just created a JWT single sign on system using a Kitura Server.

If you would like to see a completed example that also uses JWTs for information transfer, Please check out the JWT Example in our [Kitura sample](https://github.com/IBM-Swift/Kitura-Sample) app.

Any questions or comments? Please join the Kitura community on [Slack](http://swift-at-ibm-slack.mybluemix.net/?cm_sp=dw-bluemix-_-swift-_-devcenter&_ga=2.159686845.186671014.1570626561-1743126121.1570022962)!
