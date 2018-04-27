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
[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png

<div class="titleBlock">
	<h1>Getting Started</h1>
	<p>Develop your first Kitura web application.</p>
</div>

## Installation

<span class="arrow">&#8227;</span> Install [prerequisites](/{{ page.lang }}/starter/settingup.html).

<span class="arrow">&#8227;</span> Install the Kitura command-line interface, following the instructions appropriate to your platform:
### MacOS

Add Kitura's Homebrew tap so that ```brew``` can access Kitura's package repository, then install the Kitura CLI:
```
brew tap ibm-swift/kitura
brew install kitura
```

### Linux

```
npm install -g kitura-cli
```

## Generating your first Kitura project

<span class="arrow">&#8227;</span> Create a directory for your Kitura project.

```
mkdir HelloKitura
cd HelloKitura
```

<span class="arrow">&#8227;</span> Using the Kitura command-line interface, generate a basic starter project.

```
kitura init
```

> ![info] You can learn more about the generated [project structure](/{{ page.lang }}/starter/generator/project_layout_reference.html).

<span class="arrow">&#8227;</span> Open the generated `HelloKitura.xcodeproj` project in Xcode.

```
open HelloKitura.xcodeproj
```


<span class="arrow">&#8227;</span> Edit `Sources/Application/Application.swift` and add the following code inside the `postInit()` function.

```swift
// Handle HTTP GET requests to /
router.get("/") {
    request, response, next in
    response.send("Hello, World!")
    next()
}
```

<span class="arrow">&#8227;</span> Edit the Xcode build scheme so it specifies HelloKitura as the Executable (by default it will be set to HelloKitura-Package when you open Xcode).

<img src="../../assets/Edit_Xcode_Build_Schema.png" alt="EditXcodeBuildSchema" width="400" style="max-width:100%"/>

<span class="arrow">&#8227;</span> Click the play button (&#8984;-R) to build and run your new web application.

<span class="arrow">&#8227;</span> Open your web browser at [http://localhost:8080](http://localhost:8080).

<span class="arrow">&#8227;</span> You should see the following page in your browser:

```
"Hello, World!"
```

<b>Congratulations!</b> You have just created your first server-side Swift application using Kitura.

<hr>
## Next

* Learn how to build a back-end for the [TodoList web application](https://github.com/IBM/ToDoBackend).

* Learn how to build a back-end for the [Apple FoodTracker iOS application](https://github.com/IBM/FoodTrackerBackend).

<section class="social-section">
	<div class="social-link">
		<a rel="nofollow" href="http://swift-at-ibm-slack.mybluemix.net">
		<img src="../../../assets/slack.png" alt="Slack Logo" width="60" height="60" class="social-image"/></a>
		<p class="social-header">Join the discussion on Slack</p>
	</div>
	<div  class="social-link">
		<iframe class="social-image" src="https://ghbtns.com/github-btn.html?user=IBM-Swift&amp;repo=Kitura&amp;type=star&amp;count=true&amp;size=large" frameborder="0" scrolling="0" width="150px" height="30px"></iframe>
		<p class="social-header">Star Kitura on GitHub</p>
	</div>
</section>
