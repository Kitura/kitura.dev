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

The following sections describe the prompts provided by the [application generator](command_line_tools.html#application-generator).

## Project type

The [application generator](command_line_tools.html#application-generator) will ask which type of project
you would like to create, offering two options:

```
? Select type of project: (Use arrow keys)
❯ Scaffold a starter
  Generate a CRUD application
```

The `Scaffold a starter` option will direct the generator to create a
[scaffolded application](core_concepts.html#scaffold) providing boilerplate code
and application structure to which your application logic can be added.

The `Generate a CRUD application` option will direct the generator to create a
[CRUD application](core_concepts.html#crud) on top of which a data model can be
defined which will automatically be mapped to REST endpoints for create, read and
update operations. At present the code for this type of application is not very
customizable aside from modifying the data model.

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
 ◉ Bluemix cloud deployment
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

For the [scaffold project type](#scaffold), you can select from the following list:

* [Static web file serving](core_concepts.html#web-capability)
* [OpenAPI / Swagger endpoint](core_concepts.html#swagger-endpoint-capability)
* [Example endpoints](core_concepts.html#example-endpoints-capability)
* [Embedded metrics dashboard](core_concepts.html#metrics-dashboard-capability)
* [Docker files](core_concepts.html#docker-capability)
* [Bluemix cloud deployment](core_concepts.html#bluemix-capability)

For the [CRUD project type](#crud), you can select from the following list:

* [Embedded metrics dashboard](core_concepts.html#metrics-dashboard-capability)
* [Docker files](core_concepts.html#docker-capability)
* [Bluemix cloud deployment](core_concepts.html#bluemix-capability)

The list allows for toggling of any combination of the available capabilities which
will start with a default set selected.

The default set will depend on the [project type](#project-type):

* [CRUD project type](core_concepts.html#crud): all 3 available capabilities are selected by default
* [Scaffold project type](core_concepts.html#scaffold): defaults depend on [application pattern](#application-pattern)

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
