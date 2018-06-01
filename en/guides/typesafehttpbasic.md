<div class="titleBlock">
  <h1>Type-Safe HTTP basic authentication</h1>
  <p>How to add HTTP basic authentication support to Kitura's Codable Routing</p>
</div>

## Introduction
Kitura 2.4 introduces "Type-safe Middleware": middlewares that have a structure and data types that you define, that are instantiated and passed to your handler upon a request. We also introduce `TypeSafeCredentials`, a protocol that implements `TypeSafeMiddleware` to authenticate a request on a Codable route and initialize itself with the authenticated users data.

HTTP Basic authentication transmits credentials in an "Authorization" header as base64 encoded user ID/password pairs. Many clients also let you send the username and the password in the URL as follows:

```
https://username:password@www.example.com/
```

However some web browsers disable this for security reasons.

This guide steps you through using `TypeSafeHTTPBasic`, a `TypeSafeCredentials` plugin for safe and easy HTTP basic authentication in Codable routes.

## Adding TypeSafeHTTPBasic to your project

1) Add `Kitura-CredentialsHTTP` to your `Package.swift` dependencies:
```swift
.package(url: "https://github.com/IBM-Swift/Kitura-CredentialsHTTP.git", from: "2.1.0"),
```

2) Add `CredentialsHTTP` to your Application targets:
```swift
.target(name: "Application", dependencies: [ "CredentialsHTTP", ...
```

3) Regenerate your Xcode project:
```
swift package generate-xcodeproj
```

4) Open your Xcode project and go to Sources >> Application >> Application.swift

5) Add `CredentialsHTTP` to your import statements:
```swift
import CredentialsHTTP
```

## Defining a TypeSafeHTTPBasic object

We will declare a struct which conforms to `TypeSafeHTTPBasic`. This will be initialized when our route is successfully authenticated and we will be able to access the authenticated user's id within our Codable route.

1) Define the TypeSafeHTTPBasic Struct:

At the bottom of `Application.swift`, Define a public struct called `MyBasicAuth` and set it to conforms to `TypeSafeHTTPBasic`:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic {

}
```
2) Add protocol stubs:

Xcode should appear with the message:
`Type 'MyBasicAuth' does not conform to protocol 'TypeSafeCredentials'`

Click fix to autogenerate the stubs and produce the below struct:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic {
    public static var verifyPassword: ((String, String, @escaping (MyBasicAuth?) -> Void) -> Void)

    public var id: String
}
```

3) Inside MyBasicAuth, add an authentication dictionary:


```swift
public static let authenticate = ["username" : "password"]
```

__Note:__ In a real project, never store passwords in plain text!

4) Define verifyPassword:

The closure, `verifyPassword`, takes a username and password and returns a `MyBasicAuth` instance on success. We want to check if the password matches the user's stored password. On successful match, we initialise `MyBasicAuth` with an `id` equal to username.

```swift
public static var verifyPassword: ((String, String, @escaping (MyBasicAuth?) -> Void) -> Void) =
   { userId, password, callback in
       if let storedPassword = authenticate[userId], storedPassword == password {
           callback(MyBasicAuth(id: userId))
       } else {
           callback(nil)
       }
   }
```

5) Your complete struct should now look as follows:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic {

    public static let authenticate = ["username" : "password"]

    public static var verifyPassword: ((String, String, @escaping (MyBasicAuth?) -> Void) -> Void) =
    { userId, password, callback in
        if let storedPassword = authenticate[userId], storedPassword == password {
            callback(MyBasicAuth(id: userId))
        } else {
            callback(nil)
        }
    }
    public var id: String
}
```

## Using your MyBasicAuth in a route

1) Inside postInit(), add the following route:
```swift
router.get("/basic") { (user: MyBasicAuth, respondWith: (MyBasicAuth?, RequestError?) -> Void) in
    print("authenticated \(user.id) using \(user.provider)")
    respondWith(user, nil)
}
```

2) Go to [http://localhost:8080/basic](http://localhost:8080/basic)
3) Login with User Name: username, Password: password
4) You will successfully login and be returned your username

Congratulations, you have just implemented HTTP basic authentication of a Codable route!!!

The browser will store your login credentials and automatically log you in if you return to the route. Use a private window if you would like to test failed authentication.

## Using TypeSafeHTTPBasic with the ORM

This example is a simple struct just containing the required id. A real world project would probably have a user profile with lots of fields which is keyed by the unique id. We will show you how to implement this is using [Swift-Kuery-ORM](https://github.com/IBM-Swift/Swift-Kuery-ORM).

 1) Set up the ORM and connect it to a database by following the instructions in the [README](https://github.com/IBM-Swift/Swift-Kuery-ORM/blob/master/README.md) using `MyBasicAuth` as your Model.

2) Make `MyBasicAuth` a Model:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic, Model {
```
3) Inside MyBasicAuth, Set id as the id column in the database
```swift
static var idColumnName = "id"
```
4) Inside verifyPassword, Initialize MyBasicAuth from the database:
```swift
if let storedPassword = authenticate[userId], storedPassword == password {
    let userProfile: MyBasicAuth = Grade.find(id: userId)
    callback(userProfile)
}
```
5) MyBasicAuth should now look as follows:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic, Model {

    static var idColumnName = "id"

    public static let authenticate = ["username" : "password"]

    public static var verifyPassword: ((String, String, @escaping (MyBasicAuth?) -> Void) -> Void) =
    { userId, password, callback in
        if let storedPassword = authenticate[userId], storedPassword == password {
            let userProfile: MyBasicAuth = MyBasicAuth.find(id: userId)
            callback(userProfile)
        } else {
            callback(nil)
        }
    }

    public var id: String    
}
```

Now when your route authenticates, a `MyBasicAuth` instance with a primary key matching the provided user name is returned. The instance fields on `MyBasicAuth` should match your user data giving you type-safe authentication in your Codable routes!
