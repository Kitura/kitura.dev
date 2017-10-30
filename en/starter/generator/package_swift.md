---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Package.swift
menu: starter
lang: en
redirect_from: "/starter/generator/package_swift.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1><code>Package.swift</code></h1>
</div>

The `Package.swift` file is the manifest file for Swift package management. Its uses include setting up package dependencies.

The `Package.swift` file must be in the application root directory.

For more information, see the [Package.swift documentation](https://swift.org/blog/swift-package-manager-manifest-api-redesign/).

---

## Example
```swift
// swift-tools-version:4.0
import PackageDescription

let package = Package(
  name: "ExampleApplication",
  dependencies: [
    .package(url: "https://github.com/IBM-Swift/Kitura.git", .upToNextMinor(from: "1.6.0")),
    .package(url: "https://github.com/IBM-Swift/HeliumLogger.git", .upToNextMinor(from: "1.2.0")),
    .package(url: "https://github.com/IBM-Swift/CloudEnvironment.git", from: "1.0.0")
  ],
  targets: [
    .target(name: "ExampleApplication", dependencies: [ .target(name: "Application") , "Kitura", "HeliumLogger", "CloudEnvironment"]),
  ]
)
```




[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
