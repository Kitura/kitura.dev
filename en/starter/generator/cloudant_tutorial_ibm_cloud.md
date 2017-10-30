---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Getting started with Cloudant on Bluemix
menu: starter
lang: en
redirect_from: "/starter/generator/cloudant_tutorial_ibm_cloud.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Creating a project with Cloudant for IBM Cloud</h1>
	<p>Use the generator to scaffold a Kitura web application with a Cloudant service.</p>
</div>

> ![warning] Make sure you have installed the command-line tools as described in
> [Installation](installation.html) before you begin.

---

#### In this tutorial you will:

- Create a Cloudant service on IBM Cloud
- Create a scaffolded Kitura application
- Add a Cloudant service to the application
- Connect to the Cloudant service

---

<span class="arrow">&#8227;</span> Create a [Cloudant service](https://console.ng.bluemix.net/catalog/services/cloudant-nosql-db?taxonomyNavigation=services) on IBM Cloud by clicking the `Create` button.

Navigate to `Service Credentials` to view your credentials.

> ![tip] Keep the window open so that you can quickly get the service credentials to configure your Cloudant service.


---
<span class="arrow">&#8227;</span> Next, start the Kitura server generation (see [Command line tools](command_line_tools.html)):

    $ kitura create

---
<span class="arrow">&#8227;</span> Enter `swiftserver-cloudant` as the application name.

    ? What's the name of your application? swiftserver-cloudant

> ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `swiftserver-cloudant` throughout the rest of this tutorial.

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default directory for the project (the same as the application name).

    ? Enter the name of the directory to contain the project: (swiftserver-cloudant)

---
<span class="arrow">&#8227;</span> Select [`Scaffold a starter`](prompts.html#scaffold) for the [type of project](prompts.html#project-type) and press **Enter**.

    ? Select type of project: (Use arrow keys)
    ❯ Scaffold a starter
      Generate a CRUD application

---
<span class="arrow">&#8227;</span> Select [`Web`](prompts.html#web-pattern) for the [application pattern](prompts.html#application-pattern) (this determines the default set of capabilities) and press **Enter**.

    ? Select capability presets for application pattern: (Use arrow keys)
      Basic
    ❯ Web
      Backend for frontend

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default [capabilities](prompts.html#capabilities) for the `Web` application pattern.

    ? Select capabilities: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◉ Static web file serving
      ◯ Swagger UI
      ◉ Embedded metrics dashboard
      ◉ Docker files

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not generating code from a [swagger](core_concepts.html#endpoints-from-swagger-file) specification in the scaffolding.

    ? Select endpoints to generate: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◯ Swagger file serving endpoint
      ◯ Endpoints from a swagger file

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not generating a Swift server SDK from a swagger file in the scaffolding.

    ? Would you like to generate a Swift server SDK from a Swagger file? (y/N)

---
<span class="arrow">&#8227;</span> Navigate to `Cloudant` and press **Space** and then **Enter** to select and include [Cloudant](https://console.ng.bluemix.net/docs/services/Cloudant/index.html#getting-started-with-cloudant) into the scaffolding.

    ? Generate boilerplate for services: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◉ Cloudant
      ◯ Redis
      ◯ Object Storage
      ◯ AppID
      ◯ Auto-scaling

---
<span class="arrow">&#8227;</span> To configure `Cloudant` press **Space** to select and **Enter** to configure.

    ? Configure service credentials (leave unchecked for defaults): (Press <space> to select)
    ❯ ◉ Cloudant / CouchDB

> ![info] Note: If you leave this unselected then the default values will be used. You will
> need to [update them in the `config.json`](/en/starter/generator/config_json.html#bluemix-capability-enabled)
> to point at your service after the project is generated.

Then configure `Cloudant` with the credentials you made earlier in Bluemix:

```
Configure Cloudant / CouchDB
? Enter name (blank for default): <Your cloudant service name>
? Enter host name: <Your cloudant host name>
? Enter port: 443
? Secure (https)? Yes
? Enter username (blank for none): <Your cloudant username>
? Enter password: <Your cloudant password>
```

---

The generator will display messages as it scaffolds and builds the application including:

1.  Initializing the project folder structure.

1.  Creating and compiling default Swift files.

1.  Downloading and installing dependent Swift modules (as if you had manually run `swift build`).

---
<span class="arrow">&#8227;</span> Now you should have a generated application directory similar to this:
<pre>
swiftserver-cloudant/
├── public/
├── Sources/
│   ├── Application
│   │   ├── Application.swift
│   │   └── Routes/
│   │   └── Extensions
|   |       └── CouchDBExtension.swift
│   └── swiftserver-cloudant
│       └── main.swift
├── Package.swift
├── README.md
├── config.json
└── ...
</pre>

> ![info] For a description of the generated files, take a look at the structure of a generated project in the [Project layout reference](project_layout_reference.html).

---
<span class="arrow">&#8227;</span> Change to the application directory:

    $ cd swiftserver-cloudant

---

<span class="arrow">&#8227;</span> Modify `Sources/Application/Application.swift` to create a CouchDB database by adding the line shown below:
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
        // Middleware
        router.all(middleware: StaticFileServer())
        // Endpoints
        initializeHealthRoutes(app: self)
    }
    public func run() throws {
        try postInit()

        // Add the line below
        services.couchDBService.createDB("cloudant-tutorial"){_,_ in}

        Kitura.addHTTPServer(onPort: cloudEnv.port, with: router)
        Kitura.run()
    }
}
```

<span class="arrow">&#8227;</span> Now recompile the application:

```
$ swift build
```

---

<span class="arrow">&#8227;</span> Start the application from the root of your project:

    $ .build/debug/swiftserver-cloudant

---
<span class="arrow">&#8227;</span> Confirm the application is running locally by opening the URL
[http://localhost:8080](http://localhost:8080) in your browser. You'll see something like this:

    Welcome to Kitura
    Your Kitura based server is up and running!

Congratulations, you now have a simple Kitura web application ready for extension with your own application logic.

## Next Steps

Learn how to deploy an application to IBM Cloud using either
[the CloudFoundry CLI](deploy_cloud_foundry.html) or
[the Bluemix Create Toolchain button](deploy_toolchain.html).


[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
