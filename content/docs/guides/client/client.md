---
path: "/docs/client/client"
title: What is a client?
---

#What is a client?

A client is a computer hardware device or software that is capable of obtaining information and applications from a server, granted that there is a suitable framework in place.  In the context of Kitura, this could be a simple command line interface, an iOS application or even another micro service that interacts with a server.  Usually the client initiates with a request and the server responds appropriately, whether that is a simple GET request for receiving information, or a POST request for transferring data from the client to the server.

---

##KituraKit

[KituraKit](https://github.com/IBM-Swift/KituraKit) is a client side framework for sending HTTP requests to a Kitura server. By using the Swift Codable protocol, you can send and receive models directly from client to server.  KituraKit can be used for iOS applications and can be installed through CocoaPods.

##SwiftyRequest

[SwiftyRequest](https://github.com/IBM-Swift/SwiftyRequest) is an HTTP client built for Swift.

---
##Next Steps:

Build a simple [iOS Client](./iOSClient) for finding the price of fruit using KituraKit.
