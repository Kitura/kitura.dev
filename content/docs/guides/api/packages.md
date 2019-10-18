---
path: "/docs/api/packages"
title: Kitura Packages
---

# Kitura API Documentation

 ## Contents

 - [Kitura](#kitura)
 - [HTTP Client](#http-client)
 - [Sessions](#sessions)
 - [Authentication](#authentication)
 - [Web Templating](#web-templating)
 - [SQL Databases](#sql-databases)
 - [Non-SQL Databases](#non-sql-databases)
 - [Cloud Integration](#cloud-integration)
 - [Middlewares](#middlewares)
 - [Cryptography](#cryptography)
 - [Email](#email)

 ## Kitura

 Core packages used by most Kitura applications.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura](https://github.com/IBM-Swift/Kitura)      | The Kitura framework, including HTTP server, routing, requests, and responses.       | [API](https://ibm-swift.github.io/Kitura/) |
 | [Kitura-Websocket](https://github.com/IBM-Swift/Kitura-Websocket) | Bi-directional communications over the WebSocket protocol. | [API](https://ibm-swift.github.io/Kitura-WebSocket/) |
 | [Kitura-OpenAPI](https://github.com/IBM-Swift/Kitura-OpenAPI) | Automatically generate a Swagger/OpenAPI document from your Kitura application. | [API](https://ibm-swift.github.io/Kitura-OpenAPI/) |



 ## HTTP Client

 Packages for communicating with remote HTTP servers, or with Kitura from iOS.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [SwiftyRequest](https://github.com/IBM-Swift/SwiftyRequest) | HTTP client, with support for JSON, Codable, and built-in circuit breaking. | [API](https://ibm-swift.github.io/SwiftyRequest/) |
 | [KituraKit](https://github.com/IBM-Swift/KituraKit) | iOS library for communicating with a Kitura server. | [API](https://ibm-swift.github.io/KituraKit/) |


 ## Sessions

 Persist user state between requests.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-Session](https://github.com/IBM-Swift/Kitura-Session)      | Manage user state between requests, in memory.  | [API](https://ibm-swift.github.io/Kitura-Session/) |
 | [Kitura-Session-Redis](https://github.com/IBM-Swift/Kitura-Session-Redis) | Manage user state between requests, using a Redis data store. | [API](https://ibm-swift.github.io/Kitura-Session-Redis/) |

 ## Authentication

 Authenticate requests to Kitura.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-Credentials](https://github.com/IBM-Swift/Kitura-Credentials)  | Main credentials framework. Use this together with a suitable plugin. | [API](https://ibm-swift.github.io/Kitura-Credentials/) |
 | [Kitura-CredentialsFacebook](https://github.com/IBM-Swift/Kitura-CredentialsFacebook)  | Plugin for Kitura-Credentials which uses Facebook OAuth2. | [API](https://ibm-swift.github.io/Kitura-CredentialsFacebook/) |
 | [Kitura-CredentialsGoogle](https://github.com/IBM-Swift/Kitura-CredentialsGoogle)  | Plugin for Kitura-Credentials which uses Google OAuth2. | [API](https://ibm-swift.github.io/Kitura-CredentialsGoogle/) |
 | [Kitura-CredentialsGitHub](https://github.com/IBM-Swift/Kitura-CredentialsGitHub)  | Plugin for Kitura-Credentials which uses GitHub OAuth2. | [API](https://ibm-swift.github.io/Kitura-CredentialsGitHub/) |
 | [Kitura-CredentialsHTTP](https://github.com/IBM-Swift/Kitura-CredentialsHTTP)  | Plugin for Kitura-Credentials which uses HTTP Basic or Digest authentication. | [API](https://ibm-swift.github.io/Kitura-CredentialsHTTP/) |
 | [Kitura-CredentialsJWT](https://github.com/IBM-Swift/Kitura-CredentialsJWT)  | Plugin for Kitura-Credentials which uses JSON Web Tokens. | [API](https://ibm-swift.github.io/Kitura-CredentialsJWT/) |
 | [Kitura-CredentialsDropbox](https://github.com/crspybits/CredentialsDropbox)  | Plugin for Kitura-Credentials which uses Dropbox OAuth2. | No API available |
 | [Kitura-CredentialsTwitter](https://github.com/jacobvanorder/Kitura-CredentialsTwitter)  | Plugin for Kitura-Credentials which uses Twitter OAuth2. | No API available |
 | [Swift-JWT](https://github.com/IBM-Swift/Swift-JWT) | Swift implementation of JSON Web Tokens (JWT). | [API](https://ibm-swift.github.io/Swift-JWT/) |


 ## Web Templating

 Create websites in Kitura.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-TemplateEngine](https://github.com/IBM-Swift/Kitura-TemplateEngine)      | Main templating framework. Use this together with a suitable plugin. | [API](https://ibm-swift.github.io/Kitura-TemplateEngine/) |
 | [KituraKit-StencilTemplateEngine](https://github.com/IBM-Swift/Kitura-StencilTemplateEngine) | Plugin for Kitura-TemplateEngine which uses Stencil templating. | [API](https://ibm-swift.github.io/Kitura-StencilTemplateEngine/) |
 | [Kitura-Markdown](https://github.com/IBM-Swift/Kitura-Markdown) | Plugin for Kitura-TemplateEngine which uses Markdown templating. | [API](https://ibm-swift.github.io/Kitura-Markdown/) |
 | [Kitura-MustacheTemplateEngine](https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine) | Plugin for Kitura-TemplateEngine which uses Mustache templating. | [API](https://ibm-swift.github.io/Kitura-MustacheTemplateEngine/) |
 | [swift-html-entities](https://github.com/IBM-Swift/swift-html-entities) | HTML5 character encoder/decoder. | [API](https://ibm-swift.github.io/swift-html-entities/) |

 ## SQL Databases

 Connect your Kitura app to a relational database.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Swift-Kuery-ORM](https://github.com/IBM-Swift/Swift-Kuery-ORM)   | Kitura's Object Relational Mapper (ORM). | [API](https://ibm-swift.github.io/Swift-Kuery-ORM/) |
 | [Swift-Kuery](https://github.com/IBM-Swift/Swift-Kuery) | SQL database abstraction. Use this together with a database plugin if you do not wish to use an ORM. | [API](https://ibm-swift.github.io/Swift-Kuery/) |
 | [SwiftKueryMySQL](https://github.com/IBM-Swift/SwiftKueryMySQL) | Plugin for Swift-Kuery which uses MySQL. | [API](https://ibm-swift.github.io/SwiftKueryMySQL/) |
 | [Swift-Kuery-PostgreSQL](https://github.com/IBM-Swift/Swift-Kuery-PostgreSQL) | Plugin for Swift-Kuery which uses PostgreSQL. | [API](https://ibm-swift.github.io/Swift-Kuery-PostgreSQL/) |
 | [Swift-Kuery-SQLite](https://github.com/IBM-Swift/Swift-Kuery-SQLite) |Plugin for Swift-Kuery which uses SQLite. | [API](https://ibm-swift.github.io/Swift-Kuery-SQLite/) |

 ## Non-SQL Databases

 Connect your Kitura app to a No-SQL database.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-CouchDB](https://github.com/IBM-Swift/Kitura-CouchDB)      | SDK for connecting to Apache CouchDB and Cloudant.  | [API](https://ibm-swift.github.io/Kitura-CouchDB/) |
 | [Kitura-Redis](https://github.com/IBM-Swift/Kitura-Redis) | SDK for connecting to Redis key/value datastore. | [API](https://ibm-swift.github.io/Kitura-redis/) |

 ## Cloud Integration

 Libraries for integrating with cloud.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [LoggerAPI](https://github.com/IBM-Swift/LoggerAPI)      | Logger protocol for differing kinds of loggers.  | [API](https://ibm-swift.github.io/LoggerAPI/) |
 | [HeliumLogger](https://github.com/IBM-Swift/HeliumLogger) | A lightweight Swift logging framework. | [API](https://ibm-swift.github.io/HeliumLogger/) |
 | [Health](https://github.com/IBM-Swift/Health)      | Add liveness and readiness endpoints to your application. | [API](https://ibm-swift.github.io/Health/) |
 | [CloudEnvironment](https://github.com/IBM-Swift/CloudEnvironment) | ad configuration for services on IBM Cloud. | [API](https://ibm-swift.github.io/CloudEnvironment/) |
 | [Swift-cfenv](https://github.com/IBM-Swift/Swift-cfenv) | Parse Cloud Foundry variables into your application. | No API available |
 | [Configuration](https://github.com/IBM-Swift/Configuration) | Read application configuration from command-line options, environment variables, and disk. | [API](https://ibm-swift.github.io/Configuration/) |

 ## Middlewares

 Pluggable functionality which can be added to Kitura routes.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Kitura-Cache](https://github.com/IBM-Swift/Kitura-Cache)      | In-memory cache based on NSCache. | [API](https://ibm-swift.github.io/Kitura-Cache/) |
 | [Kitura-Compression](https://github.com/IBM-Swift/Kitura-Compression) | Compress your response body data using "deflate" or "gzip". | [API](https://ibm-swift.github.io/Kitura-Compression/) |
 | [Kitura-CORS](https://github.com/IBM-Swift/Kitura-CORS) | Support for Cross Origin Resource Sharing. | [API](https://ibm-swift.github.io/Kitura-CORS/) |

 ## Cryptography

 Libraries for many popular cryptography algorithms.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [BlueCryptor](https://github.com/IBM-Swift/BlueCryptor) | Cross-platform cryptography library. | No API available |
 | [BlueRSA](https://github.com/IBM-Swift/BlueCryptor) | Cross-platform RSA wrapper library. | No API available |
 | [BlueECC](https://github.com/IBM-Swift/BlueECC) | Demonstration application using Kubernetes. | [API](https://ibm-swift.github.io/BlueECC/index.html) |

 ## Email

 Send email from your Kitura application.

 | Package      | Description | API Documentation |
 | ----------- | ----------- | ------- |
 | [Swift-SMTP](https://github.com/IBM-Swift/Swift-SMTP)      | A Swift SMTP mail client.  | [API](https://ibm-swift.github.io/Swift-SMTP/) |
