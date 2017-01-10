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
<span class="arrow">&#8227;</span> In the root level of your project, create a directory called `Tests`.

<span class="arrow">&#8227;</span> Inside `Tests` create a directory for holding your test suite module. It is recommended that it is the same name as the module you wish to test, suffixed with `Tests` (for example: if you have a module `Foo` that you would like to test, create a directory `FooTests`).

<hr>
## Creating Test Cases
<span class="arrow">&#8227;</span> Create a new Swift file in the test suite directory (for example: if you would like to test the Frob feature of your `Foo` module you might call it `FooTests/FrobTests.swift`)

<span class="arrow">&#8227;</span> Add `import XCTest` at the top

<span class="arrow">&#8227;</span> Add a line `@testable import <module-name>` for each of the modules you want to access in this set of tests. (Note the `@testable` keyword allows you to call internal methods in your tests)

<span class="arrow">&#8227;</span> Create your testing class as a subclass of `XCTestCase` (for example: `class FrobTests: XCTestCase { ... }`)

<span class="arrow">&#8227;</span> Create each test case as a different function within the testing class (for example: `func testFrobbingTheFoo() { ... }`). Note that each function must begin with the string "test". You can use [Apple's guide](https://developer.apple.com/library/mac/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/04-writing_tests.html) for tips on how to make good test cases.

<span class="arrow">&#8227;</span> For Linux compatibility, you will need to add an additional class variable to your test class named `allTests` which has a signature like (substituting the name of the class from (3) in place of `FrobTests`):

```swift
static var allTests : [(String, (FrobTests) -> () throws -> Void)]
```

This should hold an array of tuples matching a string name to the function name for each test case. For example:

```swift
static var allTests : [(String, (robTests) -> () throws -> Void)] {
  return [
    ("testFrobbingTheFoo", testFrobbingTheFoo)
  ]
}
```

<hr>
## Creating Test Main (Linux only)
<span class="arrow">&#8227;</span> Inside your `Tests` directory, create a new file called `LinuxMain.swift`

<span class="arrow">&#8227;</span> In this file import all your test modules. The names of the test modules are the names of your test suite directories (eg: `FooTests`, which will import any classes defined in Swift files inside the `FooTests` module).

<span class="arrow">&#8227;</span> Import `XCTest` as well

<span class="arrow">&#8227;</span> Invoke XCTMain with an array as follows:

```swift
XCTMain([
           testCase(FrobTests.allTests)
        ])
```

<hr>
## Run Tests
In your projects root directory, run the command `swift test` after having built them using `swift build`.

<hr>
## Example files:

<span class="arrow">&#8227;</span>  Tests/FooTests/FrobTests.swift:

```swift
import XCTest
@testable import Foo

class FrobTests: XCTestCase {
  static var allTests: [(String, (FrobTests) -> () throws -> Void)] {
    return [
      ("testFrobbingTheFoo", testFrobbingTheFoo)
    ]
  }

  func testFrobbingTheFoo() {
    let foo = Foo()
    foo.frob()
    foo.frob()
    XCTAssertEqual(2, foo.frobCount, "incorrect number of frobs recorded")
  }
}
```

<span class="arrow">&#8227;</span> Tests/LinuxMain.swift:

```swift
import XCTest
@testable import FooTests

XCTMain([
  testCase(FrobTests.allTests)
])
```

<span class="arrow">&#8227;</span> Sources/Foo/Foo.swift:

```swift
public class Foo: CustomStringConvertible {
  internal var frobCount = 0

  public func frob() {
    frobCount = frobCount + 1
  }

  public var description: String {
    return (frobCount == 0 ? "unfrobbed" : "frobbed")
  }

  public init() {}
}
```

[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png
