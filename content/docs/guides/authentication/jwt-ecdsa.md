---
path: "/docs/authentication/jwt-ecdsa"
title: Signing and verifying JWTs with ECDSA
---

#Signing and verifying JWTs with ECDSA

You can process JWTs using Elliptic Curve Digital Signature Algorithm (ECDSA). This uses asymmetric keys with a private key for signing and a public key for verifying. The public key allows anyone to verify a JWT but only the provider can create them. ECDSA is recommended over RSA since it uses smaller keys, requires less processing power and produces smaller signatures.

---

##Step 1: Create your elliptic curve keys

Elliptic curve keys can be generated through [Apple](https://developer.apple.com/account/ios/authkey), [OpenSSL](https://wiki.openssl.org/index.php/Command_Line_Elliptic_Curve_Operations#Generating_EC_Keys_and_Parameters) or using [BlueECC](https://github.com/IBM-Swift/BlueECC#elliptic-curve-private-key).

For simplicity you can use the following pre-generated keys.

Add the following EC PEM strings (Or strings you have generated) to your `App` extension:

```swift
static let privateKey = """
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIJX+87WJ7Gh19sohyZnhxZeXYNOcuGv4Q+8MLge4UkaZoAoGCCqGSM49
AwEHoUQDQgAEikc5m6C2xtDWeeAeT18WElO37zvFOz8p4kAlhvgIHN23XIClNESg
KVmLgSSq2asqiwdrU5YHbcHFkgdABM1SPA==
-----END EC PRIVATE KEY-----
"""
static let publicKey = """
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEikc5m6C2xtDWeeAeT18WElO37zvF
Oz8p4kAlhvgIHN23XIClNESgKVmLgSSq2asqiwdrU5YHbcHFkgdABM1SPA==
-----END PUBLIC KEY-----
"""
```

---

##Step 2: Create your JWTSigner

The `JWTSigner` is used to sign a `JWT` instance and produce a signed JWT string.

Inside the `App` extension, create an ECDSA `JWTSigner` by providing the private key:

```swift
@available(OSX 10.13, *)
static let jwtSigner = JWTSigner.es256(privateKey: Data(privateKey.utf8))
```

> ECDSA algorithms such as `es256` use [BlueECC](https://github.com/IBM-Swift/BlueECC), which is only available on macOS 10.13 or newer. When using them you will need to us `@available` to handle cases where the operating system version is not high enough.

---

##Step 3: Create your JWTVerifier

The `JWTVerifier` is used to verify a signed JWT string. This ensures the signature was generated using the corresponding private key and the JWT has not been changed.

Inside the `App` extension, we create an ECDSA `JWTVerifier` by providing the public key:

```swift
@available(OSX 10.13, *)
static let jwtVerifier = JWTVerifier.es256(publicKey: Data(publicKey.utf8))
```

---

Now you can return to the [JSON Web Token Authentication](./jwt#step-2-set-up-your-signing-and-verifying-algorithm) guide.
