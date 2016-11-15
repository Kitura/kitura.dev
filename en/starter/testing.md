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

<div class="titleBlock">
	<h1>Testing your Kitura apps</h1>
	<p>This guide will walk you through setting up tests in accordance of the XCTest framework, which is bundled with the Swift binary.</p>
</div>

## Setting up the Tests directory
<span class="arrow">&#8227;</span> In the root level of your project, create a folder called `Tests`.

<span class="arrow">&#8227;</span> Inside the `Tests` directory you'll need to create a folder for holding your test suite module. It is recommended that it is the same name as your App module.

<hr>
## Creating Test Cases
<span class="arrow">&#8227;</span> Create a new Swift file in the test suite folder.

<span class="arrow">&#8227;</span> When setting up this file you'll want to add `@testable import <module-name>` for each of the modules you want to test. (Note the `@testable` keyword allows you to call internal methods in your tests)

<span class="arrow">&#8227;</span> Create your testing class as a subclass of `XCTestCase`

<span class="arrow">&#8227;</span> Create each test case as a different function within the testing class. Note that each function must begin with the string "test". You can use [Apple's guide](https://developer.apple.com/library/mac/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/04-writing_tests.html) for tips on how to make good test cases.

<span class="arrow">&#8227;</span> For Linux compatibility, you will need to add an additional class variable to your test class named `allTests` which has the signature:

```swift
static var allTests : [(String, (MyModuleTests) -> () throws -> Void)]
```

This should hold an array of tuples matching a string name to the function name for each test case.

<hr>
## Creating Test Main (Linux only)
<span class="arrow">&#8227;</span> Inside your `Tests` directory, create a new file called `LinuxMain.swift`.

<span class="arrow">&#8227;</span> In this file import all your test modules. The names of the test modules are `<folder-name>test`.

<span class="arrow">&#8227;</span> Import `XCTest` as well

<span class="arrow">&#8227;</span> Invoke XCTMain with an array as follows:

```swift
XCTMain([
           testCase(TestClass1.allTests),
           testCase(TestClass2.allTests)
        ])
```

<hr>
## Run Tests
In your projects root directory, run the command `swift test` after having built them using `swift build`.

<hr>
## Example Test File

```swift
@testable import MyModule

class MyModuleTests: XCTestCase {
    static var allTests : [(String, (MyModuleTests) -> () throws -> Void)] {
        return [
            ("testAsserts", testAsserts)
        ]
    }

    func testAsserts() {
        XCTAssertEqual(1, 1, "Message shown when assert fails")
        XCTAssertNil(foo, "Message shown when assert fails")
        XCTFail("Message always shows since this always fails")
        // Other Asserts can be used as well
    }
}
```

[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
