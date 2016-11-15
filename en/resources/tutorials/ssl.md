---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: SSL
menu: resources
lang: en
redirect_from: "/resources/ssl.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Enabling SSL/TLS on your Kitura server</h1>
</div>

## SSL/TLS
Transport Layer Security (TLS) is a protocol for encrypting data that is sent over the Internet and it can provide three important features:

- **data privacy**: The data that is exchanged between a server and client is not visible to anyone else;
- **data integrity**: The data that is exchanged between a server and client cannot be modified by anyone else;
- **server authenticity**: The server can prove its identity to the client and so prove the origin of sent data.

TLS evolved out of Netscape's Secure Sockets Layer (SSL) protocol in order to fix most of its security flaws. The industry still uses the terms somewhat interchangeably for historical reasons. Any web site that you visit starting with https:// rather than http:// is using TLS/SSL for communication between your browser and their server.

To enable TLS, a server needs a certificate and a corresponding secret key. Certificates are files that bind together information about the identity of the owner of a site and the public half of an asymmetric key pair (usually RSA). Certificates are usually digitally signed by a certificate authority (CA) who verifies that the information in the certificate is correct. This creates a chain of certificates between the site owner certificate and a CA certificate and transitive trust. Assuming that we trust the CA, we can trust the validity of the server certificate.

---

## BlueSSLService Framework

[BlueSSLService](https://github.com/IBM-Swift/BlueSSLService) is the underlying framework that integrates with Kitura to provide SSL/TLS on macOS and Linux.

BlueSSLService is the first Swift-only framework that integrates with the native security libraries on macOS and Linux. Specifically, BlueSSLService integrates with OpenSSL library on Linux and Apple Secure Transport on macOS.

This is important, because the developer does not need to install any additional packages on their platform of choice. Additionally and more importantly, pre-installed OpenSSL on macOS has been deprecated since OS X v10.7 and later, for binary compatibility reasons. This means that if you require OpenSSL on macOS, you must install your own version of this library and statically link it into your program.

Finally, since BlueSSLService presents a consistent and unified Swift interface for both macOS and Linux, the developer can simply import BlueSSLService (via Kitura) in their application and know that their application will behave correctly on both macOS and Linux.

---

## Generating certificates

To enable TLS in Kitura, we must first setup our server's certificate and key pair. The certificate can be either a self-signed certificate or a certificate chain whereby the server certificate is signed by a CA. Kitura currently supports PEM certificate format on Linux, and PKCS#12 on macOS.

<span class="arrow">&#8227;</span> In this example, we have created a self-signed PEM certificate using the following OpenSSL commands:

```
// generate a 2048bit RSA key
$ openssl genrsa -out key.pem 2048

// create a certificate signing request used to generate the cert
$ openssl req -new -sha256 -key key.pem -out csr.csr

// create the certificate
$ openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out certificate.pem
```

<span class="arrow">&#8227;</span> You can convert your certificate to PKCS#12 format using

```
$ openssl pkcs12 -export -out cert.pfx -inkey key.pem -in certificate.pem
```

<span class="arrow">&#8227;</span> Place your certificate and key in `/tmp/Creds/Self-Signed` folder.

---

## Configuring Kitura for SSL/TLS

<span class="arrow">&#8227;</span> We are now ready to configure Kitura with our certificate and key and enable TLS on our server. Remember that since this is a self-signed certificate, we must set the parameter `usingSelfSignedCerts` to `true`.

```swift
import Kitura

let router = Router()

let myCertPath = "/tmp/Creds/Self-Signed/cert.pem"
let myKeyPath = "/tmp/Creds/Self-Signed/key.pem"

let mySSLConfig =  SSLConfig(withCACertificateDirectory: nil, usingCertificateFile: myCertPath, withKeyFile: myKeyPath, usingSelfSignedCerts: true)

router.get("/") {
    request, response, next in
    response.send("Hello, World!")
    next()
}

Kitura.addHTTPServer(onPort: 8090, with: router, withSSL: mySSLConfig)
Kitura.run()
```

<span class="arrow">&#8227;</span> Next we build our application using SwiftPM and run the executable. After the executable is running and listening for connections on `localhost:8090`, you can test out the application by opening a browser on:

```
https://localhost:8090
```

<span class="arrow">&#8227;</span> Notice the `https` in your URL!  You are running Kitura with TLS! This means that the data your application transmits is secure and the server your users are connecting to is authenticated.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
