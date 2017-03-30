---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Prompt reference
menu: starter
lang: en
redirect_from: "/starter/generator/prompts.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Prompt reference</h1>
</div>

Swift Server Generator creates a Kitura Swift application based on the [project type](#project-type), [capabilities](#capabilities) and [services](#services) you select. To do this, use the [command-line tools](command_line_tools.html) provided by [installing the generator](installation.html).



## Project type

The [application generator](command_line_tools.html#application-generator) will ask which type of project
you would like to create, offering two options:

```
? Select type of project: (Use arrow keys)
❯ Scaffold a starter
  Generate a CRUD application
```

The following sections describe these options in more detail.

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

> ![warning] You should not modify the code in the `Sources/Generated` directory, or the OpenAPI Swagger
definition file in the `definitions` directory as any modifications will be lost when these
files are regenerated.

## Application pattern
For scaffolded applications, the [application generator](command_line_tools.html#application-generator) will
ask which application pattern you want to select, offering three options:

```
? Select capability presets for application pattern: (Use arrow keys)
❯ Basic
  Web
  Backend for frontend
```

The application pattern defines the capabilities that are selected by default in the subsequent
capabilities prompt. They are presets and the capabilities they suggest can be modified as required.

The following sections describe these options in more detail.

### Basic pattern

The Basic pattern is intended for any type of application, making the fewest assumptions
about the application logic. Selecting this pattern will result in the following default
[capabilities](#capabilities):

```
 ◯ Static web file serving
 ◯ OpenAPI / Swagger endpoint
 ◯ Example endpoints
 ◉ Embedded metrics dashboard
 ◉ Docker files
 ◉ Bluemix cloud deployme
```

### Web pattern

The Web pattern is intended for an application that needs to provide a web server
hosting static files. Selecting this pattern will result in the following default
[capabilities](#capabilities):

```
 ◉ Static web file serving
 ◯ OpenAPI / Swagger endpoint
 ◯ Example endpoints
 ◉ Embedded metrics dashboard
 ◉ Docker files
 ◉ Bluemix cloud deployment
```

### BFF pattern

The Backend-for-frontend (BFF) pattern is intended for an application that provides
a microservice intended for consumption by a client application (for example, a
web or mobile application). Selecting this pattern will result in the following default
[capabilities](#capabilities):

```
 ◉ Static web file serving
 ◉ OpenAPI / Swagger endpoint
 ◉ Example endpoints
 ◉ Embedded metrics dashboard
 ◉ Docker files
 ◉ Bluemix cloud deployment
```

## Capabilities

Capabilities define chunks of functionality that will be implemented by the generated
application. The application generator will ask you to select the capabilities you would
like included.

For the scaffold project type, you can select from the following list:

* [Static web file serving](#web-capability)
* [OpenAPI / Swagger endpoint](#swagger-endpoint-capability)
* [Example endpoints](#example-endpoints-capability)
* [Embedded metrics dashboard](#metrics-dashboard-capability)
* [Docker files](#docker-capability)
* [Bluemix cloud deployment](#bluemix-capability)

For the CRUD project type, you can select from the following list:

* [Embedded metrics dashboard](#metrics-dashboard-capability)
* [Docker files](#docker-capability)
* [Bluemix cloud deployment](#bluemix-capability)

The list allows for toggling of any combination of the available capabilities which
will start with a default set selected.

The default set will depend on the [project type](#project-type):

* [CRUD project type](#crud): all 3 available capabilities are selected by default
* [Scaffold project type](#scaffold): defaults depend on [application pattern](#application-pattern)

### Web capability

> TODO

### Swagger endpoint capability

> TODO

### Example endpoints capability

> TODO

### Metrics dashboard capability

> TODO

### Docker capability

> TODO

### Bluemix capability

> TODO

:: NOTES (Bluemix) ::
The `manifest.yml` is used by the [CloudFoundry CLI](LINK) (`cf push`), the
[Bluemix CLI](LINK) (`bx cf push`) and the Bluemix CLI [Dev plugin](LINK) (`bx dev deploy`)
to deploy the application to the cloud.

The `cli-config.yml` is used by the Bluemix CLI [Dev plugin](LINK) to build and run
the Docker files (`bx dev build` and `bx dev run`).

The files in the `.bluemix` directory provide support for creating a default toolchain
using the [Create Toolchain button](#create-toolchain).
:: END ::

## Services

> TODO

---

## Models

*Models* are at the heart of Swift Server Generator, and represent structures of related data, such as a book or a user, that are stored in data stores such as databases or other back-end services (REST and so on). Swift Server Generator models are defined as a named set of properties and associated metadata ("name" and "type", for example) and are realized in the generated application as Swift types and REST endpoints.

After you have generated an application and defined your models you will have a Kitura Swift application built by using the Swift Package Manager. [*Kitura*](http://www.kitura.io/) is an open source web framework for building Swift applications inspired by [*Express®*](http://expressjs.com/), a Node.js web framework. When you run your Kitura Swift application, it creates a Kitura server that handles REST/HTTP requests for each of the defined resources and their operations.

A key powerful feature of Swift Server Generator is that when you define a model it automatically comes with a predefined REST API with a full set of create, read, update, and delete operations. This REST API is described in more detail in [Exposing Swift Server Generator models over REST](exposing_ssg_models_over_rest.html).

You can create models by using the model generator, which creates a [Model definition JSON file](model_definition_json_file.html) that defines your model. By convention, this file is located in the project's `models` directory; for example, `models/customer.json`.

---

## OpenAPI (Swagger 2.0)

After a model and its properties have been defined, an [OpenAPI (Swagger 2.0) specification](http://swagger.io/specification/) is also generated that describes and documents the REST APIs. By convention, this is located in the project’s definitions directory; for example, `definitions/customer.yaml`.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
