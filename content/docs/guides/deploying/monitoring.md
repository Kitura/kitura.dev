---
path: "/docs/deploying/monitoring"
title: Monitor the status of your Server
---

#Monitor the status of your Server

>Depending on how you created your Kitura server you may already have metrics enabled.

##What is Application Metrics for Swift?

[Application Metrics for Swift](https://github.com/RuntimeTools/SwiftMetrics) instruments the Swift runtime for performance monitoring. The monitoring data is provided back to the user either programatically via an API, or visually with the included embedded dashboard.

This guide will show you how to set up the embedded dashboard to view monitoring data. It then describes how to provide a [Prometheus](https://prometheus.io) endpoint and how to collect metrics from your Swift application using the REST API.

Application Metrics for Swift provides the following built-in data collection sources:

| Source      | Description                                 |
| ----------- | ------------------------------------------- |
| Environment	| Machine and runtime environment information |
| CPU         | Process and system CPU                      |
| Memory	    | Process and system memory usage             |
| HTTP	      | HTTP metric information                     |

---

##Step 1: Add Application Metrics for Swift to your project

To use Application Metrics for Swift from your server, we need to [add SwiftMetrics to our dependencies](https://github.com/RuntimeTools/SwiftMetrics#installation).

> If you don't have a server, follow our [Create a server](../getting-started/create-server-cli) guide.

Import the base Application Metrics for Swift library into your project:

```swift
import SwiftMetrics
```

Import the Application Metrics for Swift dashboard:

```swift
import SwiftMetricsDash
```

---

##Step 2: Initialize Application Metrics for Swift

Create an instance of `SwiftMetrics`:

```swift
let sm = try SwiftMetrics()
```

Use this `SwiftMetrics` instance to initialize the dashboard:

```swift
let smd = try SwiftMetricsDash(swiftMetricsInstance : sm)
```

When you initialize a `SwiftMetricsDash` with just a `SwiftMetrics` instance, a Kitura server will be started that will serve the dashboard at http://localhost:8080/swiftmetrics-dash. If we only want to use a single interface, such as the dashboard, then this is fine. However if we add a second, for example a Prometheus endpoint, they will try to create servers on the same port and will conflict with each other.

Next we will show you how to create and pass a `Router` object to the initializer, so that multiple types of monitoring can coexist.

---

##Step 3: Using Application Metrics for Swift with a router

You can pass an existing `Router` instance to the `SwiftMetricsDash` initializer and it will use this router to serve the dashboard. If you don't have a `Router`, you can create one as follows:

```swift
var router = Router()
```

`SwiftMetricsDash` will then add its dashboard's endpoint to the provided router:

```swift
let smd = try SwiftMetricsDash(swiftMetricsInstance: sm, endpoint: router)
```

You can add multiple monitoring interfaces to the same router and they will all be served together.

You can now view our dashboard by starting the router on a Kitura server:

```swift
Kitura.addHTTPServer(onPort: 8080, with: router)
Kitura.run()
```

Once the server is running, go to http://localhost:8080/swiftmetrics-dash.

---

##Step 4: Add Prometheus support

To use Application Metrics for Swift to provide a [Prometheus](https://prometheus.io) endpoint, you must include the `SwiftMetricsPrometheus` module in your application:

```swift
import SwiftMetrics
import SwiftMetricsPrometheus
```

As above, we need to create an instance of `SwiftMetrics`:

```swift
let sm = try SwiftMetrics()
```

Use this `SwiftMetrics` instance and your `Router` object to initialize Prometheus:

```swift
let smp = try SwiftMetricsPrometheus(swiftMetricsInstance: sm, endpoint: router)
```

By default, `SwiftMetricsPrometheus` will provide the Prometheus endpoint under http://localhost:8080/metrics.

---

##Step 5: Add REST API support

The [Application Metrics for Swift REST API](https://github.com/RuntimeTools/SwiftMetrics/blob/master/REST-API.md) enables the collection of metrics from the running Swift application. The API context root will be the server's default endpoint plus `"/swiftmetrics"` e.g. http://localhost:8080/swiftmetrics.

To enable the REST API in your program, you must include the `SwiftMetricsREST` module in your application:

```swift
import SwiftMetrics
import SwiftMetricsREST
```

As above, we need to create an instance of `SwiftMetrics`:

```swift
let sm = try SwiftMetrics()
```

Use this `SwiftMetrics` instance and your `Router` object to initialize your REST API:

```swift
let smr = try SwiftMetricsREST(swiftMetricsInstance: sm, endpoint: router)
```

Metrics are accumulated in a `collection`. The start time of the metrics accumulation is from either, creation of the collection `POST <context_root>/api/v1/collections`, or, from the time of a clear request `PUT <context_root>/api/v1/collection/{id}`.

First you need to create a new metrics collection. Metrics are recorded from the point of the creation of the collection. To create a collection you can use curl as follows:

```
curl -X POST http://localhost:8080/swiftmetrics/api/v1/collections
```

This will return the URI for your collection:

```
"uri" : "collections\/0"
```

Metrics can now be retrieved from the collection at whatever intervals you choose using `GET` as follows:

```
curl -X GET http://localhost:8080/swiftmetrics/api/v1/collections/0
```

Metrics are returned in JSON format for processing. You can use `PUT` to clear the metrics if required.

Metrics can be deleted using `DELETE` as follows:

```
curl -X DELETE http://localhost:8080/swiftmetrics/api/v1/collections/0
```

For more information about how to use the REST API and the available collection operations see the [documentation](https://github.com/RuntimeTools/SwiftMetrics/blob/master/REST-API.md).
