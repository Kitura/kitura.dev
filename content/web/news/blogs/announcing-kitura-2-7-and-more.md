---
title: Announcing Kitura 2.7 and more
blurb: We’re delighted to announce the release of Kitura 2.7, alongside a range of other releases and improvements to the Kitura ecosystem.
date: "2019-04-17"
author: Ian Partridge
path: /blogs/announcing-kitura-2-7-and-more
---

We’re delighted to announce the release of Kitura 2.7, alongside a range of other releases and improvements to the Kitura ecosystem.

##Kitura 2.7

Kitura 2.7 is fully compatible with Swift 5, and comes with a range of improvements, bug fixes and performance work. You can find full information in the [GitHub release notes](https://github.com/Kitura/Kitura/releases/tag/2.7.0).

One user-facing feature is support for UNIX domain sockets, both client and server. This gives Kitura the ability to listen on a UNIX domain socket instead of an INET (TCP) socket and was requested in our [Slack channel](http://swift-at-ibm-slack.mybluemix.net).

There is a new `Kitura.addHTTPServer(onUnixDomainSocket:)` API to allow you to listen on a UNIX domain socket. Additionally, you can make outbound (client) HTTP requests over a UNIX domain socket (for example, to the Docker daemon) using KituraNet’s new `HTTP.request(unixDomainSocketPath:)` API. This is also available when running on KituraNIO.

There are also major improvements to Kitura’s generation of OpenAPI documents, which are now more compliant with the specification and support a wider variety of types of endpoints.

Finally, there is the usual array of bug fixes and performance improvements. The performance improvements should be especially noticeable when running on Swift 5.

---

##Kitura-NIO 2.0

We are also announcing support for SwiftNIO 2.0 on Swift 5. SwiftNIO is a high performance networking framework from Apple, and Kitura gained the ability to use it last year following the release of SwiftNIO 1.0.

Now that SwiftNIO 2.0 has been released, Kitura will use it when you build in KITURA_NIO mode on Swift 5.

We would like to thank the SwiftNIO team for their continuing help and advice during this migration.

Note: If you are not ready to move to Swift 5, but do wish to use KituraNIO, you should make sure your Package.swift specifies `.upToNextMinor(from: "2.6.0")` for Kitura so that your app continues to use SwiftNIO 1.0. This is because SwiftNIO 2.0 requires Swift 5.

---

##Kitura-WebSocket-NIO

Kitura’s WebSocket implementation has also been ported to SwiftNIO 2.0 and we now offer 3 different implementations according to your need:

Kitura-WebSocket: traditional implementation
Kitura-WebSocket-NIO 1.0: implementation on SwiftNIO 1.0, for Swift 4
Kitura-WebSocket-NIO 2.0: implementation on SwiftNIO 2.0, for Swift 5

This transition should be seamless for users. If you do experience any problems, just let us know!

##BlueRSA

BlueRSA, our package providing support for RSA encryption, decryption and signing, has been enhanced to provide easy APIs for making RSA keypairs. `RSAKey.makeKeyPair()` returns a tuple containing an RSA private and public key, and `RSAKey.pemString` returns an RSA key in PEM format.

Previously this functionality was only available through the `openssl` command-line interface, and making this available on BlueRSA means we have consistent functionality between BlueRSA and BlueECC, which already offered this for elliptic-curve keys.

##Documentation

We continue to improve the Kitura documentation.

The “Learn” section of kitura.dev has been completely written, and now features much more detailed information on Kitura, including information on logging, routing, databases, sessions, authentication, building web applications, and deploying to the cloud.

The “Learn” section uses the example of building a book store application. You can either follow the documentation from the beginning to build a complete application, or dip into the section that particularly interests you.
