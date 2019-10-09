---
path: "/docs/api/packages"
title: Kitura Packages
---

# Kitura API Documentation

 ## Contents

 - [Core](#core)
 - [Cloud](#cloud)
 - [Database](#database)
 - [Sessions](#sessions)
 - [Credentials](#credentials)
 - [Templating](#templating)
 - [Backend Drivers](#backend-drivers)
 - [Logging](#logging)
 - [Middleware](#middleware)
 - [Sample Apps](#sample-apps)
 - [Infrastructure](#infrastructure)
 - [Misc](#misc)

 ### Core

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura](https://github.com/IBM-Swift/Kitura)      | Core Kitura package.       | [API](https://ibm-swift.github.io/Kitura/) |
 | [KituraKit](https://github.com/IBM-Swift/KituraKit) | Client side library for using Codable routes with Kitura. | [API](https://ibm-swift.github.io/KituraKit/) |
 | [Kitura-Websocket](https://github.com/IBM-Swift/Kitura-Websocket) | Provides socket support to Kitura based servers. | [API](https://ibm-swift.github.io/Kitura-websocket/) |
 | [REPO](https://github.com/IBM-Swift/REPO) | Desc | [API](https://ibm-swift.github.io/REPO/) |

 ### Cloud

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Health](https://github.com/IBM-Swift/Health)      | Allow Swift apps to report health status.       | [API](https://ibm-swift.github.io/Health/) |
 | [CloudEnvironment](https://github.com/IBM-Swift/CloudEnvironment) | Convenience package for accessing variables mapped to JSON for Cloud environments. | [API](https://ibm-swift.github.io/CloudEnvironment/) |
 | [SwiftMetrics](https://github.com/IBM-Swift/SwiftMetrics) | Instruments the Swift runtime for performance monitoring, via API or a visual dashboard. | No API available |
 | [Kitura-OpenAPI](https://github.com/IBM-Swift/Kitura-OpenAPI) | Allows the addition of OpenAPI (Swagger) support to your Kitura application. | [API](https://ibm-swift.github.io/Kitura-OpenAPI/) |
 | [Swift-cfenv](https://github.com/IBM-Swift/Swift-cfenv) | Allows parsing of Cloud Foundry configuration variables, like port number, IP and URL. | No API available |
 | [CircuitBreaker](https://github.com/IBM-Swift/CircuitBreaker) | A design pattern to improve response time, stability and prevent constant failure requests. | [API](https://ibm-swift.github.io/CircuitBreaker/) |
 | [SwiftyRequest](https://github.com/IBM-Swift/SwiftyRequest) | HTTP networking library for Swift. | [API](https://ibm-swift.github.io/SwiftyRequest/) |

 ### Database

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Swift-Kuery-ORM](https://github.com/IBM-Swift/Swift-Kuery-ORM)   | An ORM for Swift, built on Codable.        | [API](https://ibm-swift.github.io/Swift-Kuery-ORM/) |
 | [Swift-Kuery](https://github.com/IBM-Swift/Swift-Kuery) | SQL database abstraction layer. | [API](https://ibm-swift.github.io/Swift-Kuery/) |
 | [SwiftKueryMySQL](https://github.com/IBM-Swift/SwiftKueryMySQL) | MySQL plugin for Swift-Kuery framework. | [API](https://ibm-swift.github.io/SwiftKueryMySQL/) |
 | [Swift-Kuery-PostgreSQL](https://github.com/IBM-Swift/Swift-Kuery-PostgreSQL) | PostgreSQL plugin for Swift-Kuery framework. | [API](https://ibm-swift.github.io/Swift-Kuery-PostgreSQL/) |
 | [Swift-Kuery-SQLite](https://github.com/IBM-Swift/Swift-Kuery-SQLite) | SQLite plugin for Swift-Kuery framework. | [API](https://ibm-swift.github.io/Swift-Kuery-SQLite/) |

 ### Sessions

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-Session](https://github.com/IBM-Swift/Kitura-Session)      | Framework for managing user sessions on a Kitura server.    | [API](https://ibm-swift.github.io/Kitura-Session/) |
 | [Kitura-Session-Redis](https://github.com/IBM-Swift/KituraKit) | Kitura-Session store using Redis as the backing store. | [API](https://ibm-swift.github.io/Kitura-Session-Redis/) |

 ### Credentials

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-Credentials](https://github.com/IBM-Swift/Kitura-Credentials)  | Validate user credentials on a Kitura server. | [API](https://ibm-swift.github.io/Kitura-Credentials/) |
 | [Kitura-CredentialsFacebook](https://github.com/IBM-Swift/Kitura-CredentialsFacebook)  | Plugin for the Credentials framework that authenticates using Facebook. | [API](https://ibm-swift.github.io/Kitura-CredentialsFacebook/) |
 | [Kitura-CredentialsGoogle](https://github.com/IBM-Swift/Kitura-CredentialsGoogle)  | Plugin for the Credentials framework that authenticates using Google web login and a Google OAuth token. | [API](https://ibm-swift.github.io/Kitura-CredentialsGoogle/) |
 | [Kitura-CredentialsGitHub](https://github.com/IBM-Swift/Kitura-CredentialsGitHub)  | Plugin for the Credentials framework that authenticates using GitHub. | [API](https://ibm-swift.github.io/Kitura-CredentialsGitHub/) |
 | [Kitura-CredentialsHTTP](https://github.com/IBM-Swift/Kitura-CredentialsHTTP)  | Plugin for the Credentials framework that authenticates using HTTP Basic and Digest. | [API](https://ibm-swift.github.io/Kitura-CredentialsHTTP/) |
 | [Kitura-CredentialsJWT](https://github.com/IBM-Swift/Kitura-CredentialsJWT)  | Plugin for the Credentials framework that authenticates using JSON Web Tokens. | [API](https://ibm-swift.github.io/Kitura-CredentialsJWT/) |
 | [Kitura-CredentialsDropbox](https://github.com/IBM-Swift/Kitura-CredentialsDropbox)  | Plugin for the Credentials framework that authenticates using a Dropbox OAuth2 token. | No API available |
 | [Kitura-CredentialsTwitter](https://github.com/IBM-Swift/Kitura-CredentialsTwitter)  | Plugin for the Credentials framework that authenticates using the Twitter OAuth web login. | No API available |

 ### Templating

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-TemplateEngine](https://github.com/IBM-Swift/Kitura-TemplateEngine)      | The Kitura template engine abstraction layer. | [API](https://ibm-swift.github.io/Kitura-TemplateEngine/) |
 | [KituraKit-StencilTemplateEngine](https://github.com/IBM-Swift/Kitura-StencilTemplateEngine) | Template engine for Kitura that uses Stencil based templates. | [API](https://ibm-swift.github.io/Kitura-StencilTemplateEngine/) |
 | [Kitura-Markdown](https://github.com/IBM-Swift/Kitura-Markdown) | Template engine for Kitura that uses Markdown based templates. | [API](https://ibm-swift.github.io/Kitura-Markdown/) |
 | [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine) | Template engine for Kitura that uses Mustache based templates. | [API](https://ibm-swift.github.io/Kitura-MustacheTemplateEngine/) |

 ### Backend Drivers

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-CouchDB](https://github.com/IBM-Swift/Kitura-CouchDB)      | Allows Kitura to interact with CouchDB databases.  | [API](https://ibm-swift.github.io/Kitura-CouchDB/) |
 | [Kitura-Redis](https://github.com/IBM-Swift/Kitura-Redis) | Library for interacting with a Redis database. | [API](https://ibm-swift.github.io/Kitura-Redis/) |

 ### Logging

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [LoggerAPI](https://github.com/IBM-Swift/LoggerAPI)      | Logger protocol for differing kinds of loggers.  | [API](https://ibm-swift.github.io/LoggerAPI/) |
 | [HeliumLogger](https://github.com/IBM-Swift/HeliumLogger) | A lightweight Swift logging framework. | [API](https://ibm-swift.github.io/HeliumLogger/) |

 ### Middleware

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-Cache](https://github.com/IBM-Swift/Kitura-Cache)      | In-memory, thread safe cache that allows object storage against a unique Hashable key.  | [API](https://ibm-swift.github.io/Kitura-Cache/) |
 | [Kitura-Compression](https://github.com/IBM-Swift/Kitura-Compression) | Kitura compression middleware. | [API](https://ibm-swift.github.io/Kitura-Compression/) |
 | [Kitura-CORS](https://github.com/IBM-Swift/Kitura-CORS) | Kitura CORS middleware. | [API](https://ibm-swift.github.io/Kitura-CORS/) |

 ### Sample Apps

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-Sample](https://github.com/IBM-Swift/Kitura-Sample)      | Sample application demonstrating Kitura and IBM Swift features.  | No API available |
 | [iOSSampleKituraKit](https://github.com/IBM-Swift/iOSSampleKituraKit) | Sample application demonstrating Kitura and the KituraKit client library. | No API available |
 | [Kubernetes-Kitura-Sample](https://github.com/IBM-Swift/Kubernetes-Kitura-Sample) | Demonstration application using Kubernetes. | No API available |

 ### Infrastructure

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-Net](https://github.com/IBM-Swift/Kitura-Net)      | Logic for sending and receiving HTTP requests.  | [API](https://ibm-swift.github.io/Kitura-Net/) |
 | [Kitura-NIO](https://github.com/IBM-Swift/Kitura-NIO) | Logic for sending and receiving HTTP requests using Apple's SwiftNIO framework. | [API](https://ibm-swift.github.io/Kitura-NIO/) |
 | [Kitura Contracts](https://github.com/IBM-Swift/KituraContracts) | Type definitions shared by client and server. | [API](https://ibm-swift.github.io/KituraContracts/) |
 | [BlueSocket](https://github.com/IBM-Swift/BlueSocket)      | Socket framework for Swift.  | No API available |
 | [BlueSSLService](https://github.com/IBM-Swift/BlueSSLService) | SSL/TLS add-in framework for BlueSocket. | No API available |
 | [BlueCryptor](https://github.com/IBM-Swift/BlueCryptor) | Cross-platform cryptography library. | No API available |
 | [BlueSignals](https://github.com/IBM-Swift/BlueSignals) | Generic cross-platform signal handler. | No API available |
 | [BlueRSA](https://github.com/IBM-Swift/BlueCryptor) | Cross-platform RSA wrapper library. | No API available |

 ### Misc

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Swift-SMTP](https://github.com/IBM-Swift/Swift-SMTP)      | A Swift SMTP mail client.  | [API](https://ibm-swift.github.io/Swift-SMTP/) |
 | [swift-html-entities](https://github.com/IBM-Swift/swift-html-entities) | Pure Swift HTML encode and decode utility tool. | [API](https://ibm-swift.github.io/swift-html-entities/) |
 | [Swift-JWT](https://github.com/IBM-Swift/Swift-JWT) | An implementation of JSON Web Tokens in Swift. | [API](https://ibm-swift.github.io/Swift-JWT/) |
 | [Swift-SMTP](https://github.com/IBM-Swift/Swift-SMTP)      | A Swift SMTP mail client.  | [API](https://ibm-swift.github.io/Swift-SMTP/) |
 | [TypeDecoder](https://github.com/IBM-Swift/TypeDecoder) | Allows inspection of native and complex types. | [API](https://ibm-swift.github.io/TypeDecoder/) |
 | [Configuration](https://github.com/IBM-Swift/Configuration) | Manages applications configurations. | [API](https://ibm-swift.github.io/Configuration/) |
 | [FileKit](https://github.com/IBM-Swift/FileKit) | Utility for resolving common paths. | [API](https://ibm-swift.github.io/FileKit/) |
