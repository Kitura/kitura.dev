---
path: "/docs/authentication/jwt"
title: JSON Web Token Authentication
---

#JSON Web Token Authentication
A JSON Web Token (JWT) defines a compact and self-contained way for securely transmitting information between parties as a JSON object. You can find out more about JWTs at [JWT.IO](https://jwt.io/).

[Swift-JWT](https://github.com/IBM-Swift/Swift-JWT) is our implementation of JSON Web Token using Swift. It allows you to create sign and verify JWTs on iOS, macOS and Linux using a range of algorithms. This guide will demonstrate how to use Swift-JWT to implement Single Sign On (SSO) authentication for your Kitura routes. This will allow a user to sign in once and then to access resources from other routes without having to repeat the authentication process.

---

##Step 1: Create the JWT routes

To use JWTs from a server, we need to add [Swift-JWT to our dependencies](https://github.com/IBM-Swift/Swift-JWT#add-dependencies).

> If you don't have a server, follow our Create a server guide.

Once we have added Swift-JWT, we need a file for our JWT routes.

Firstly, open your Application.swift file in your default text editor:

```
open Sources/Application/Application.swift
```

Inside the postInit() function add:

```swift
initializeJWTRoutes(app: self)
```

Create a new file, called JWTRoutes.swift:

```
touch Sources/Application/Routes/JWTRoutes.swift
```

Open your JWTRoutes.swift file:

```swift
open Sources/Application/Routes/JWTRoutes.swift
```

Inside this file, add the following code:

```swift
import Foundation
import KituraContracts
import SwiftJWT

func initializeJWTRoutes(app: App) {
    app.router.post("/jwtlogin") { request, response, next in
        // Read credentials and generate JWT here
        next()
    }

    app.router.get("/jwtprotected") { request, response, next in
        // Verify JWT here
        next()
    }
}
extension App {
  // Define JWT signer and verifier here
}
```

This code imports our requires modules, sets up the framework for a routes page and defines the two raw routes that we will use in our guide.

---

##Step 2: Set up your signing and verifying algorithm

Swift-JWT supports multiple algorithms for signing and verifying JWTs as defined by RFC7518. This is implemented by creating a JWTSigner and JWTVerifier struct with a required credentials.

The algorithms are as follows:

- [HMAC](./jwt-hmac)
- [ECDSA](./jwt-ecdsa)
- [RSA](./jwt-rsa)

> Follow one of the links above to configure your signing and verifying algorithm before continuing with the rest of this guide. 

---

##Step 3: Define a model to represent the user's credentials

For the initial authentication, the user will have to provide their username and password. This could be achieved with basic authentication, the Authorization header or in the body of a POST request. In this guide we will pass the username and password in the body of a POST request and use a model to represent this.

> Passwords and JWTs with sensitive data must be kept private and should always be exchanged over a secure layer like HTTPS.

Create a new file, called UserCredentials.swift:

```
touch Sources/Application/Models/UserCredentials.swift
```

Open your UserCredentials.swift file:

```
open Sources/Application/Models/UserCredentials.swift
```

Inside this file we define our UserCredentials model:

```swift
struct UserCredentials: Codable {
    let username: String
    let password: String
}
```

---

##Step 4: Authenticate the User

We need to read the user's credentials in our POST route so they can be authenticated.

Inside the POST route add:

```swift
let credentials = try request.read(as: UserCredentials.self)
// Users credentials are authenticated
```

At this stage, you would normally hash the password and verify it against a database. However, for simplicity, we are going to assume the user successfully logged in.

---

##Step 5: Create the signed JWT

A JWT contains claims about the user that we want include in subsequent requests. You can specify any information as a claim, however there are "Registered Claims" which have a pre-defined meaning:

- iss: The issuer of the token.
- sub: The subject of the token.
- aud: The audience of the token.
- exp: The expiration time which MUST be after the current date/time.
- nbf: Defines the time before which the JWT MUST NOT be accepted for processing.
- iat: The time the JWT was issued. Can be used to determine the age of the JWT.
- jti: Unique identifier for the JWT. Can be used to prevent the JWT from being replayed.

Swift-JWT comes with a struct representing these Registered Claims which we will use for our example.

Inside the POST route, beneath the code where we authenticated the user, initialize the user's claims:

```swift
let myClaims = ClaimsStandardJWT(iss: "Kitura", sub: credentials.username, exp: Date(timeIntervalSinceNow: 3600))
```

The claims information tells us the username which is the subject of the token, that they were authenticated by Kitura and that the token will expire in one hour.

Next, we will initialize our JWT:

```swift
var myJWT = JWT(claims: myClaims)
```

We can sign this JWT using the JWTSigner we created in step 2:

```swift
let signedJWT = try myJWT.sign(using: App.jwtSigner)
```

Finally we return the signed JWT string to the user:

```swift
response.send(signedJWT)
```

Our completed login route should look as follows:

```swift
app.router.post("/jwtlogin") { request, response, next in
    let credentials = try request.read(as: UserCredentials.self)
    // Users credentials are authenticated
    let myClaims = ClaimsStandardJWT(iss: "Kitura", sub: credentials.username, exp: Date(timeIntervalSinceNow: 3600))
    var myJWT = JWT(claims: myClaims)
    let signedJWT = try myJWT.sign(using: App.jwtSigner)
    response.send(signedJWT)
    next()
}
```

---

##Step 6: Test the JWT creation

Compile your project and start the server.

To test the route using curl, open Terminal and enter the following:

```
curl -X POST \
    http://localhost:8080/jwtlogin \
    -H 'content-type: application/json' \
    -d '{
    "username": "Joe Bloggs",
    "password": "password"
}'
```

You should be returned a JWT string that is structured xxxx.yyyy.zzzz where xxxx is the base64 encoded header, yyyy is the base 64 encoded claims and zzzz is the signature.

Below is an example JWT, generated using HS256 with the password "kitura". The one returned by your curl request will have different values but the same structure.

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLaXR1cmEiLCJzdWIiOiJKb2UgQmxvZ2dzIiwiZXhwIjoxNTUzMDE4Mjg0LjMyOTcwMTl9.t55WealACtYGCQGS3EQgRQuurmNSBO5fWZqzqJjEIi
```

We can decode the JWT string using the debugger at JWT.IO which allows us view the headers and claims.

---

##Step 7: Verify a JWT
So far, we have created a signed JWT, which allows a user to authenticate themselves. At this stage, the user would attach the JWT string to future requests either using cookies or the Authorization header. When we receive this JWT string on other routes, we need to verify that we signed it and it hasn't been altered.

Let's start by reading the JWT string from the Authorization header of the request. The JWT string will be contained within the second component of the header, so we validate that there are only two components within the header and that the first contains the string "Bearer".

Inside the GET route, add the following code:

```swift
let authHeader = request.headers["Authorization"]
guard let authComponents = authHeader?.components(separatedBy: " "),
    authComponents.count == 2,
    authComponents[0] == "Bearer"
else {
    let _ = response.send(status: .unauthorized)
    return try response.end()
}
```

The JWT string will be authComponents[1], so we will verify this string and use it to initialize a JWT.

Add the following code to your guard statement, below authComponents[0] == "Bearer":

```swift
let jwt = try? JWT<ClaimsStandardJWT>(jwtString: authComponents[1], verifier: App.jwtVerifier)
```

There we have it, the user's JWT is now available for us to use within our route. If we successfully initialized the JWT using the jwtVerifier, we know that we signed it in the first place and the contents haven't been changed. If the signature isn't verified, we reject the request and return the 401 unauthorized status code.

To finish, let's send the decoded JWT back to the user.

After the else closure, add the following code:

```swift
response.send(jwt)
```

Your completed GET route should now look as follows:

```swift
app.router.get("/jwtprotected") { request, response, next in
    let authHeader = request.headers["Authorization"]
    guard let authComponents = authHeader?.components(separatedBy: " "),
        authComponents.count == 2,
        authComponents[0] == "Bearer",
        let jwt = try? JWT<ClaimsStandardJWT>(jwtString: authComponents[1], verifier: App.jwtVerifier)
    else {
        let _ = response.send(status: .unauthorized)
        return try response.end()
    }
    response.send(jwt)
    next()
}
```

---

##Step 8: Test the protected Route

To test this, restart your server and send the POST request from Step 6.

Copy the returned JWT string and paste it into the following curl request:

```
curl -X GET \
http://localhost:8080/jwtprotected \
-H 'content-type: application/json' \
-H 'Authorization: Bearer <Your JWT string here>'
```

You should see your JWT with your username returned to you. This should look something like:

```
{"claims":{"iss":"Kitura","sub":"Joe Bloggs","exp":574703307.61258602},"header":{"typ":"JWT","alg":"ES256"}}
```

Congratulations! We have just created a JWT single sign on system using a Kitura Server. Your completed JWTRoutes.swift file for HS256 should look as follows:

```swift
import KituraContracts
import SwiftJWT
import Foundation


func initializeJWTRoutes(app: App) {

    app.router.post("/jwtlogin") { request, response, next in
        let credentials = try request.read(as: UserCredentials.self)
        let myClaims = ClaimsStandardJWT(iss: "Kitura", sub: credentials.username, exp: Date(timeIntervalSinceNow: 3600))
        var myJWT = JWT(claims: myClaims)
        let signedJWT = try myJWT.sign(using: App.jwtSigner)
        response.send(signedJWT)
        next()
    }

    app.router.get("/jwtprotected") { request, response, next in
        let authHeader = request.headers["Authorization"]
            guard let authComponents = authHeader?.components(separatedBy: " "),
                authComponents.count == 2,
                authComponents[0] == "Bearer",
                let jwt = try? JWT<ClaimsStandardJWT>(jwtString: authComponents[1], verifier: App.jwtVerifier)
                else {
                    let _ = response.send(status: .unauthorized)
                    return try response.end()
            }
        response.send(jwt)
        next()
    }
}

extension App {
    // Example for HMAC signer and verifier
    static let jwtSigner = JWTSigner.hs256(key: Data("kitura".utf8))
    static let jwtVerifier = JWTVerifier.hs256(key: Data("kitura".utf8))
}
```

---

##Step 9: JWTs on Codable Routes (Optional)

In our example we used raw routing since we chose to pass the user credentials via the request headers. If we want to use JWTs on our codable routes, we need to encapulate the verification and creation of the users JWT in a TypeSafeMiddleware. We can then register our TypeSafeMiddleware on a Codable route to authenticate the user and access their claims.

---

###Step 9a: Define our type safe middleware.

If you don't already have one, create a Middlewares folder:

```
mkdir Sources/Application/Middlewares
```

Create a new file, called TypeSafeJWT.swift:

```
touch Sources/Application/Middlewares/TypeSafeJWT.swift
```

Open your TypeSafeJWT.swift file:

```
open Sources/Application/Middlewares/TypeSafeJWT.swift
```

Inside this file, define TypeSafeJWT with the following code:

```
import SwiftJWT
import Kitura

struct TypeSafeJWT<C: Claims>: TypeSafeMiddleware {
    static func handle(request: RouterRequest, response: RouterResponse, completion: @escaping (TypeSafeJWT?, RequestError?) -> Void) {

    }
}
```

The TypeSafeMiddleware protocol requires us to implement the handle function. This function is where we will interact with the request headers; we then return an instance of TypeSafeJWT on success, or a RequestError on failure. The TypeSafeJWT struct is generic so it can be used on any JWT.

Within the handler we are interested in the decoded JWT so we add that as a field:

```swift
let jwt: JWT<C>
```

Finally, we initialize our JWT using the same functions as Step 7 for our protected GET route.

Inside our handle function, add the following:

```swift
let authHeader = request.headers["Authorization"]
guard let authComponents = authHeader?.components(separatedBy: " "),
    authComponents.count == 2,
    authComponents[0] == "Bearer",
    let jwt = try? JWT<C>(jwtString: authComponents[1], verifier: App.jwtVerifier)
else {
    return completion(nil, .unauthorized)
}
completion(TypeSafeJWT(jwt: jwt), nil)
```

Your completed TypeSafeJWT.swift file should look as follows:

```swift
import SwiftJWT
import Kitura

struct TypeSafeJWT<C: Claims>: TypeSafeMiddleware {
    let jwt: JWT<C>
    static func handle(request: RouterRequest, response: RouterResponse, completion: @escaping (TypeSafeJWT?, RequestError?) -> Void) {
        let authHeader = request.headers["Authorization"]
        guard let authComponents = authHeader?.components(separatedBy: " "),
            authComponents.count == 2,
            authComponents[0] == "Bearer",
            let jwt = try? JWT<C>(jwtString: authComponents[1], verifier: App.jwtVerifier)
        else {
            return completion(nil, .unauthorized)
        }
        completion(TypeSafeJWT(jwt: jwt), nil)
    }
}
```

---

###Step 9b: Register TypeSafeJWT on a route.

Back in our routes file, JWTRoutes.swift, we are going to register a new route using our TypeSafeMiddleware.

In the function initializeJWTRoutes, add a new route called "/jwtCodable"

```swift
app.router.get("/jwtCodable", handler: app.typeSafeHandler)
```

In your App extension, define the typeSafeHandler:

```swift
func typeSafeHandler(typeSafeJWT: TypeSafeJWT<ClaimsStandardJWT>, completion: (JWT<ClaimsStandardJWT>?, RequestError?) -> Void) {
    completion(typeSafeJWT.jwt, nil)
}
```

This function will run the middleware, TypeSafeJWT, and if it succeeds it will return the JWT instance, just as we did in our raw routing example above.

---

###Step 9c: Test the new Codable route

To test this route, restart your server and send the POST request from Step 6.

Copy the returned JWT string and paste it into the following curl request:

```
curl -X GET \
http://localhost:8080/jwtCodable \
-H 'content-type: application/json' \
-H 'Authorization: Bearer <Your JWT string here>'
```

We should see your JWT with your username returned to you. This should look something like:

```
{"claims":{"iss":"Kitura","sub":"Joe Bloggs","exp":574703307.61258602},"header":{"typ":"JWT","alg":"ES256"}}
```