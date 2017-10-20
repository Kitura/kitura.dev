---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Kitura "Hello World" example
menu: starter
lang: en
redirect_from: "/starter/helloworld.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Getting Started</h1>
	<p>Let's develop your first Kitura web application!</p>
</div>

<span class="arrow">&#8227;</span> Install [prerequisites](/{{ page.lang }}/starter/settingup.html).

<span class="arrow">&#8227;</span> Install Homebrew Tap.

Installing Kitura's Homebrew tap will allow ```brew``` to access (or tap into!) Kitura's package repository.

```
$ brew tap ibm-swift/kitura
```

<span class="arrow">&#8227;</span> Install Kitura's CLI.

Now you can install Kitura's Command Line Interface and dependencies.

```
$ brew install kitura-cli
```

<span class="arrow">&#8227;</span> Next let's create a directory for your Kitura project.

```
$ mkdir HelloKitura
$ cd HelloKitura
```

<span class="arrow">&#8227;</span> Create a basic starter project using the Kitura CLI.

```
$ kitura init
```

> ![info] The ```kitura init``` command creates a new web application, in this case called "HelloKitura".
It also invokes ```swift build``` which calls the Swift Package Manager. The Swift Package Manager downloads
the dependencies and compiles and links these together.

<span class="arrow">&#8227;</span> Open the application in Xcode, using the HelloKitura.xcodeproj file which has been created for you.

```
$ open HelloKitura.xcodeproj
```

<span class="arrow">&#8227;</span> You can learn more about the generated [project structure](/{{ page.lang }}/starter/generator/project_layout_reference.html).

<span class="arrow">&#8227;</span> In `Sources/Application/Application.swift`, add the following code inside the postInit() function.

```swift
// Handle HTTP GET requests to /
router.get("/") {
    request, response, next in
    response.send("Hello, World!")
    next()
}
```

<span class="arrow">&#8227;</span> Edit the Xcode build scheme so it specifies HelloKitura as the Executable.

<span class="arrow">&#8227;</span> Click "Run" to run your new web application.

<span class="arrow">&#8227;</span> Open your browser at [http://localhost:8080](http://localhost:8080).

<span class="arrow">&#8227;</span> You should see the following output in your browser:

```
"Hello, World!"
```

<hr>
If you like what you've seen of Kitura so far, star the repository by clicking the button below.

<iframe src="https://ghbtns.com/github-btn.html?user=IBM-Swift&repo=Kitura&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

<hr>
## Next Steps

Learn how to [Deploy your Application to the Cloud](/{{ page.lang }}/starter/deploying.html).

[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png
