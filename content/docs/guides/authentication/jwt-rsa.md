---
path: "/docs/authentication/jwt-rsa"
title: Signing and verifying JWTs with RSA
---

#Signing and verifying JWTs with RSA

You can process JWTs using RSA cryptography. This uses asymmetric keys with a private key for signing and a public key for verifying. The public key allows anyone to verify a JWT but only the provider can create them. ECDSA is recommended over RSA since it uses smaller keys, requires less processing power and produces smaller signatures.

---

##Step 1: Create your RSA keys

You can generate RSA keys in terminal using the following OpenSSL commands:

```
openssl genrsa -out privateKey.pem 2048
```

```
openssl rsa -in privateKey.pem -pubout -outform PEM -out publicKey.pem
```

For simplicity you can use the following pre-generated keys.

Add the following RSA PEM strings (Or the ones you generated) to your App extension:

```swift
static let privateKey = """
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAxyebvXKgG7VHTUArwIPLL6uruJuaYTuspaI793JQK/3XIJ1O
8KRXqWvy2Awo+po1IeKIGioCwD7mVbN2oX9yC8K+VDUJrpxz1Bve+zLZ59x81TO0
IlgbugjduGBmnKTElL/Y7MbI2SIJheBfxqcvopc5U+j3eVLvl3mTPx5T9i/qutmw
L7qfk/bOOgV3sMVa/Q9SXE4ZE1737UHUgcBJFp5okqSKBQw6kxZ7HsDSLDIZJRKH
vW3NiCIrK83JvQp4tYWi4Sb3rDl3TyRlqDM4Ly0YQ6be5IsPfmut8NENDoviyZRd
ihnN6TuBk3zUfb4MkcO/KUGub37zRQbgB5KQmwIDAQABAoIBAQCal/N8HxOMDq8X
l12fJm8+RPua5Sb0nXcKaCI2lgUH8RbimVoi0N+/gy1SajYROk1OTWOrM7tI8kqo
chP/j0e/O1+1TCqE4avEFhKEWlfudSht86G8GzsCsUkzi5l7tSdn9Hh2bGSSsKpF
wwN12GfQxaTZrvkTs76KjfQwReGVMwPf5D67968Eani+sj02ODYT99sQd0Zs9Jkd
nqjIkDCeAQYgUUpsut/0mtodwrJlQXGS1DjOSfbUbdXTzQOR6a5uHMCdqNG2Dqrv
GkzdViwzAfwNz3ntdqn2YVnCPQwdOArrP6iKIPukMC5zckMCdcvoeEOLY+7SwGvB
srWM7Xj5AoGBAO7OhOOAWoI9RJ2onfrB4xi84cdcnAq+lQij//yC+rTNC4fu7eJp
MbF9C7P7XicD2xTJgfjddYW7H6yc5t2BChmICXbEv0K0/kebc5MzaZK264u9fxk6
MToLWReCFYQ5pmqgqeKJ2CV86byDFYVf0cSt4PcpOXfdHQzjA/S5qMslAoGBANV+
QfTBQe/bkTVRRlY1YcghPZr6sR7cUbyXX0ou8dDdAdSZ1VOwDmIZhnq0/w/HzJQm
UMw2zjs37y9Mf60xLlvY8bbhU1rlZ8vZr+0xm8K4fYlnt+ONNjv6puYvF5IPKad3
KvafIOelY8liLqo9gXJYUZGZcxRikiKtZotQJwC/AoGBAN3rz3S3p+SWWTiGJOGN
4qPvi4XAG0ak20yfU1luwtrYHdoiALFB/qspQIHunA13uNU1efIyo282ePXpDWZU
73TQhbL4naC5IACdhqcJxRdRo81FuWJRQMPnHdEJ00MAbBV03ssmPFaCIZhM3OgI
JqE20PP/PGeWdNOv99Ip4qF9AoGAGeGxi0N2g+aBZw5QUZktHn7xIf2sRUp+Wjeb
pLmmNSTl2OlBVGDujXP8upmApmAZbAhtGSS3wbQZOgmzHMLulNHrE7mjSkyvVaYx
TrcJ5ARLq8G4KEzxOzo6y4L//4P5D8VBnx5RdeO2Ai7160uDiuIsGVOaAOmmP6/3
04HHCK8CgYEAuS4wfgKWL9nRInjOjrKd9SSnHFWbmD4PfrbjtNY69R3FqryTmT1e
9GUyAQTpdIn46LYDczkQJpg8TIN/3yDHb9TErmspsAEDnFHD7Dsxi0LlbPkSdhls
cQGNrHxp2xvM+LKFW1y3K6XUJhZZSKEVQvR3v4QVxCUxglbGJ5BTNXY=
-----END RSA PRIVATE KEY-----
"""
static let publicKey = """
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxyebvXKgG7VHTUArwIPL
L6uruJuaYTuspaI793JQK/3XIJ1O8KRXqWvy2Awo+po1IeKIGioCwD7mVbN2oX9y
C8K+VDUJrpxz1Bve+zLZ59x81TO0IlgbugjduGBmnKTElL/Y7MbI2SIJheBfxqcv
opc5U+j3eVLvl3mTPx5T9i/qutmwL7qfk/bOOgV3sMVa/Q9SXE4ZE1737UHUgcBJ
Fp5okqSKBQw6kxZ7HsDSLDIZJRKHvW3NiCIrK83JvQp4tYWi4Sb3rDl3TyRlqDM4
Ly0YQ6be5IsPfmut8NENDoviyZRdihnN6TuBk3zUfb4MkcO/KUGub37zRQbgB5KQ
mwIDAQAB
-----END PUBLIC KEY-----
"""
```

---

##Step 2: Create your JWTSigner

The JWTSigner is used to sign a JWT instance and produce a signed JWT string.

Inside the App extension, create an RSA JWTSigner by providing the private key:

```swift
static let jwtSigner = JWTSigner.rs256(privateKey: Data(privateKey.utf8))
```

---

##Step 3: Create your JWTVerifier

The JWTVerifier is used to verify a signed JWT string. This ensures the signature was generated using the corresponding private key and the JWT has not been changed.

Inside the App extension, we create an RSA JWTVerifier by providing the public key:

```swift
static let jwtVerifier = JWTVerifier.rs256(publicKey: Data(publicKey.utf8))
```

---

Now you can return to the [JSON Web Token Authentication](./jwt#step-2-set-up-your-signing-and-verifying-algorithm) guide.
