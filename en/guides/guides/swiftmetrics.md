---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Monitoring with Application Metrics for Swift
menu: resources
lang: en
redirect_from: "/resources/swiftmetrics.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
  <h1>Application Metrics for Swift (SwiftMetrics)</h1>
  <p>Example showing how to add SwiftMetrics monitoring to your Kitura application and visualise the data in your browser</p>
</div>

## What is SwiftMetrics

[SwiftMetrics](https://developer.ibm.com/swift/monitoring-diagnostics/application-metrics-for-swift/) instruments the Swift runtime for performance monitoring.  The monitoring data is provided back to the user either
 programatically via an API or visually with the included embedded dashboard.

SwiftMetrics provides the following built-in data collection sources:

Source | Description
------ | -----------
Environment | Machine and runtime environment information
CPU | Process and system CPU
Memory | Process and system memory usage
HTTP | HTTP metric information

---

## Adding SwiftMetrics monitoring to your application

To add SwiftMetrics monitoring to your code

```swift
import SwiftMetrics
import SwiftMetricsDash

// Enable SwiftMetrics Monitoring
let sm = try SwiftMetrics()   

// Pass SwiftMetrics to the dashboard for visualising
let smd = try SwiftMetricsDash(swiftMetricsInstance : sm)   
```

and amend Package.swift to include the SwiftMetrics dependency with the major and minor [release version](https://github.com/RuntimeTools/SwiftMetrics/releases) that is compatible with your **Swift version**.


```swift
   dependencies: [
      .package(url: "https://github.com/RuntimeTools/SwiftMetrics.git", from: "#.#.#")
      ]     
```

By default, SwiftMetricsDash will start its own Kitura server and serve the page up under localhost:<port>/swiftmetrics-dash

The port being used is logged to the console when your application starts

**SwiftMetricsDash : Starting on port 8080**

You can pass an existing Router object to SwiftMetricsDash from which to serve the page up on.  SwiftMetricsDash will then use
whatever server you are using in your existing application.

```swift
let sm = try SwiftMetrics()   
let router: Router

// Activate the Swift Metrics dashboard.
let _ = try SwiftMetricsDash(swiftMetricsInstance: sm, endpoint: router)

// Add an HTTP server and connect it to the router
Kitura.addHTTPServer(onPort: 8080, with: router)  
```

---
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

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
