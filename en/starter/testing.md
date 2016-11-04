---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Testing your Kitura Apps
menu: starter
lang: en
redirect_from: "/starter/testing.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Testing your Kitura Apps

This article will walk you through setting up tests in accordance of the XCTest framework which is bundled with the Swift binary.

# Setting up the Tests directory
1. In the root level of your project, create a folder called `Tests`.
2. Inside the `Tests` directory you'll need to create a folder for holding your test suite module. It is recommended that it is the same name as your App module, suffixed with `Tests` (for example: `AppTests`).

# Creating Test Cases
1. Create a new Swift file in the test suite folder (for example: `AppTests/FooTests.swift`)
2. When setting up this file you'll want to add `@testable import <module-name>` for each of the modules you want to test. (Note the `@testable` keyword allows you to call internal methods in your tests)
3. Create your testing class as a subclass of `XCTestCase` (for example: `class FooTests: XCTestCase { ... }`)
4. Create each test case as a different function within the testing class (for example: `func testFrobbingTheFoo() { ... }`). Note that each function must begin with the string "test". You can use [Apple's guide](https://developer.apple.com/library/mac/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/04-writing_tests.html) for tips on how to make good test cases.
5. For Linux compatibility, you will need to add an additional class variable to your test class named `allTests` which has a signature like (substituting the name of the class from (3) in place of `FooTests`):
```swift
static var allTests : [(String, (FooTests) -> () throws -> Void)]
```
This should hold an array of tuples matching a string name to the function name for each test case. For example:
```swift
static var allTests : [(String, (FooTests) -> () throws -> Void)] {
  return [
    ("testFrobbingTheFoo", testFrobbingTheFoo)
  ]
}
```

# Creating Test Main (Linux only)
1. Inside your `Tests` directory, create a new file called `LinuxMain.swift`.
2. In this file import all your test modules. The names of the test modules are the names of your test suite directories (eg: `AppTests`, which will import any classes defined in Swift files inside the `AppTests` module).
3. Import `XCTest` as well
4. Invoke XCTMain with an array as follows:
```swift
XCTMain([
           testCase(FooTests.allTests),
           testCase(BarTests.allTests)
        ])
```

# Run Tests
1. In your project root directory run the command `swift test` after having built them using `swift build`.

# Example project
A working project based on the examples above is available at [[insert github url here]]
