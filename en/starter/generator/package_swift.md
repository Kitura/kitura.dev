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

For more information, see the [Package.swift documentation](https://swift.org/package-manager/).

---

## Example

    import PackageDescription

    let package = Package(
      name: "ExampleApplication",
      targets: [
        Target(name: "ExampleApplication", dependencies: [ .Target(name: "Generated") ]),
      ],
      dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 1, minor: 1),
        .Package(url: "https://github.com/IBM-Swift/GeneratedSwiftServer.git", majorVersion: 0, minor: 3),
        .Package(url: "https://github.com/IBM-Swift/HeliumLogger.git", majorVersion: 1, minor: 1),
        .Package(url: "https://github.com/IBM-Swift/GeneratedSwiftServer-CloudantStore.git", majorVersion: 0, minor: 3),
      ]
    )


[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
