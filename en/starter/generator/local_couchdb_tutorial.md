---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Setting up a local CouchDB application
menu: starter
lang: en
redirect_from: "/starter/generator/local_couchdb_tutorial.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---
[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png

<div class="titleBlock">
	<h1>Setting up a local CouchDB application</h1>
	<p>How to setup a Kitura application that can access a local CouchDB database.</p>
</div>

**Prerequisities:**

> ![warning] Make sure you have installed the command-line tools as described in
> [Getting Started](../gettingstarted.html) before you begin.

---

Install CouchDB locally:

The full CouchDB documentation can be found in the [CouchDB documentation](http://docs.CouchDB.org), and the installation documentation for version 1.6.0 on Linux, Mac and Windows is [here](http://docs.couchdb.org/en/1.6.0/install/index.html).  Once installed, you can verify the installation with a [curl](https://curl.haxx.se) command:

```
$ curl http://127.0.0.1:5984/
{"couchdb":"Welcome","uuid":"c8693df0aa80678d55a2dc2084c32f9b","version":"1.6.0","vendor":{"name":"Ubuntu","version":"15.10"}}
```

# Generating the scaffolded application

<span class="arrow">&#8227;</span> First, start the Kitura server generation (see [Command line tools](command_line_tools.html)):

    $ kitura create

<span class="arrow">&#8227;</span> Enter `couchdb-getting-started` as the application name.

    ? What's the name of your application? couched-getting-started

> ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `couchdb-getting-started` throughout the rest of this tutorial.

<span class="arrow">&#8227;</span> Press **Enter** to accept the default directory for the project (the same as the application name).

    ? Enter the name of the directory to contain the project: (couchdb-getting-started)

<span class="arrow">&#8227;</span> Select `Scaffold a starter` at the [type of project prompt](prompts.html#project-type-prompt) and press **Enter**.

    ? Select type of project: (Use arrow keys)
    ❯ Scaffold a starter
      Generate a CRUD application

<span class="arrow">&#8227;</span> Select [`Basic`](prompts.html#basic-pattern) at the [application pattern prompt](prompts.html#application-pattern-prompt) (this determines the default set of capabilities) and press **Enter**.

    ? Select capability presets for application pattern: (Use arrow keys)
    ❯ Basic
      Web
      Backend for frontend

<span class="arrow">&#8227;</span> Press **Enter** to accept the other default [capabilities](core_concepts.html#capabilities) for the [`Basic`](prompts.html#basic-pattern) application pattern.

    ? Select capabilities: (Press <space> to select)
      ◯ Static web file serving
    ❯ ◯ Swagger UI
      ◉ Embedded metrics dashboard
      ◉ Docker files

<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not generating code from a [swagger](core_concepts.html#endpoints-from-swagger-file) specification in the scaffolding.

    ? Select endpoints to generate: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◯ Swagger file serving endpoint
      ◯ Endpoints from a swagger file

<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not generating a Swift server SDK from a swagger file in the scaffolding.

    ? Would you like to generate a Swift server SDK from a Swagger file? (y/N)

---
<span class="arrow">&#8227;</span> Press **Space** to select the Cloudant / CouchDB boilerplate for inclusion as a [service](core_concepts.html#services) in the scaffolding.

    ? Generate boilerplate for services: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◉ Cloudant / CouchDB
      ◯ Redis
      ◯ MongoDB
      ◯ PostgreSQL
      ◯ Object Storage
      ◯ AppID
      ◯ Auto-scaling

<span class="arrow">&#8227;</span> Leave the Cloudant / CouchDB option unchecked to allow CouchDB to be accessed at port **5984** on **localhost**.

> ![info] Note: If you opt for setting the service credentials, then you will get further questions about the specifics of the CouchDB service.


    ? Configure service credentials (leave unchecked for defaults): (Press <space> to select, <a> to toggle all...
    ❯ ◯ Cloudant / CouchDB

---

The generator will display messages as it scaffolds and builds the application including:

1.  Initializing the project folder structure.

1.  Creating and compiling default Swift files.

1.  Downloading and installing dependent Swift modules (as if you had manually run `swift build`).

<span class="arrow">&#8227;</span> Now you should have a generated application directory similar to this:
<pre>
couchdb-getting-started/
├── Sources/
│   ├── Application
│   │   ├── Application.swift
│   │   ├── CloudantConfig.swift
│   │   └── Routes/
│   └── couchdb-getting-started
│       └── main.swift
├── Package.swift
├── README.md
├── config.json
└── ...
</pre>

> ![info] For a description of the generated files, take a look at the structure of a generated project in the [Project layout reference](project_layout_reference.html).

<span class="arrow">&#8227;</span> Change to the application directory:

```
$ cd couchdb-getting-started
```

<span class="arrow">&#8227;</span> Now modify your application to create a CouchDB database. This can be done by adding a line of swift code to create a database: Modify Sources/Application/Application.swift as shown below.

```swift
import Foundation
import Kitura
import LoggerAPI
import Configuration
import CloudEnvironment
import Health

// Service imports
import CouchDB

public let projectPath = ConfigurationManager.BasePath.project.path
public let health = Health()

class ApplicationServices {
   // Service references
   public let couchDBService: CouchDBClient

   public init(cloudEnv: CloudEnv) throws {
        // Run service initializers
        couchDBService = try initializeServiceCloudant(cloudEnv: cloudEnv)
    }
}

public class App {
    let router = Router()
    let cloudEnv = CloudEnv()
    let services: ApplicationServices

   public init() throws {

       // Services
        services = try ApplicationServices(cloudEnv: cloudEnv)
    }

   func postInit() throws {
        // Capabilities
        initializeMetrics(app: self)

        // Endpoints
        initializeHealthRoutes(app: self)
    }

   public func run() throws {
        try postInit()

        // Add the line below.
        services.couchDBService.createDB("couchdb-tutorial"){_,_ in}

        Kitura.addHTTPServer(onPort: cloudEnv.port, with: router)
        Kitura.run()
    }
}
```

<span class="arrow">&#8227;</span> Now recompile the application:

```
$ swift build
```

<span class="arrow">&#8227;</span> Start the application:

```
$ .build/debug/couchdb-getting-started
```

<span class="arrow">&#8227;</span> Confirm the application is running locally by opening the URL
[http://localhost:8080](http://localhost:8080) in your browser. You'll see something like this:

```
Welcome to Kitura
Your Kitura based server is up and running!
```

<span class="arrow">&#8227;</span> Use [curl](https://curl.haxx.se) to query the databases managed by CouchDB. You should see **couchdb-tutorial** listed as one of the databases:

```
$ curl -X GET http://localhost:5984/_all_dbs
["_replicator","_users","couchdb-tutorial"]
```

Congratulations, you now have a simple Kitura application that can communicate with CouchDB.

## Next Steps

Learn how to [run an application with Docker](docker_container_tutorial.html).

