---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Building your Kitura app in Xcode
menu: starter
lang: en
redirect_from: "/starter/xcode.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png

<div class="titleBlock">
	<h1>Building within Xcode</h1>
</div>

> ![info] If you used `kitura init` or `kitura create` to generate your web application, the .xcodeproj file will have been created already.

## Setting up an Xcode project for your Kitura application

You can develop, test and run your Kitura app in Xcode. This gives you productivity features such as debugging, autocompletion, and syntax checking.

Swift Package Manager can generate an Xcode project for you by reading your project's `Package.swift` file. It will automatically set up several targets that will be built using Xcode &mdash; note that when Xcode builds the project it is not using `swift build`, rather it uses its internal build process.

> ![tip] Tip: Before starting this, make sure you can successfully build and run your Kitura app from the command-line using `swift build`.

<span class="arrow">&#8227;</span> Go to your project directory where you have your `Package.swift` file

<span class="arrow">&#8227;</span> Run:

```
swift package generate-xcodeproj
```

<span class="arrow">&#8227;</span> Open the generated project in Xcode.

<span class="arrow">&#8227;</span> Change the build scheme to your executable. Xcode defaults to the module of the same name, which won't run.

<span class="arrow">&#8227;</span> Run.

<hr>

## Develop iOS application and Kitura on the same workspace

<span class="arrow">&#8227;</span> Follow the above instructions for creating an Xcode project for your Kitura app. For example:

```
./MyApp-server.xcodeproj
```

<span class="arrow">&#8227;</span> Create a new iOS project and sources in a new subdirectory e.g.

```
client/MyApp-ios.xcodeproj
```

<span class="arrow">&#8227;</span> Create a new Xcode workspace in the root of your directory:

```
./MyApp.xcworkspace
```

<span class="arrow">&#8227;</span> Open up Finder and drag and drop your `MyApp-server.xcodeproj` and `MyApp-ios.xcodeproj` to your workspace.

<span class="arrow">&#8227;</span> Be sure to choose to create new references to these projects and sources, but do not actually copy the files in the filesystem.

<span class="arrow">&#8227;</span> Select the scheme you wish to build the server and the client respectively.

<hr>

## Toolchain Settings

We want to use a specific version of toolchain for a Kitura app, however, for an iOS app we have to use Xcode's default toolchain.

To solve this situation:

For iOS:
- Set the toolchain setting to Xcode's default (menu: Xcode => Toolchains).

For Kitura app:
- Download the correct toolchain directly from [swift.org](https://swift.org/) (the toolchain might be under `Older snapshots`), install it, then go to `Xcode` => `Toolchains` and select your desired toolchain.

<section class="social-section">
	<div class="social-link">
		<a rel="nofollow" href="http://swift-at-ibm-slack.mybluemix.net">
		<img src="https://developer.ibm.com/swift/wp-content/uploads/sites/69/2018/01/slack-150x150.png" alt="Slack Logo" width="60" height="60" class="social-image"/></a>
		<p class="social-header">Join the discussion on Slack</p>
	</div>
	<div  class="social-link">
		<iframe class="social-image" src="https://ghbtns.com/github-btn.html?user=IBM-Swift&amp;repo=Kitura&amp;type=star&amp;count=true&amp;size=large" frameborder="0" scrolling="0" width="150px" height="30px"></iframe>
		<p class="social-header">Star Kitura on GitHub</p>
	</div>
</section>
