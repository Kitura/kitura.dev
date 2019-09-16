---
path: "/docs/authentication/jwt-hmac"
title: Signing and verifying JWTs with HMAC
---

#Signing and verifying JWTs with HMAC

You can process JWTs using a Hashed Message Authentication Code (HMAC). This uses a shared symmetric key as a password for both signing and verifying. This is simple and fast but requires a secure method of sending the password to the verifier.

---

##Step 1: Create your JWTSigner

The JWTSigner is used to sign a JWT instance and produce a signed JWT string.

Inside the App extension, create an HMAC JWTSigner by providing a password:

```swift
static let jwtSigner = JWTSigner.hs256(key: Data("kitura".utf8))
```

---

##Step 2: Create your JWTVerifier

The JWTVerifier is used to verify a signed JWT string. This ensures the signature was generated using the same password and the JWT has not been changed.

Inside the App extension, we create an HMAC JWTVerifier by providing the same password as before:

```swift
static let jwtVerifier = JWTVerifier.hs256(key: Data("kitura".utf8))
```

---

Now you can return to the [JSON Web Token Authentication](./jwt#step-2-set-up-your-signing-and-verifying-algorithm) guide.