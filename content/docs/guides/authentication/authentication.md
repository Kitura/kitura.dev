---
path: "/docs/authentication/what-is-authentication"
title: What is Authentication?
---

#What is Authentication?

Authentication is the process of confirming a user’s identity. The user provides credentials, such as a username and password, and these credentials are verified to confirm the user is who they claim to be. Once a user is authenticated, you can provide personalized content, or authorize them to access resources that are not available to everyone.

Authentication is all around us, anyone who has an account online has to step through authentication procedures each time they login. Even handheld devices use authentication, such as a passcode, or Touch ID and even Face ID. In each case the aim is the same: "Is this person who they claim to be?".

Kitura supports various types of authentication:

##Basic Authentication
The "Basic" HTTP authentication scheme is defined in [RFC 7617](https://tools.ietf.org/html/rfc7617) and transmits credentials as user ID/password pairs, encoded using Base64. The username and password are passed in plain text via the HTTP authorization header:

```swift
Authorization: Basic <"username:password".Base64Encoded()>
```

Since the password is not encrypted, this authentication scheme must be used with HTTPS.

This is the simplest authentication scheme, however it requires the user to authenticate their credentials with every request and no additional information about the user may be provided during authentication.

Kitura supports basic authentication via the [Kitura-CredentialsHTTP](https://github.com/IBM-Swift/Kitura-CredentialsHTTP) library.


##JSON Web Tokens

A JSON Web Token (JWT) defines a compact and self-contained way for securely transmitting information between parties as a JSON object. You can use a JWT to implement a Single Sign On system, whereby a user logs in once and each subsequent request will include the JWT. This allows the user to access routes, services, and resources that are permitted with that token, without having to authenticate each time.

Kitura supports JWTs via the [Swift-JWT](https://github.com/IBM-Swift/Swift-JWT) library.

##OAuth 2.0 Authentication

OAuth 2.0 is an authorization framework that enables you to authenticate a user via a trusted third party, such as Google or Facebook. Because the authentication is delegated to a trusted provider, the user does not have to create, or provide, a username and password to use your service. Once a user is authenticated, they are kept logged in with cookies via a session.

Kitura currently supports OAuth 2.0 with the following services:

- Facebook with [Kitura-CredentialsFacebook](https://github.com/IBM-Swift/Kitura-CredentialsFacebook)
- Github with [Kitura-CredentialsGithub](https://github.com/IBM-Swift/Kitura-CredentialsGitHub)
- Google with [Kitura-CredentialsGoogle](https://github.com/IBM-Swift/Kitura-CredentialsGoogle)
- Twitter with [Kitura-CredentialsTwitter](https://github.com/jacobvanorder/Kitura-CredentialsTwitter) (Third party implemented.)

---

##Next Steps

[Basic authentication guide](./basic-authentication): Learn how to add basic authentication to codable routes.

[JSON web tokens guide](./jwt): Learn how to use JWTs to implement single sign-on authentication on your Kitura routes.

[OAuth 2.0 Authentication](./oauth2): Learn how to add OAuth 2.0 authentication with Facebook or Google to your Kitura routes.
