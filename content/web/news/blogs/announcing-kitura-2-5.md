---
title: Announcing Kitura 2.5
blurb: Kitura 2.5 has recently been released – the latest update to the popular and powerful Swift web framework.
date: "2018-09-01"
author: Ian Partridge
path: /blogs/announcing-kitura-2-5
---

Kitura 2.5 has recently been released – the latest update to the popular and powerful Swift web framework.

##Enhanced OpenAPI support

Kitura 2.4 introduced support for OpenAPI (also known as Swagger), the most popular way to document REST APIs. When you use Codable routing in Kitura you can automatically generate an OpenAPI definition of your running application, with no code changes or annotations needed.

In Kitura 2.5 we have expanded our support of the OpenAPI specification, and now also support routes which specify query parameters. In addition, a new release of Kitura-OpenAPI now includes the latest version of SwaggerUI, plus some bugfixes.

---

##SwiftNIO support

Kitura 2.4 introduced experimental support for running Kitura on SwiftNIO, the new asynchronous networking framework from Apple. Users could opt to in to trying SwiftNIO by using swift package edit to choose a separate branch of Kitura which we maintained.

Now, in Kitura 2.5 SwiftNIO support has been integrated into Kitura itself, and you can easily choose to opt in to using SwiftNIO if you want.

To do this, simply build your Kitura application with swift build -DKITURA_NIO=1.

We encourage all users to try building and running their applications with SwiftNIO and let us know their experiences. We are continuing to work closely with the SwiftNIO team on any issues that we find, and thank them for their quick responses, help, and fixes so far.

---

##SwiftNIO support in Kitura-WebSocket

If you are using Websockets in Kitura, you may be interested to know that we also now have an experimental port of Kitura-WebSocket which runs on SwiftNIO. You can find it at this branch and we would welcome all users to try it out. Join our Slack and let us know how you get on!

---

##Pluggable JSONEncoders in Codable routing

Codable routing allows you to quickly build REST APIs using the Codable types that already exist in your application.

Until now, Codable routing has been limited to JSON only, and only the default JSONEncoder and JSONDecoder supplied by Foundation.

Now in Kitura 2.5 you have a flexible framework for attaching custom encoders and decoders to the Kitura router.

Learn more in this blog post.

---

##Performance improvements

We have continued to improve the overall performance of Kitura. In certain benchmarks Kitura 2.5 is 13% faster than Kitura 2.4. The difference is even greater when running in debug mode.

We intend to continue to improve Kitura performance in future.

---

##New splash screen

In Kitura 2.5 the default splash screen matches the look and feel of www.kitura.io

--- 

##Bugfixes

Of course, there’s the usual selection of tweaks and fixes, resolving issues reported to us by the community.

