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
# Setting up an Xcode project for your Kitura application 

You can develop, test and run your Kitura app in Xcode. This gives you productivity features such as debugging, autocompletion, and syntax checking.

Swift Package Manager can generate an Xcode project for you by reading your project's `Package.swift` file. It will automatically set up several targets that will be built using Xcode &mdash; note that when Xcode builds the project it is not using `swift build`, rather it uses its internal build process. 

> Before starting this, make sure you can successfully build and run your Kitura app from the command-line using `swift build`. Also, install the xcodeproj gem using `gem install xcodeproj`.

1. Go to your project directory where you have your `Package.swift` file 
2. Run `swift package generate-xcodeproj`
3. Open the generated project in Xcode.
4. *Change the build scheme to your executable*. Xcode defaults to the module of the same name, which won't run.
5. Run.

# Develop iOS application and Kitura on the same workspace

1. Follow the above instructions for creating an Xcode project for your Kitura app. For example, `./MyApp-server.xcodeproj`
2. Create a new iOS project and sources in a new subdirectory e.g. `client/MyApp-ios.xcodeproj`
3. Create a new Xcode workspace in the root of your directory `./MyApp.xcworkspace` 
4. Open up Finder and drag and drop your `MyApp-server.xcodeproj` and `MyApp-ios.xcodeproj` to your workspace.
5. Be sure to choose to create new references to these projects and sources, but do not actually copy the files in the filesystem.
6. Select the scheme you wish to build the server and the client respectively.

