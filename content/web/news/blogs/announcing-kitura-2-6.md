---
title: Announcing Kitura 2.6 and more!
blurb: We are delighted to announce the release of Kitura 2.6, the latest release of the popular open source Swift web framework.
date: "2018-12-18"
author: Ian Partridge
path: /blogs/announcing-kitura-2-6
---

We are delighted to announce the release of Kitura 2.6, the latest release of the popular open source Swift web framework.

Alongside this release are a number of exciting announcements about the Kitura and Swift@IBM ecosystem, including a new KituraStudio IDE, a new partnership with Realm, and a major new release of our Swift-Kuery database system.

Learn more below and click through to the detailed blog posts on each topic.

##Kitura 2.6

Kitura 2.6 includes several functional enhancements, plus improvements to the performance of Kitura when running on SwiftNIO.

Kitura 2.6 contains the following enhancements:

- Consistent handling of parameters for Codable routes [#1310](https://github.com/IBM-Swift/Kitura/pull/1310)
- Initialize TypesafeMiddleware first [#1350](https://github.com/IBM-Swift/Kitura/pull/1350)
- Allow Kitura welcome page to be disabled [#1344](https://github.com/IBM-Swift/Kitura/pull/1344)
- Performance improvement when sending Strings [#1369](https://github.com/IBM-Swift/Kitura/pull/1369)
- Conditional GET using etags [#1333](https://github.com/IBM-Swift/Kitura/pull/1333)

Thank you to everyone in the community who contributed to this release.

###KituraNIO

A couple of obvious bottlenecks have been resolved – PR [#112](https://github.com/IBM-Swift/Kitura-NIO/pull/112) and PR [#113](https://github.com/IBM-Swift/Kitura-NIO/pull/113). These led to performance improvements of up to 30% on some benchmarks. A few more obvious bottlenecks do still exist and their solutions are in progress (e.g PR [#117](https://github.com/IBM-Swift/Kitura-NIO/pull/117)). KituraNIO now performs better than KituraNet on the `plaintext` benchmark. Longstanding stress tests were also run to make sure Kitura-NIO is stable over time. We feel that Kitura-NIO is ready for real-world usage and encourage users to try it out.

---

##Announcing KituraStudio

We are pleased to announce the release of KituraStudio, a new IDE for Server-side Swift from the [SCADE](https://www.scade.io) team.

KituraStudio has built-in integration with Docker, allowing you to code, build, and run your Kitura application on Linux in one environment, on macOS. It also provides a modern editing experience with quick feedback loop, and support for SPM.

We are excited to invite you to try out KituraStudio and the SCADE team are looking forward to receiving your feedback.

---

##Realm and IBM Cloud Functions

We are pleased to announce a collaboration between Realm and IBM to bring the power of [Realm](https://realm.io) to the flexibility and extensibility of IBM Cloud. This collaboration combines Realm’s capabilities for offline-first and zero-latency mobile applications with IBM’s Cloud and IBM Cloud Functions, enabling server-side triggers written in any language (including Swift!), for the real-time facilitation of arbitrary functions and application extensions. We have open-sourced a demo application and recorded a video of it, but this is just the beginning – this is purely an example demo, and the possibilities are endless.

[Click here](https://realm.io/blog/realm-and-ibm-cloud-functions/) for more information, and visit https://github.com/realm/realm-cloud-functions-demo to try the code out.

---

##Announcing Swift-Kuery 3.0

We have recently released version 3.0 of Swift-Kuery along with version 2.0 of Swift-Kuery-PostgreSQL, SwiftKueryMySQL and Swift-Kuery-SQLite.

The SwiftKuery API has had an overhaul and has been updated to be entirely asynchronous. You now pass callbacks to the API for establishing your connections and preparing statements in the same way as you do currently when executing your queries and transactions.

Now that Swift-Kuery is entirely asynchronous we are ready for the future of Swift. The new APIs should transition seamlessly to async/await, and it should also be possible to take advantage of the new database drivers being discussed in the Swift Server Working Group.

[Click here](/blogs/announcing-swiftkuery-3-0) for full information and how to migrate to the new version.

---

##Swift-JWT 3.0

We have just released version 3.0 of [Swift-JWT](https://github.com/IBM-Swift/Swift-JWT), our library for creating, signing, and verifying JSON Web Tokens. This release adds Codable conformance to the JWTs for easy encoding and decoding. As a result, you can now use JWTs with Kitura’s Codable Routing feature. Furthermore, this release adds support for signing and verifying JWTs using the HMAC hash function.

[Click here](/blogs/swift-jwt-3-0-codable-json-web-tokens) for full information and how to migrate to the new version.

---

##Kitura-Session 3.3

Web application servers are generally “stateless” and handle HTTP requests independently. However, it’s common for a developer to want to link requests from the same user together in a session. A simple way to achieve this is by using a cookie to identify the user and associating data to that cookie. [Kitura-Session](https://github.com/IBM-Swift/Kitura-Session) allows you to implement this flow and, as of version 3.3, you can now directly store and retrieve Codable objects in users’ sessions.

[Click here](/blogs/codable-kitura-session) for full information on this new feature.
