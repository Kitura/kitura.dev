---
title: "BlueECC: Encrypt, Decrypt, Sign and Verify with Elliptic Curve"
blurb: We have just released BlueECC, a new Swift package for cross-platform elliptic curve cryptography
date:  "2019-03-04"
author: Andrew Lees
path: /blogs/blueecc-elliptic-curve-cryptography
---

We have just released [BlueECC](https://github.com/Kitura/BlueECC), a new Swift package for cross-platform elliptic curve cryptography. This enables you to encrypt, decrypt, sign and verify data using elliptic curve asymmetric keys. This blog post will explain what elliptic curves are, why you would use them over RSA and provides examples of the BlueECC API.

##What is Elliptic Curve Cryptography?

In RSA cryptography, the security of the public/private key pair relies on the complexity of factorizing a large integer. In Elliptic Curve Cryptography, the security relies on the complexity of finding the discrete logarithm of a random elliptic curve element.

BlueECC uses the Elliptic Curve Integrated Encryption Scheme ([ECIES](https://www.cryptopp.com/wiki/Elliptic_Curve_Integrated_Encryption_Scheme)) and Elliptic Curve Digital Signature Algorithm ([ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)) for its cryptography. Fortunately, you do not need to know the mathematics behind the algorithms to use them. They work just like RSA with a public key for encryption/verifying and a private key for decryption/signing.

---

##Why use Elliptic Curve over RSA?

Elliptic curve (EC) keys allow you to perform the same asymmetric public key cryptography as RSA keys. However, they have gained popularity due to the following advantages:

- Smaller key sizes (a 256 bit EC private key is considered equivalent to a 3072 bit RSA private key)
- Faster key generation
- Faster signing/verifying
- Smaller signatures (approximately 1/6th the size of an equivalent RSA signature)
- Smaller encryption payloads (EC adds 81 bytes per message vs 528 bytes for RSA)

---

##BlueECC Example

Under the covers, BlueECC uses the Apple Security framework on macOS/iOS and OpenSSL on Linux. This means you can use it on both platforms without installing additional dependencies. BlueECC is available to import through Swift Package Manager or CocoaPods.

###Generating EC keys

We will use the OpenSSL command line to generate our EC private and public keys.

1. On macOS you can install OpenSSL using `brew`:

```
$ brew install openssl
```

2. Once you have installed OpenSSL, create your private key:

```
$ openssl ecparam -name prime256v1 -genkey -noout -out ec256priv.pem
```

3. Using the private key, create your public key:

```
$ openssl ec -in ec256priv.pem -pubout -out ec256pub.pem
```

This will have created two files called `ec256priv.pem` and `ec256pub.pem`. Open them in a text editor and you will see EC keys for the prime256v1 curve in PEM format. These can then be passed to BlueECC to create your keys:

```swift
let ecPubKey = try ECPublicKey(key: "<publicPEM>")
let ecPrivKey = try ECPrivateKey(key: "<privatePEM>")
```

Alternatively, you can generate the EC Keys directly using the BlueECC:

```swift
let ecPubKey = try ecPrivKey.extractPublicKey()
print(ecPrivKey.pemString)
print(ecPubKey.pemString)
```

###Signing and Verifying

One use of asymmetric keys is in signing data. In this case, you produce a signature by signing the data with the private key. If the signature is successfully verified using the public key, you can be sure it was produced using the private key and that the data hasn’t been changed. This ensures the authenticity and integrity of the data.

With BlueECC you sign the plaintext as follows:

```swift
let signature = try "hello world".sign(with: ecPrivKey)
```

This will take your message and use the private key to create an [ECSignature](https://ibm-swift.github.io/BlueECC/Structs/ECSignature.html). This struct can then be verified with the corresponding public key:

```swift
let verified = signature.verify(plaintext: "hello world", using: ecPubKey)
```

To produce either `true` or `false` depending on whether the signature is valid for the provided plaintext and public key.

###Encrypting and Decrypting

The other use of asymmetric keys is in encryption and decryption. In this case you provide the private key to the person who you want to communicate securely with and they use it to encrypt the plaintext. The message can only be decrypted using the private key.

Since asymmetric encryption can only be used on a small plaintext, BlueECC uses Elliptic Curve Integrated Encryption Scheme (ECIES). This consists of encrypting the message using [AES-GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode) with a symmetric key, followed by encrypting that symmetric key using Elliptic-curve Diffie–Hellman ([ECDH](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie–Hellman)). The encrypted symmetric key and encrypted message are both sent in an envelope. The receiver of the envelope then decrypts the symmetric key and uses that to decrypt the original message.

BlueECC handles this process for you, so encryption becomes:

```swift
let encrypted = try "Hello World".encrypt(with: ecPubKey)
```

This will produce the encrypted data envelope that is structured as follows:

- Ephemeral public key (65/97/133 bytes depending on curve)
- Encrypted ciphertext (length of the plaintext)
- GCM tag (16 bytes)

To decrypt this data, pass it to BlueECC with the private key:

```swift
let decrypted = try encrypted.decrypt(with: ecPrivKey)
print(String(data: decryptedData, encoding: .utf8)) // "Hello World"
```

The encrypted data has been decrypted back to the original plaintext.

---

Congratulations! You have just learned how to use elliptic curve cryptography to sign, verify, encrypt and decrypt data in Swift.

If you would like to run this example, or learn more about BlueECC, [check it out on GitHub](https://github.com/Kitura/BlueECC).

If you would like to learn more about using the BlueECC API, [visit our API reference](https://ibm-swift.github.io/BlueECC/index.html).

Any questions or comments? Please join the Kitura community on [Slack](http://swift-at-ibm-slack.mybluemix.net/?cm_sp=dw-bluemix-_-swift-_-devcenter&_ga=2.122522507.186671014.1570626561-1743126121.1570022962&cm_mc_uid=83263075142115698398229&cm_mc_sid_50200000=53695431570707266328)!
