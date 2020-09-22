---
title: "Swift-JWT 3.3: Adding ES256, ES384, and ES512 Support"
blurb: We have just released version 3.3 of Swift-JWT. This utilizes our new BlueECC repository to support signing and verifying of JWTs using various algorithms
date: "2019-03-12"
author: Andrew Lees
path: /blogs/swift-jwt-es256-es384-es512
---

We have just released version 3.3 of [Swift-JWT](https://github.com/Kitura/Swift-JWT). This utilizes our new [BlueECC](https://github.com/Kitura/BlueECC) repository to support signing and verifying of JWTs using ES256, ES384 and ES512 algorithms. In this blog, we will explain what these algorithms are and demonstrate how to use them in Swift-JWT.

##Elliptic Curve Digital Signature Algorithm (ECDSA)

To explain why you should use these algorithms, I’ll quote the JSON Web Algorithms specification:

> The Elliptic Curve Digital Signature Algorithm (ECDSA) provides for the use of Elliptic Curve Cryptography, which is able to provide equivalent security to RSA cryptography but using shorter key sizes and with greater processing speed for many operations. This means that ECDSA digital signatures will be substantially smaller in terms of length than equivalently strong RSA digital signatures.

In short they are faster, use smaller keys and produce shorter signatures. For these reasons, the specification recommends elliptic curve above RSA and states that the requirement for ECDSA support will be increased in future releases.

Finally, Apple requires you use ES256 as an authentication method for lots of their services, including [Apple Push Notification service](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CommunicatingwithAPNs.html#//apple_ref/doc/uid/TP40008194-CH11-SW1) (APNs), [MusicKit](https://help.apple.com/developer-account/#/devce5522674), [DeviceCheck](https://help.apple.com/developer-account/#/devc3cc013b7) and [App Store Connect API](https://developer.apple.com/videos/play/wwdc2018/303/).

---

##The ES256, ES384 and ES512 Algorithms

There are currently three recognized implementations of ECDSA for JSON Web Tokens (JWT):

- ES256 – ECDSA using P-256 and SHA-256
- ES384 – ECDSA using P-384 and SHA-384
- ES512 – ECDSA using P-521 and SHA-512

The P-XXX refers to the prime256v1, secp384r1, and secp521r1 elliptic curves. These curves generate a key pair with XXX number of private key data bits. The SHA-XXX refers to the SHA algorithm that is used to hash the plaintext prior to it being signed. Using larger keys provides more security but requires longer signatures and more processing power. We recommend ES256 for most users since it provides the same security as 3072 bit RSA key, which is considered secure beyond 2030.

If you would like to know more about elliptic curve cryptography, check out our [BlueECC blog post](/blogs/blueecc-elliptic-curve-cryptography).

---

##Elliptic curve key pair

ECDSA uses asymmetric elliptic curve keys. These can be generated through [Apple](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2Fresources%2F&rv=1), [OpenSSL](https://wiki.openssl.org/index.php/Command_Line_Elliptic_Curve_Operations#Generating_EC_Keys_and_Parameters) or using [BlueECC](https://github.com/Kitura/BlueECC#elliptic-curve-private-key). For a p-256 curve, these keys should look something like this:

```swift
let privateKey = """
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIJX+87WJ7Gh19sohyZnhxZeXYNOcuGv4Q+8MLge4UkaZoAoGCCqGSM49
AwEHoUQDQgAEikc5m6C2xtDWeeAeT18WElO37zvFOz8p4kAlhvgIHN23XIClNESg
KVmLgSSq2asqiwdrU5YHbcHFkgdABM1SPA==
-----END EC PRIVATE KEY-----
"""
let publicKey = """
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEikc5m6C2xtDWeeAeT18WElO37zvF
Oz8p4kAlhvgIHN23XIClNESgKVmLgSSq2asqiwdrU5YHbcHFkgdABM1SPA==
-----END PUBLIC KEY-----
"""
```

The PEM format, refers to the “BEGIN”/”END” headers with some base64Encoded ASN1 data between them. If you decode the p-256 private key’s ASN1 data (e.g. [using this online decoder](https://lapo.it/asn1js/)) there are three main components of the key:

- 32 bytes of private data
- an object identifier that specifies the elliptic curve
- 65 bytes of public key data

When you create a ES256/ES384/ES512 JWTSigner or JWTVerifier in Swift-JWT, it will extract the required components from the PEM string.

```swift
let signer = JWTSigner.es256(privateKey: Data(privateKey.utf8))
let verifier = JWTVerifier.es256(publicKey: Data(publicKey.utf8))
```

---

##ECDSA signing and verifying

Once you have your signer and verifier, the process is exactly the same as RSA. To demonstrate this we will sign a JWT using ES256:

```swift
let claims = ClaimsStandardJWT(iss: "Kitura", sub: "Joe Bloggs")
var myJWT = JWT(claims: claims)
do {
    let signedJWT = try myJWT.sign(using: signer)
    let verified = JWT<ClaimsStandardJWT>.verify(signedJWT, using: verifier)
} catch {
    print("JWT error: \(error)")
}
```

This will produce a boolean value of `verified` and a signed JWT String that is formatted:
`<encoded header>.<encoded claims>.<signature>.`
An example signed JWT using the keys from above would be:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJraXR1cmEiLCJzdWIiOiJKb2UgQmxvZ2dzIn0._RcOxoU-3IYwFA7W81FmMEA5ON7QDB0mQ6w3HfMg9aOxKaT6ewb6WJcFdMjKggCTjBvlX5Mjr2icKkfrqTUl9A
```

You can inspect this JWT String using the [jwt.io](http://jwt.io) debugger. Select ES256, copy across the private key, public key and JWT string. The debugger will decode your header and claims, as well as verifying the signature.

---

## Next Steps
Congratulations, you have just used an Elliptic Curve Digital Signature Algorithm with a JWT! Your ES256 signature will be 86 characters versus 171 characters for RS256, in addition to being faster and more secure.

If you would like include Swift-JWT in your project, [check it out on GitHub](https://github.com/Kitura/Swift-JWT).

If you would like to learn more about the Swift-JWT API, [visit our API reference](https://ibm-swift.github.io/Swift-JWT/index.html).

Any questions or comments? Please join the Kitura community on [Slack](http://swift-at-ibm-slack.mybluemix.net/?cm_sp=dw-bluemix-_-swift-_-devcenter&_ga=2.58648362.186671014.1570626561-1743126121.1570022962&cm_mc_uid=83263075142115698398229&cm_mc_sid_50200000=53695431570707266328)!
