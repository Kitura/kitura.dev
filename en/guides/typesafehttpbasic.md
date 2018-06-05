<div class="titleBlock">
  <h1>Type-Safe HTTP basic authentication</h1>
  <p>How to add HTTP basic authentication support to Kitura's Codable Routing</p>
</div>

## Introduction
Kitura 2.4 introduces "Type-safe Middleware": middlewares with the structure and data types that you define. On successfully executing, they are instantiated and passed to your handler. We also introduce `TypeSafeCredentials`, a protocol that implements `TypeSafeMiddleware` to authenticate a request on a Codable route and initialize itself with the authenticated user's data.

HTTP Basic authentication transmits credentials in an "Authorization" header as base64 encoded user ID/password pairs. Many clients also let you send the username and the password in the URL as follows:

```
https://username:password@www.example.com/
```

However some web browsers disable this for security reasons.

This guide steps you through using `TypeSafeHTTPBasic`, a `TypeSafeCredentials` plugin for safe and easy HTTP basic authentication in Codable routes.

## Adding TypeSafeHTTPBasic to your project
If you do not have an existing project, run `kitura init` in terminal to generate a new project.

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

At the bottom of `Application.swift`, define a public struct called `MyBasicAuth` that conforms to the `TypeSafeHTTPBasic` protocol:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic {

}
```
2) Add protocol stubs:

Xcode should display the message:
`Type 'MyBasicAuth' does not conform to protocol 'TypeSafeCredentials'`

Click "Fix" to autogenerate the stubs and produce the struct below:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic {
    public static func verifyPassword(username: String, password: String, callback: @escaping (MyBasicAuth?) -> Void) {
     
    }

    public var id: String
}
```

3) Inside MyBasicAuth, add an authentication dictionary:


```swift
public static let authenticate = ["username" : "password"]
```

__Note:__ In a real project, never store passwords in plain text!

4) Define verifyPassword:

The function, `verifyPassword`, takes a username and password and, on success, returns a `MyBasicAuth` instance . We want to check if the password matches the user's stored password. On successful match, we initialize `MyBasicAuth` with an `id` equal to username.

```swift
if let storedPassword = authenticate[username], storedPassword == password {
    callback(MyBasicAuth(id: username))
    return
}
callback(nil)
```
This function is asyc, so that you can perform asyc actions to verify the password, e.g. looking up the username and password in a database. You must call the callback closure with either an instance of `Self` or `nil` before exiting `verifyPassword`. If you do not, the server will not know to continue and you will recieve a 503 "Service Unavailable" error, when you call the route. 

5) Your complete struct should now look as follows:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic {

    public static let authenticate = ["username" : "password"]

    public static func verifyPassword(username: String, password: String, callback: @escaping (MyBasicAuth?) -> Void) {
        if let storedPassword = authenticate[username], storedPassword == password {
            callback(MyBasicAuth(id: username))
            return
        }
        callback(nil)
    }

    public var id: String
}
```

## Using TypeSafeHTTPBasic in a route

1) Inside `postInit()`, add the following route:
```swift
router.get("/basic") { (user: MyBasicAuth, respondWith: (MyBasicAuth?, RequestError?) -> Void) in
    print("authenticated \(user.id) using \(user.provider)")
    respondWith(user, nil)
}
```
2) Start your Kitura server
3) Go to [http://localhost:8080/basic](http://localhost:8080/basic)
4) Login with User Name: username, Password: password
5) You will successfully login and be returned your username

Congratulations, you have just implemented HTTP basic authentication of a Codable route!!!

The browser will store your login credentials and automatically log you in if you return to the route. Use a private window if you would like to test incorrect authentication.

## Using TypeSafeHTTPBasic with the ORM

This example showed a simple struct that contains only the required id. A real world project would probably have a user profile with lots of fields, which is keyed by the unique id. We demonstrate how to implement this using [Swift-Kuery-ORM](https://github.com/IBM-Swift/Swift-Kuery-ORM).

1) Set up the ORM and connect it to a database by following the instructions in the [README](https://github.com/IBM-Swift/Swift-Kuery-ORM/blob/master/README.md) using `MyBasicAuth` as your Model.

2) Make `MyBasicAuth` a Model:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic, Model {
```
3) Inside `MyBasicAuth`, set `id` as the id column in the database
```swift
static var idColumnName = "id"
```
4) Remove `public static let authenticate = ["username" : "password"]`
5) Add in a new fields for the password and a custom field:
```swift
private let password: String
public let customField: Int 
```
6) Change `verifyPassword` to initialize `MyBasicAuth` from the database:
```swift
if let userProfile = MyBasicAuth.find(id: username) {
    if password == userProfile.password {
        callback(userProfile)
        return
    }   
}
callback(nil)
```
7) MyBasicAuth should now look as follows:
```swift
public struct MyBasicAuth: TypeSafeHTTPBasic, Model {

    static var idColumnName = "id"

    public static func verifyPassword(username: String, password: String, callback: @escaping (MyBasicAuth?) -> Void) {
        if let userProfile = MyBasicAuth.find(id: username) {
            if password == userProfile.password {
                callback(userProfile)
                return
            }   
        }
        callback(nil)
    }

    public var id: String    
    private let password: String
    public let customField: Int 
}
```

In this example, we have implemented the verifyPassword function by retrieving a user’s profile from a database. A profile with an id matching the supplied username is retrieved. If no matching id is found, or if the supplied password does not match, the middleware fails. If a match is found, the ORM returns an instance of MyBasicAuth, which is then provided to the route handler. The instance fields on `MyBasicAuth` should match your user data giving you type-safe authentication in your Codable routes!
