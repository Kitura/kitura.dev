---
path: "/docs/authentication/jwt"
title: JSON Web Token Authentication
---

#JSON Web Token Authentication
A JSON Web Token (JWT) defines a compact and self-contained way for securely transmitting information between parties as a JSON object. You can find out more about JWTs at [JWT.IO](https://jwt.io/).

[Swift-JWT](https://github.com/Kitura/Swift-JWT) is our implementation of JSON Web Token using Swift. It allows you to create, sign and verify JWTs on iOS, macOS and Linux using a range of algorithms.  [Kitura-CredentialsJWT](https://github.com/Kitura/Kitura-CredentialsJWT) is a JWT plugin to use with the existing Kitura-Credentials package that offers both Codable and Raw routing methods for easily authenticating JWTs. This guide will demonstrate how to use Swift-JWT and Kitura-CredentialsJWT to implement Single Sign On (SSO) authentication for your Kitura routes. This will allow a user to sign in once and then to access resources from other routes without having to repeat the authentication process.

---

##Step 1: Create the JWT routes

To use JWTs from a server, we need to add [Kitura-CredentialsJWT](https://github.com/Kitura/Kitura-CredentialsJWT#add-dependencies) to our dependencies.

> If you don't have a server, follow our [Create a server](../getting-started/create-server-cli) guide.

Once we have added Kitura-CredentialsJWT, we need a file for our JWT routes.

Firstly, open your `Application.swift` file in your default text editor:

```
open Sources/Application/Application.swift
```

Inside the `postInit()` function add:

```swift
initializeJWTRoutes(app: self)
```

Create a new file, called `JWTRoutes.swift`:

```
touch Sources/Application/Routes/JWTRoutes.swift
```

Open your `JWTRoutes.swift` file:

```swift
open Sources/Application/Routes/JWTRoutes.swift
```

Inside this file, add the following code:

```swift
import Foundation
import KituraContracts
import CredentialsJWT

func initializeJWTRoutes(app: App) {
    app.router.post("/jwtlogin") { request, response, next in
        // Read credentials and generate JWT here
        next()
    }
}
extension App {
  // Define JWT signer and verifier here
}
```

This code imports our required modules, sets up the framework for a routes page and defines the two raw routes that we will use in our guide.

---

##Step 2: Set up your signing and verifying algorithm

Swift-JWT supports multiple algorithms for signing and verifying JWTs as defined by RFC7518. This is implemented by creating a `JWTSigner` and `JWTVerifier` struct with a required credentials.

The algorithms are as follows:

- [HMAC](./jwt-hmac)
- [ECDSA](./jwt-ecdsa)
- [RSA](./jwt-rsa)

> Follow one of the links above to configure your signing and verifying algorithm before continuing with the rest of this guide.

---

##Step 3: Define a model to represent the user's credentials

For the initial authentication, the user will have to provide their username and password. This could be achieved with basic authentication, the `Authorization` header or in the body of a `POST` request. In this guide we will pass the username and password in the body of a `POST` request and use a model to represent this.

> Passwords and JWTs with sensitive data must be kept private and should always be exchanged over a secure layer like HTTPS.

Create a new file, called `UserCredentials.swift`:

```
touch Sources/Application/Models/UserCredentials.swift
```

Open your `UserCredentials.swift` file:

```
open Sources/Application/Models/UserCredentials.swift
```

Inside this file we define our `UserCredentials` model:

```swift
struct UserCredentials: Codable {
    let username: String
    let password: String
}
```

---

##Step 4: Authenticate the User

We need to read the user's credentials in our `POST` route so they can be authenticated.

Inside the `POST` route add:

```swift
let credentials = try request.read(as: UserCredentials.self)
// Users credentials are authenticated
```

At this stage, you would normally hash the password and verify it against a database. However, for simplicity, we are going to assume the user successfully logged in.

---

##Step 5: Create the signed JWT

A JWT contains claims about the user that we want include in subsequent requests. You can specify any information as a claim, however there are "Registered Claims" which have a pre-defined meaning:

- `iss`: The issuer of the token.
- `sub`: The subject of the token.
- `aud`: The audience of the token.
- `exp`: The expiration time which MUST be after the current date/time.
- `nbf`: Defines the time before which the JWT MUST NOT be accepted for processing.
- `iat`: The time the JWT was issued. Can be used to determine the age of the JWT.
- `jti`: Unique identifier for the JWT. Can be used to prevent the JWT from being replayed.

Swift-JWT comes with a struct representing these Registered Claims which we will use for our example.

Inside the `POST` route, beneath the code where we authenticated the user, initialize the user's claims:

```swift
let myClaims = ClaimsStandardJWT(iss: "Kitura", sub: credentials.username, exp: Date(timeIntervalSinceNow: 3600))
```

The claims information tells us the username which is the `subject` of the token, that they were authenticated by Kitura and that the token will expire in one hour.

Next, we will initialize our JWT:

```swift
var myJWT = JWT(claims: myClaims)
```

We can sign this JWT using the `JWTSigner` we created in step 2:

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

Below is an example JWT, generated using `HS256` with the password "kitura". The one returned by your curl request will have different values but the same structure.

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLaXR1cmEiLCJzdWIiOiJKb2UgQmxvZ2dzIiwiZXhwIjoxNTUzMDE4Mjg0LjMyOTcwMTl9.t55WealACtYGCQGS3EQgRQuurmNSBO5fWZqzqJjEIi
```

We can decode the JWT string using the debugger at [jwt.io](https://jwt.io) which allows us view the headers and claims.

---

##Step 7: Verify a JWT

So far, we have created a signed JWT, which allows a user to authenticate themselves. At this stage, the user would attach the JWT string to future requests either using cookies or the `Authorization` header. When we receive this JWT string on other routes, we need to verify that we signed it and it hasn't been altered.

From here we will use the CredentialsJWT plugin for authenticating the user with the earlier received token.

After the `POST` function, add the following to the file:

```swift
let jwtCredentials = CredentialsJWT<ClaimsStandardJWT>(verifier: App.jwtVerifier)
let authenticationMiddleware = Credentials()
authenticationMiddleware.register(plugin: jwtCredentials)
app.router.get("/jwtprotected", middleware: authenticationMiddleware)
app.router.get("/jwtprotected") { request, response, next in
        guard let userProfile = request.userProfile else {
                Log.verbose("Failed raw token authentication")
                response.status(.unauthorized)
                try response.end()
                return
            }
        response.send("\(userProfile.id)\n")
            next()
        }
```

Let's break these lines down individually. The first line creates a CredentialsJWT instance with the default options using the built in `ClaimsStandardJWT` claims from the Swift-JWT package.  The second line creates the middleware instance using the Credentials package that we can register plugins to.  The third line registers the created CredentialsJWT instance to the created middleware instance and the line after adds a `GET` route to the router that allows an `authentication` request to take place.  The final line is the declaration of the function that will verify the JWT we send, if the request is authorized, then the response sent is the `id` field of your JWT.

---

##Step 8: Test the protected Route

To test this, restart your server and send the `POST` request from Step 6.

Copy the returned JWT string and paste it into the following curl request:

```
curl -X GET \
http://localhost:8080/jwtprotected \
-H 'X-Token-Type: JWT' \
-H 'Authorization: Bearer <Your JWT string here>'
```

You should see your username returned to you. This should look something like:

```
Joe Bloggs
```

Congratulations! We have just created a JWT single sign on system using a Kitura Server. Your completed `JWTRoutes.swift` file for `HS256` should look as follows:

```swift
import Foundation
import KituraContracts
import CredentialsJWT
import SwiftJWT
import Credentials
import LoggerAPI

func initializeJWTRoutes(app: App) {

    app.router.post("/jwtlogin") { request, response, next in
        let credentials = try request.read(as: UserCredentials.self)
        // Users credentials are authenticated
        let myClaims = ClaimsStandardJWT(iss: "Kitura", sub: credentials.username, exp: Date(timeIntervalSinceNow: 3600))
        var myJWT = JWT(claims: myClaims)
        let signedJWT = try myJWT.sign(using: App.jwtSigner)
        response.send(signedJWT + "\n")
        next()
    }

    let jwtCredentials = CredentialsJWT<ClaimsStandardJWT>(verifier: App.jwtVerifier)
    let authenticationMiddleware = Credentials()
    authenticationMiddleware.register(plugin: jwtCredentials)
    app.router.get("/jwtprotected", middleware: authenticationMiddleware)
    app.router.get("/jwtprotected") { request, response, next in
        guard let userProfile = request.userProfile else {
                Log.verbose("Failed raw token authentication")
                response.status(.unauthorized)
                try response.end()
                return
            }
        response.send("\(userProfile.id)\n")
            next()
        }
}

extension App {
    // Define JWT signer and verifier here
    static let jwtSigner = JWTSigner.hs256(key: Data("kitura".utf8))
    static let jwtVerifier = JWTVerifier.hs256(key: Data("kitura".utf8))
}

```

---

##Step 9: Using custom claims (Optional)

You may want to use your own set of custom claims for your JWT.  For this to work, we need to specify the `subject` and `UserProfileDelegate` options.

First we will create our claims structure, in our `JWTRoutes.swift` file:

```swift
struct MyClaims: Claims {
  let id: String
  let fullName: String
  let email: String
}
```

Now we need to edit our `UserCredentials` model to contain these additional values, so go into your `UserCredentials.swift` file and add these values to your model:

```swift
struct UserCredentials: Codable {
    let username: String
    let password: String
    let email: String
    let fullName: String
}
```

>For simplicity, in this example, the id will have the same value as the username.

We need to rewrite our JWT generation so that it creates a JWT with the correct claims:

```swift
app.router.post("/jwtlogin") { request, response, next in
    let credentials = try request.read(as: UserCredentials.self)
    // Users credentials are authenticated
    let myClaims = MyClaims(id: credentials.username, fullName: credentials.fullName, email: credentials.email)
    var myJWT = JWT(claims: myClaims)
    let signedJWT = try myJWT.sign(using: App.jwtSigner)
    response.send(signedJWT)
    next()
}
```

Let's test our newly created route!

```
curl -X POST \
    http://localhost:8080/jwtlogin \
    -H 'content-type: application/json' \
    -d '{
    "username": "JoeBloggs312",
    "password": "password",
    "email": "joebloggs@email.com",
    "fullName": "Joe Kitura Bloggs"
}'
```

None of these claims are part of the `ClaimsStandardJWT` claims and the `subject` claim is not present, therefore we need to use the `UserProfileDelegate` and update it with our custom claims.

After our `POST` route, add:

```swift
struct MyDelegate: UserProfileDelegate {
    func update(userProfile: UserProfile, from dictionary: [String:Any]) {
        // `userProfile.id` already contains `id`
        userProfile.displayName = dictionary["fullName"]! as! String
        let email = UserProfile.UserProfileEmail(value: dictionary["email"]! as! String, type: "home")
        userProfile.emails = [email]
    }
}
```

Then we need to declare our instance of CredentialsJWT with our newly defined options, as well as setting the `subject` claim to `id`:

```swift
let jwtCredentials = CredentialsJWT<MyClaims>(verifier: App.jwtVerifier, options: [CredentialsJWTOptions.subject: "id", CredentialsJWTOptions.userProfileDelegate: MyDelegate()])
```

Finally we create our middleware and register our plugin to it, the same as we have done earlier:

```swift
let authenticationMiddleware = Credentials()
authenticationMiddleware.register(plugin: jwtCredentials)
app.router.get("/jwtprotected", middleware: authenticationMiddleware)
app.router.get("/jwtprotected") { request, response, next in
    guard let userProfile = request.userProfile else {
            Log.verbose("Failed raw token authentication")
            response.status(.unauthorized)
            try response.end()
            return
        }
    response.send("\(userProfile.id)\n")
        next()
    }
```

Using the same terminal commands as earlier, you can test your JWT generation and authentication:

```
curl -X GET \
http://localhost:8080/jwtprotected \
-H 'X-Token-Type: JWT' \
-H 'Authorization: Bearer <Your JWT string here>'
```

Congratulations! You are now using your own set of custom claims to generate a JWT and authenticate a user!

##Step 10: JWTs on Codable Routes (Optional)

In our example we used raw routing since we chose to pass the user credentials via the request headers. If we want to use JWTs on our codable routes, we need to encapsulate the verification and creation of the users JWT in a `TypeSafeMiddleware`.

###Step 10a: Register TypeSafeJWT on a route.

In the `JWTRoutesFile.swift` we are going to create a new route for a `TypeSafeJWT`.

In the function `initializeJWTRoutes`, declare the verifier for the `TypeSafeJWT` (this example is using the `HS256` algorithm):

```swift
TypeSafeJWT.verifier = .hs256(key: Data("kitura".utf8))
```

We will then add the codable route handler, the handler will only be invoked if the JWT can be successfully verified, and contains the required claims.

```swift
app.router.get("/jwtcodable") {  (jwt: JWT<ClaimsStandardJWT>, respondWith: (JWT<ClaimsStandardJWT>?, RequestError?) -> Void) in
     respondWith(jwt, nil)
}
```

---

###Step 10b: Test the new Codable route

To test this route, restart your server and send the `POST` request from Step 6.

Copy the returned JWT string and paste it into the following curl request:

```
curl -X GET \
http://localhost:8080/jwtcodable \
-H 'X-Token-Type: JWT' \
-H 'Authorization: Bearer <Your JWT string here>'
```

You should see your JWT claims returned to you. This should look something like:

```
{"claims":{"iss":"Kitura","sub":"Joe Bloggs","exp":574703307.61258602},"header":{"typ":"JWT","alg":"HS256"}}
```
