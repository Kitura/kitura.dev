---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Core concepts
menu: starter
lang: en
redirect_from: "/starter/generator/core_concepts.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Core concepts</h1>
</div>

The `kitura create` command creates a Kitura Swift application based on the [project type](#project-type), [capabilities](#capabilities) and [services](#services) you select. To do this, use the [command-line tools](command_line_tools.html) provided by [installing the generator](installation.html).

## Project type

The project type defines whether the generated application is a [scaffold](#scaffold) or
[CRUD](#crud) application.

### Scaffold

This project type is for creating a starter application where you define all of the
application logic yourself. The generator will create the directory structure and boilerplate
code based on the [capabilities](#capabilities) and [services](#services) you select.

> ![info] You may modify any of the generated code and will not be expected to run the generator
again on the generated project.

### CRUD

This project type is for creating a CRUD (Create-Read-Update-Delete) application where
you provide a description of a data model and the generator creates application
code for a REST webservice that will provide endpoints to perform create,
read, update and delete operations for data matching that data model.

The data model is specified by using the [model generator](command_line_tools.html#model-generator)
on the generated project to create each piece of the data model, or by using the [property generator](command_line_tools.html#property-generator) on the generated project to modify existing
pieces.

Throughout the documentation we will use the following terminology:

* "data model" --- the data model as a whole (eg: the bookstore data model)
* "model" --- a piece of the data model (eg: the book model)
* "property" --- a property of a model (eg: the title of a book)
* "entity" --- a particular set of data matching a model (eg: a book with title "War and Peace")

Each time the data model is modified, parts of the project are regenerated to
match the updated definition and the application will be rebuilt with `swift build`.

When you define a model it automatically comes with a predefined REST API with a full set of create, read, update, and delete operations. This REST API is described in more detail in [Exposing Swift Server Generator models over REST](exposing_ssg_models_over_rest.html).

You can create models by using the model generator, which creates a [Model definition JSON file](model_definition_json_file.html) that defines your model. By convention, this file is located in the project's `models` directory; for example, `models/bookstore.json`.

After a model and its properties have been defined, an [OpenAPI (Swagger 2.0) specification](http://swagger.io/specification/) is also generated that describes and documents the REST APIs. By convention, this is located in the project’s definitions directory; for example, `definitions/bookstore.yaml`.

> ![warning] You should not modify the code in the `Sources/Generated` directory, or the OpenAPI Swagger
definition file in the `definitions` directory as any modifications will be lost when these
files are regenerated.

## Capabilities

Capabilities define chunks of functionality that will be implemented by the generated
application. The application generator will ask you to select the capabilities you would
like included.

For the [scaffold project type](#scaffold), you can select from the following list:

* [Static web file serving](#web-capability)
* [Swagger UI](#swagger-fileserving-endpoint-capability)
* [Embedded metrics dashboard](#metrics-dashboard-capability)
* [Docker files](#docker-capability)

For the [CRUD project type](#crud), you can select from the following list:

* [Embedded metrics dashboard](#metrics-dashboard-capability)
* [Docker files](#docker-capability)

The list allows for toggling of any combination of the available capabilities which
will start with a default set selected.

The default set will depend on the [project type](#project-type):

* [CRUD project type](#crud): all 3 available capabilities are selected by default
* [Scaffold project type](#scaffold): defaults depend on [application pattern](prompts#application-pattern-prompt)

### Web capability
This capability will include a `public` directory in the root of the project. The contents of this directory will be served as static content using the built-in Kitura [StaticFileServer module](https://github.com/IBM-Swift/Kitura/wiki/Serving-Static-Content).

This content is hosted on `/`. For example, if you want to view `public/myfile.html` and the application is hosted at https://localhost:8080, go to https://localhost:8080/myfile.html.

This capability is only available for [scaffold projects](#scaffold).

### Metrics dashboard capability
This capability uses the [SwiftMetrics package](https://github.com/RuntimeTools/SwiftMetrics)
to gather application and system metrics.

These metrics can be viewed in an embedded dashboard on `/swiftmetrics-dash`. The dashboard
displays various system and application metrics, including CPU, memory usage, HTTP response
metrics and more.

### Docker capability
This capability includes the following files for [Docker](https://www.docker.com/) support:

* `.dockerignore`
* `Dockerfile`
* `Dockerfile-tools`

The `.dockerignore` file contains the files/directories that should not be included in the
built docker image. By default this file contains the `Dockerfile` and `Dockerfile-tools`.
It can be modified as required.

The `Dockerfile` defines the specification of the default docker image for running the application.
This image can be used to run the application.

The `Dockerfile-tools` is a docker specification file similar to the `Dockerfile`, except it includes
the tools required for compiling the application. This image can be used to compile the application.

To build the two docker images, run the following commands from the root directory of the project:

```shell
docker build -t myapp-run .
docker build -t myapp-build -f Dockerfile-tools .
```

You may customize the names of these images by specifying a different value after the `-t` option.

To compile the application using the tools docker image, run:

```shell
docker run -v $PWD:/root/project -w /root/project myapp-build /swift-utils/tools-utils.sh build release
```

To run the application:

```shell
docker run -it -p 8080:8080 -v $PWD:/root/project -w /root/project myapp-run sh -c .build-ubuntu/release/<app_executable>
```

## Endpoints
### Swagger fileserving endpoint capability
This capability adds an endpoint to the application for serving the OpenAPI Swagger definition for this application. It expects the definition file to be located at `definitions/<app_name>.yaml`.

The endpoint is hosted on `/swagger/api`. For example, if the application is hosted at https://localhost:8080, go to https://localhost:8080/swagger/api.

This capability is only optional for [scaffold projects](#scaffold) and is always enabled in [CRUD projects](#crud).

If the [Web capability](#web-capability) and [Swagger endpoint capability](#swagger-fileserving-endpoint-capability)
are enabled then specification of this interface is made available through an embedded
[Swagger UI](http://swagger.io/swagger-ui/) hosted on `/explorer`. For example, if the application
is hosted at https://localhost:8080, go to https://localhost:8080/explorer. The Swagger UI will document
the paths and http methods that are supported by the application.

### Endpoints from swaggerfile capability
This capability will generate example or custom API endpoint code from an OpenAPI (swagger) document. If selected, then the fileserving endpoint capability is automatically enabled.

#### Example endpoints capability
This capability includes an OpenAPI Swagger definition and routes for a Product example resource. The OpenAPI Swagger definition is located at `definitions/<app_name>.yaml`.

#### Endpoints from swagger file
The user can choose to generate endpoints by specifing the path or URL to a [swagger](https://swagger.io/specification) specification document.


This capability is only available for [scaffold projects](#scaffold).


## Services

The services offered by the generator will depend on the [project type](#project-type) and
[capabilities](#capabilities) you have selected.

For [CRUD project type](#crud) no services are available except those that are implied by
the [CRUD store prompt](prompts.html#crud-store-prompt).

### IBM Cloud services

These services are hosted on IBM Cloud and the application can connect to them either locally
or when deployed to IBM Cloud.

When IBM Cloud services are selected, a set of deployment configuration files to support
deploying your application to IBM Cloud are created:
* `manifest.yml`
* `.bluemix/toolchain.yml`
* `.bluemix/pipeline.yml`

The [`manifest.yml`](https://console.ng.bluemix.net/docs/manageapps/depapps.html#appmanifest) defines
options which are passed to the Cloud Foundry `cf push` command during application deployment.

[IBM Cloud DevOps](https://console.ng.bluemix.net/docs/services/ContinuousDelivery/index.html) service
provides toolchains as a set of tool integrations that support development, deployment, and operations
tasks inside IBM Cloud. The "Create Toolchain" button in the [README.md](project_layout_reference.html#readme)
creates a DevOps toolchain and acts as a single-click deploy to Bluemix including provisioning all required
services.

> ![warning] You need to publish your project to a public github.com repository to use the "Create toolchain"
> button.

#### Cloudant IBM Cloud service
This service uses the [Kitura-CouchDB package](https://github.com/IBM-Swift/Kitura-CouchDB), which allows Kitura applications to interact with a Cloudant or CouchDB database.

CouchDB speaks JSON natively and supports binary for all your data storage needs.

Boilerplate code for creating a client object for the Kitura-CouchDB API is included inside `Sources/Application/Application.swift` as an `internal` variable available for use anywhere in the `Application` module.

The connection details for this client are loaded by the configuration boilerplate code and are passed to the Kitura-CouchDB client.

#### Redis IBM Cloud service
This service uses the [Kitura-redis](http://ibm-swift.github.io/Kitura-redis/) library, which allows Kitura applications to interact with a Redis database.

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports a cracking array of data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs and geospatial indexes with radius queries.

Boilerplate code for creating a client object for the Kitura-redis API is included inside `Sources/Application/Application.swift` as an `internal` variable available for use anywhere in the `Application` module.

The connection details for this client are loaded by  the configuration boilerplate code and are passed to the Kitura-redis client.

#### Object Storage IBM Cloud service
This service uses the [Object Storage package](https://github.com/ibm-bluemix-mobile-services/bluemix-objectstorage-serversdk-swift.git) to connect to the IBM Cloud Object Storage service.

Object Storage provides an unstructured cloud data store, which allows the application to store and access unstructured data content.

Boilerplate code for creating a client object for the Object Storage API is included inside `Sources/Application/Application.swift` as an `internal` variable available for use anywhere in the `Application` module.

The connection details for this client are loaded by the configuration boilerplate code and are passed to the Object Storage client.

#### AppID IBM Cloud service
This service uses [App ID package](https://github.com/ibm-cloud-security/appid-serversdk-swift) to connect to the IBM Cloud App ID service.

App ID provides authentication to secure your web applications and back-end systems. In addition App ID supports authentication using social identity providers so that users can login with their existing user accounts, such as Facebook and Google.

Boilerplate code for creating a client object for the App ID API is included inside `Sources/Application/Application.swift` as an `internal` variable available for use anywhere in the `Application` module. Extra routes and logic need to be added to make this a authentication boilerplate work. A working example can be found in the [App ID README](https://github.com/ibm-cloud-security/appid-serversdk-swift/blob/master/README.md#example-usage).

The connection details for this client are loaded by the configuration boilerplate code and are passed to the App ID client.

#### Auto-scaling IBM Cloud service
This service uses the [SwiftMetrics package](https://github.com/RuntimeTools/SwiftMetrics) for connecting to the IBM Cloud Auto-scaling service. You can use this to automatically manage your application capacity when deployed to IBM Cloud.  You will need to define the Auto-Scaling policy (https://console.ng.bluemix.net/docs/services/Auto-Scaling/index.html) to define the rules used to scale the application.

The connection details for this client are loaded by the configuration boilerplate code and are passed to the SwiftMetrics auto-scaling client.

### Non-IBM Cloud services

Non-IBM Cloud services can be hosted anywhere including your local machine.

#### CouchDB
This service uses the [Kitura-CouchDB package](https://github.com/IBM-Swift/Kitura-CouchDB), which allows Kitura applications to interact with a CouchDB database.

CouchDB speaks JSON natively and supports binary for all your data storage needs.

Boilerplate code for creating a client object for the Kitura-CouchDB API is included inside `Sources/Application/Application.swift` as an `internal` variable available for use anywhere in the `Application` module.

The connection details for this client are loaded from `config/localdev-config.json` by the configuration boilerplate code.

#### Redis
This service uses the [Kitura-redis](http://ibm-swift.github.io/Kitura-redis/) library, which allows Kitura applications to interact with a Redis database.

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports a cracking array of data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs and geospatial indexes with radius queries.

Boilerplate code for creating a client object for the Kitura-redis API is included inside `Sources/Application/Application.swift` as an `internal` variable available for use anywhere in the `Application` module.

The connection details for this client are loaded from `config/localdev-config.json` by the configuration boilerplate code.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
