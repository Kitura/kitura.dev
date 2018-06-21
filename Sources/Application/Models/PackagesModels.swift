import Foundation

struct PopularPackages: Codable {
    let title: String
    let url: String
    let image: String
    let alt: String
}

struct Repositories: Codable {
    let title: String
    let className: String
    let image: String
    let alt: String
    let topics: [RepoTopics]
}

struct RepoTopics: Codable {
    let title: String
    let url: String
    let apiUrl: String?
    let description: String
}

public struct PackageWrapper: Codable {
    let popularPackages: [PopularPackages]
    let repositories: [Repositories]
}

let popularPackages = [
    PopularPackages(title: "Kitura",
                    url: "https://github.com/IBM-Swift/Kitura",
                    image: "public/assets/Kitura-White.svg",
                    alt: "Kitura"),
    
    PopularPackages(title: "Swift-KueryORM",
                    url: "https://github.com/IBM-Swift/Kitura",
                    image: "public/assets/Kitura-White.svg",
                    alt: "Swift-KueryORM"),
    
    PopularPackages(title: "SwiftMetrics",
                    url: "https://github.com/IBM-Swift/Kitura",
                    image: "public/assets/Kitura-White.svg",
                    alt: "SwiftMetrics"),
    
    PopularPackages(title: "KituraStencil",
                    url: "https://github.com/IBM-Swift/Kitura",
                    image: "public/assets/Kitura-White.svg",
                    alt: "KituraStencil"),
]

let coreTopics = [
    RepoTopics(title: "Kitura",
               url: "https://github.com/IBM-Swift/Kitura",
               apiUrl: "https://ibm-swift.github.io/Kitura/",
               description: "Core Kitura package."),
    
    RepoTopics(title: "KituraKit",
               url: "https://github.com/IBM-Swift/KituraKit",
               apiUrl: "https://ibm-swift.github.io/KituraKit/",
               description: "Client side library for using Codable routes with Kitura."),
    
    RepoTopics(title: "Kitura-Websocket",
               url: "https://github.com/IBM-Swift/Kitura-Websocket",
               apiUrl: "https://ibm-swift.github.io/Kitura-WebSocket/",
               description: "Provides socket support to Kitura based servers."),
]

let cloudTopics = [
    RepoTopics(title: "Health",
               url: "https://github.com/IBM-Swift/Health",
               apiUrl: nil,
               description: "Allow Swift apps to report health status."),
    
    RepoTopics(title: "CloudEnvironment",
               url: "https://github.com/IBM-Swift/CloudEnvironment",
               apiUrl: nil,
               description: "Convenience package for accessing variables mapped to JSON for Cloud environments."),
    
    RepoTopics(title: "SwiftMetrics",
               url: "https://github.com/RuntimeTools/SwiftMetrics",
               apiUrl: nil,
               description: "Instruments the Swift runtime uses for performance monitoring, via API or a visual dashboard."),
    
    RepoTopics(title: "Swift-cfenv",
               url: "https://github.com/IBM-Swift/Swift-cfenv",
               apiUrl: nil,
               description: "Allows parsing of Cloud Foundry configuration variables, like port number, IP and URL."),
    
    RepoTopics(title: "CircuitBreaker",
               url: "https://github.com/IBM-Swift/CircuitBreaker",
               apiUrl: nil,
               description: "A design pattern to improve response time, stability and prevent constant failure requests."),
    
    RepoTopics(title: "SwiftyRequest",
               url: "https://github.com/IBM-Swift/SwiftyRequest",
               apiUrl: nil,
               description: "HTTP networking library for Swift."),
]

let databaseTopics = [
    RepoTopics(title: "Swift-Kuery-ORM",
               url: "https://github.com/IBM-Swift/Swift-Kuery-ORM",
               apiUrl: "https://ibm-swift.github.io/Swift-Kuery-ORM/",
               description: "An ORM for Swift, built on Codable."),
    
    RepoTopics(title: "Swift-Kuery",
               url: "https://github.com/IBM-Swift/Swift-Kuery",
               apiUrl: "https://ibm-swift.github.io/Swift-Kuery/",
               description: "SQL database abstraction layer."),
    
    RepoTopics(title: "SwiftKueryMySQL",
               url: "https://github.com/IBM-Swift/SwiftKueryMySQL",
               apiUrl: "https://ibm-swift.github.io/SwiftKueryMySQL/",
               description: "MySQL plugin for Swift-Kuery framework."),
    
    RepoTopics(title: "Swift-Kuery-PostgreSQL",
               url: "https://github.com/IBM-Swift/Swift-Kuery-PostgreSQL",
               apiUrl: "https://ibm-swift.github.io/Swift-Kuery-PostgreSQL/",
               description: "PostgreSQL plugin for Swift-Kuery framework."),
    
    RepoTopics(title: "Swift-Kuery-SQLite",
               url: "https://github.com/IBM-Swift/Swift-Kuery-SQLite",
               apiUrl: "https://ibm-swift.github.io/Swift-Kuery-SQLite/",
               description: "SQLite plugin for Swift-Kuery framework."),
]

let sessionTopics = [
    RepoTopics(title: "Kitura-Session",
               url: "https://github.com/IBM-Swift/Kitura-Session",
               apiUrl: "https://ibm-swift.github.io/Kitura-Session/",
               description: "Framework for managing user sessions on a Kitura server."),
    
    RepoTopics(title: "Kitura-Sessions-Redis",
               url: "https://github.com/IBM-Swift/Kitura-Session-Redis",
               apiUrl: "https://ibm-swift.github.io/Kitura-Session-Redis/",
               description: "Kitura-Session store using Redis as the backing store."),
]

let credentialTopics = [
    RepoTopics(title: "Kitura-Credentials",
               url: "https://github.com/IBM-Swift/Kitura-Credentials",
               apiUrl: "https://ibm-swift.github.io/Kitura-Credentials/",
               description: "Validate user credentials on a Kitura server."),
    
    RepoTopics(title: "Kitura-CredentialsFacebook",
               url: "https://github.com/IBM-Swift/Kitura-CredentialsFacebook",
               apiUrl: "https://ibm-swift.github.io/Kitura-CredentialsFacebook/",
               description: "Plugin for the Credentials framework that authenticates using Facebook."),
    
    RepoTopics(title: "Kitura-CredentialsGitHub",
               url: "https://github.com/IBM-Swift/Kitura-CredentialsGitHub",
               apiUrl: "https://ibm-swift.github.io/Kitura-CredentialsGitHub/",
               description: "Plugin for the Credentials framework that authenticates using GitHub."),
    
    RepoTopics(title: "Kitura-CredentialsGoogle",
               url: "https://github.com/IBM-Swift/Kitura-CredentialsGoogle",
               apiUrl: "https://ibm-swift.github.io/Kitura-CredentialsGoogle/",
               description: "Plugin for the Credentials framework that authenticates using Google web login and a Google OAuth token."),
    
    RepoTopics(title: "Kitura-CredentialsHTTP",
               url: "https://github.com/IBM-Swift/Kitura-CredentialsHTTP",
               apiUrl: "https://ibm-swift.github.io/Kitura-CredentialsHTTP/",
               description: "Plugin for the Credentials framework that authenticates using HTTP Basic and Digest."),
    
    RepoTopics(title: "Kitura-CredentialsDropbox",
               url: "https://github.com/crspybits/CredentialsDropbox",
               apiUrl: nil,
               description: "Plugin for the Credentials framework that authenticates using a Dropbox OAuth2 token."),
    
    RepoTopics(title: "Kitura-CredentialsTwitter",
               url: "https://github.com/jacobvanorder/Kitura-CredentialsTwitter",
               apiUrl: nil,
               description: "Plugin for the Credentials framework that authenticates using the Twitter OAuth web login."),
]

let templatingTopics = [
    RepoTopics(title: "Kitura-TemplateEngine",
               url: "https://github.com/IBM-Swift/Kitura-TemplateEngine",
               apiUrl: "https://ibm-swift.github.io/Kitura-TemplateEngine/",
               description: "The Kitura template engine abstraction layer."),
    
    RepoTopics(title: "Kitura-StencilTemplateEngine",
               url: "https://github.com/IBM-Swift/Kitura-StencilTemplateEngine",
               apiUrl: "https://ibm-swift.github.io/Kitura-StencilTemplateEngine/",
               description: "Template engine for Kitura that uses Stencil based templates."),
    
    RepoTopics(title: "Kitura-Markdown",
               url: "https://github.com/IBM-Swift/Kitura-Markdown",
               apiUrl: "https://ibm-swift.github.io/Kitura-Markdown/",
               description: "Template engine for Kitura that uses Markdown based templates."),
    
    RepoTopics(title: "Kitura-MustacheTemplateEngine",
               url: "https://github.com/IBM-Swift/Kitura-MustacheTemplateEngine",
               apiUrl: "https://ibm-swift.github.io/Kitura-MustacheTemplateEngine/",
               description: "Template engine for Kitura that uses Mustache based templates."),
]

let backendDriverTopics = [
    RepoTopics(title: "Kitura-CouchDB",
               url: "https://github.com/IBM-Swift/Kitura-CouchDB",
               apiUrl: nil,
               description: "Allows Kitura to interact with CouchDB databases."),
    
    RepoTopics(title: "Kitura Redis",
               url: "https://github.com/IBM-Swift/Kitura-Redis",
               apiUrl: "http://ibm-swift.github.io/Kitura-redis/",
               description: "Library for interacting with a Redis database."),
]

let loggingTopics = [
    RepoTopics(title: "LoggerAPI",
               url: "https://github.com/IBM-Swift/LoggerAPI",
               apiUrl: "https://ibm-swift.github.io/LoggerAPI/",
               description: "Logger protocol for differing kinds of loggers."),
    
    RepoTopics(title: "HeliumLogger",
               url: "https://github.com/IBM-Swift/HeliumLogger",
               apiUrl: "https://ibm-swift.github.io/HeliumLogger/",
               description: "A lightweight Swift logging framework."),
]

let middlewareTopics = [
    RepoTopics(title: "Kitura-Cache",
               url: "https://github.com/IBM-Swift/Kitura-Cache",
               apiUrl: "https://ibm-swift.github.io/Kitura-Cache/",
               description: "In-memory, thread safe cache that allows object storage against a unique Hashable key."),
    
    RepoTopics(title: "Kitura-Compression",
               url: "https://github.com/IBM-Swift/Kitura-Compression",
               apiUrl: "https://ibm-swift.github.io/Kitura-Compression/",
               description: "Kitura compression middleware."),
    
    RepoTopics(title: "Kitura-CORS",
               url: "https://github.com/IBM-Swift/Kitura-CORS",
               apiUrl: "https://ibm-swift.github.io/Kitura-CORS/",
               description: "Kitura CORS middleware."),
]

let sampleAppTopics = [
    RepoTopics(title: "Kitura-Sample",
               url: "https://github.com/IBM-Swift/Kitura-Sample",
               apiUrl: nil,
               description: "Sample application demonstrating Kitura and IBM Swift features."),
    
    RepoTopics(title: "Kubernetes-Kitura-Sample",
               url: "https://github.com/IBM-Swift/Kubernetes-kitura-sample",
               apiUrl: nil,
               description: "Demonstration application using Kubernetes."),
    
    RepoTopics(title: "Kitura-Credentials-Sample",
               url: "https://github.com/IBM-Swift/Kitura-Credentials-Sample",
               apiUrl: nil,
               description: "Sample web application for authentication using Kitura-Credentials."),
]

let infrastructureTopics = [
    RepoTopics(title: "Kitura-net",
               url: "https://github.com/IBM-Swift/Kitura-net",
               apiUrl: "https://ibm-swift.github.io/Kitura-net/",
               description: "Logic for sending and receiving HTTP requests."),
    
    RepoTopics(title: "Kitura Contracts",
               url: "https://github.com/IBM-Swift/KituraContracts",
               apiUrl: "https://ibm-swift.github.io/KituraContracts/",
               description: "Type definitions shared by client and server."),
    
    RepoTopics(title: "BlueSocket",
               url: "https://github.com/IBM-Swift/BlueSocket",
               apiUrl: nil,
               description: "Socket framework for Swift."),
    
    RepoTopics(title: "BlueSSLService",
               url: "https://github.com/IBM-Swift/BlueSSLService",
               apiUrl: nil,
               description: "SSL/TLS add-in framework for BlueSocket."),
    
    RepoTopics(title: "BlueCryptor",
               url: "https://github.com/IBM-Swift/BlueCryptor",
               apiUrl: nil,
               description: "Cross-platform cryptography library."),
    
    RepoTopics(title: "BlueSignals",
               url: "https://github.com/IBM-Swift/BlueSignals",
               apiUrl: nil,
               description: "Generic cross-platform signal handler."),
    
    RepoTopics(title: "BlueRSA",
               url: "https://github.com/IBM-Swift/BlueRSA",
               apiUrl: nil,
               description: "Cross-platform RSA wrapper library."),
]

let miscTopics = [
    RepoTopics(title: "Swift-SMTP",
               url: "https://github.com/IBM-Swift/Swift-SMTP",
               apiUrl: nil,
               description: "A Swift SMTP mail client."),
    
    RepoTopics(title: "swift-html-entities",
               url: "https://github.com/IBM-Swift/swift-html-entities",
               apiUrl: nil,
               description: "Pure Swift HTML encode and decode utility tool."),
    
    RepoTopics(title: "Swift-JWT",
               url: "https://github.com/IBM-Swift/Swift-JWT",
               apiUrl: nil,
               description: "An implementation of JSON Web Tokens in Swift."),
    
    RepoTopics(title: "Bridging",
               url: "https://github.com/IBM-Swift/Bridging",
               apiUrl: nil,
               description: "Bridges functions between macOS and Linux."),
    
    RepoTopics(title: "TypeDecoder",
               url: "https://github.com/IBM-Swift/TypeDecoder",
               apiUrl: nil,
               description: "Allows inspection of native and complex types."),
    
    RepoTopics(title: "Configuration",
               url: "https://github.com/IBM-Swift/Configuration",
               apiUrl: "https://ibm-swift.github.io/Configuration/",
               description: "Manages application configurations."),
    
    RepoTopics(title: "FileKit",
               url: "https://github.com/IBM-Swift/FileKit",
               apiUrl: nil,
               description: "Utility for resolving common paths."),
]

let repositories = [
    Repositories(title: "CORE",
                 className: "core card",
                 image: "public/assets/core.svg",
                 alt: "Core",
                 topics: coreTopics),
    
    Repositories(title: "CLOUD",
                 className: "cloud card",
                 image: "public/assets/cloud.svg",
                 alt: "Cloud",
                 topics: cloudTopics),
    
    Repositories(title: "DATABASE",
                 className: "sql card",
                 image: "public/assets/sql.svg",
                 alt: "Database",
                 topics: databaseTopics),
    
    Repositories(title: "SESSIONS",
                 className: "sessions card",
                 image: "public/assets/sessions.svg",
                 alt: "Sessions",
                 topics: sessionTopics),
    
    Repositories(title: "CREDENTIALS",
                 className: "credentials card",
                 image: "public/assets/credentials.svg",
                 alt: "Credentials",
                 topics: credentialTopics),
    
    Repositories(title: "TEMPLATING",
                 className: "templating card",
                 image: "public/assets/file.png",
                 alt: "Templating",
                 topics: templatingTopics),
    
    Repositories(title: "BACKEND DRIVERS",
                 className: "backend card",
                 image: "public/assets/backend.svg",
                 alt: "Backend",
                 topics: backendDriverTopics),
    
    Repositories(title: "LOGGING",
                 className: "logging card",
                 image: "public/assets/logging.svg",
                 alt: "Logging",
                 topics: loggingTopics),
    
    Repositories(title: "MIDDLEWARE",
                 className: "middleware card",
                 image: "public/assets/middleware.svg",
                 alt: "Middleware",
                 topics: middlewareTopics),
    
    Repositories(title: "SAMPLE APPS",
                 className: "samples card",
                 image: "public/assets/sample.svg",
                 alt: "Sample Apps",
                 topics: sampleAppTopics),
    
    Repositories(title: "INFRASTRUCTURE",
                 className: "infrastructure card",
                 image: "public/assets/infrastructure.png",
                 alt: "Infrastructure",
                 topics: infrastructureTopics),
    
    Repositories(title: "MISC",
                 className: "misc card",
                 image: "public/assets/misc.svg",
                 alt: "Misc",
                 topics: miscTopics),
]

let packagesContext = PackageWrapper(popularPackages: popularPackages,
                                    repositories: repositories)
