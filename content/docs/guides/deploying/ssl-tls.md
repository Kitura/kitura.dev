---
path: "/docs/deploying/enabling-ssl"
title: Enabling SSL/TLS
---

#Enabling SSL/TLS

Transport Layer Security (TLS) is a protocol for encrypting data that is sent over the internet. It provides three important features:

- Data Privacy: The data that is exchanged between a server and client is not visible to anyone else.
- Data Integrity: The data that is exchanged between a server and client cannot be modified by anyone else.
- Server Authenticity: The server can prove its identity to the client and so prove the origin of sent data.

TLS evolved out of Netscape’s Secure Sockets Layer (SSL) protocol in order to fix most of its security flaws. The industry still uses the terms somewhat interchangeably for historical reasons. Any web site that you visit starting with https:// rather than http:// is using TLS/SSL for communication between your browser and their server.

> This guide will demonstrate how to enable the TLS protocol directly on your Kitura server. Another way to enable TLS is via an SSL/TLS proxy. In this case an intermediary application between your server and clients performs the encryption and decryption. Some cloud providers offer this service by default, which may be a more appropriate solution.

---

##Step 1: Create our certificate and key pair

> In this guide, we will use OpenSSL to generate our self-signed certificate.
> OpenSSL is included by default on Linux. On MacOS we can install it using Homebrew:
> ```
> brew install openssl
> ```

To enable TLS, a server needs a certificate and a corresponding secret key. Certificates are files that bind together information about the identity of the owner of a site and the public half of an asymmetric key pair (usually RSA). Certificates are usually digitally signed by a certificate authority (CA) who verifies that the identity information in the certificate is correct. This creates a chain of certificates between the site owner certificate and a CA certificate and transitive trust. Assuming that we trust the CA, we can trust the validity of the server certificate.

> If you want to create a CA-signed certificate chain, Let’s Encrypt is a Certificate Authority (CA), provided by the non-profit Internet Security Research Group (ISRG) that makes it easy to generate and install free TLS/SSL certificates.

In this guide, we will use OpenSSL to generate a self-signed certificate.

Create a Credentials folder in the root of your project:

```
mkdir Credentials && cd Credentials
```

Inside this folder we create a 2048 bit RSA private key using OpenSSL:

```
openssl genrsa -out key.pem 2048
```

We use this private key to create a certificate:

```
openssl req -new -sha256 -key key.pem -out csr.csr
```

At this stage you provide additional information that will be stored in the certificate.

These choices are optional, except for Common Name, which must be the server's hostname. In our case, this is "localhost".

Next we use OpenSSL to convert the certificate to PEM format:

```
openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out cert.pem
```

Finally we encrypt the key and certificate together using a password. For simplicity we will use "password".

```
openssl pkcs12 -export -out cert.pfx -inkey key.pem -in cert.pem
```

---

##Step 2: Setting up your SSL configuration

Now we have created our certificate, we are going to set up our SSL configuration so that it can direct Kitura to the required files.

Open your Application.swift file:

```
open Sources/Application/Application.swift
```

We are going to use FileKit to access our certificate file, so we need to add FileKit to our dependencies.

We also need to add FileKit to our import statements:

```swift
import FileKit
```

Now we initialize an SSLConfig struct. On macOS we use Apple Secure Transport under the covers, which requires the path to our cert.pfx file and the password we used to encrypt the file. On Linux we use OpenSSL under the covers, which requires the paths to the certificate and private key PEM files.

We use #if to check which operating system we're running on and provide the appropriate files to our configuration.

Inside the App class, add the following code:

```swift
#if os(Linux)
let sslConfig =  SSLConfig(withCACertificateDirectory: nil,
                             usingCertificateFile: FileKit.projectFolder + "/Credentials/cert.pem",
                             withKeyFile: FileKit.projectFolder + "/Credentials/key.pem",
                             usingSelfSignedCerts: true)
#else // on macOS

let sslConfig =  SSLConfig(withChainFilePath: FileKit.projectFolder + "/Credentials/cert.pfx",
                             withPassword: "password",
                             usingSelfSignedCerts: true)

#endif
```

---

##Step 3: Configure our Kitura server to use SSL

Now we have our SSL configuration, we need to pass it to Kitura. We do this as part of the addHTTPServer function, using the withSSL parameter.

Inside the run function, replace:

```swift
Kitura.addHTTPServer(onPort: 8080, with: router)
```

With the following code:

```swift
Kitura.addHTTPServer(onPort: 8080, with: router, withSSL: sslConfig)
```

To test this, start your server and open your browser at the Kitura landing page:

https://localhost:8080

> At this point your browser might stop you with a warning that the SSL certificate it is validating is self-signed. Since you are accessing your own server this isn’t a problem at all. In the advanced settings, you can tell your web-browser to accept the self-signed SSL certificate and continue. In general though, your browser should only trust server certificates which are issued by a valid CA.

Notice the https in your URL. You are running Kitura using SSL/TLS! This means that the data your application transmits is secure and the server your users are connecting to is authenticated.
