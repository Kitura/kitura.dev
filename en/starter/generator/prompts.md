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

The following sections describe the prompts provided by the [application generator](../generator.html).

## Application name prompt
If you did not supply an application name as an argument, the
[application generator](../generator.html) will ask the name
you would like to use for your application:

```
? What's the name of your application? (currentDirectory)
```

The default value is the name of the current working directory.

The application name you enter must satisfy the following constraints:

* Must not start with a `.`
* Must not contain whitespace characters
* Must not contain any of the following characters: `/@+%:`
* Must not contain characters reserved in URIs
* Must not be `node_modules`
* Must not be `favicon.ico`

## Application directory prompt
The [application generator](../generator.html) will ask the name
of the directory you would like to use for your application:

```
? Enter the name of the directory to contain the project: (applicationName)
```

The default value is the name of the application.

If the directory name is the same as the current directory, then the generator will assume you
want to create the project in direcly in the current directory rather than creating a subdirectory
of the same name.

The application directory you enter must satisfy the following constraints:

* Must not contain whitespace characters
* Must not contain any of the following characters: `/@+%:`
* Must not contain characters reserved in URIs

## Project type prompt

The [application generator](../generator.html) will ask which type of project
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

## Application pattern prompt
For [scaffolded applications](core_concepts.html#scaffold), the
[application generator](../generator.html) will
ask which application pattern you want to select, offering three options:

```
? Select capability presets for application pattern: (Use arrow keys)
❯ Basic
  Web
  Backend for frontend
```

The application pattern defines the capabilities that are selected by default in the subsequent
[capabilities prompt](#capabilities-prompt). They are presets and the capabilities they suggest
can be modified as required.

### Basic pattern
The `Basic` pattern is intended for any type of application, making the fewest assumptions
about the application logic. Selecting this pattern will result in the following defaults
for the [capabilities prompt](#capabilities-prompt):

```
 ◯ Static web file serving
 ◯ Swagger UI
 ◉ Embedded metrics dashboard
 ◉ Docker files
```

### Web pattern
The `Web` pattern is intended for an application that needs to provide a web server
hosting static files. Selecting this pattern will result in the following defaults
for the [capabilities prompt](#capabilities-prompt):

```
 ◉ Static web file serving
 ◯ Swagger UI
 ◉ Embedded metrics dashboard
 ◉ Docker files
```

### BFF pattern
The `Backend-for-frontend` (BFF) pattern is intended for an application that provides
a microservice intended for consumption by a client application (for example, a
web or mobile application). Selecting this pattern will result in the following defaults
for the [capabilities prompt](#capabilities-prompt):

```
 ◉ Static web file serving
 ◉ Swagger UI
 ◉ Embedded metrics dashboard
 ◉ Docker files
```

## Capabilities prompt
The [application generator](../generator.html) will
ask which [capabilities](core_concepts.html#capabilities) you want to select.

For [Scaffold project type](core_concepts.html#scaffold), the following capabilities
are available:

```
? Select capabilities: (Press <space> to select)
❯ ◯ Static web file serving
  ◯ Swagger UI
  ◉ Embedded metrics dashboard
  ◉ Docker files
```

For [CRUD project type](core_concepts.html#crud), the following capabilities
are available:

```
? Select capabilities: (Press <space> to select)
❯ ◉ Embedded metrics dashboard
  ◉ Docker files
```

The list allows for toggling of any combination of the available capabilities which
will start with a default set selected.

> ![info] Note: CRUD project type always enables the
> [OpenAPI / Swagger endpoint](core_concepts.html#swagger-fileserving-endpoint-capability)

The capabilities selected by default when this prompt is shown depend on the [project type](core_concepts.html#project-type):

* [CRUD project type](core_concepts.html#crud): all 3 available capabilities are selected by default
* [Scaffold project type](core_concepts.html#scaffold): defaults depend on [application pattern](#application-pattern-prompt)

## Services prompt
For [scaffolded applications](core_concepts.html#scaffold), the
[application generator](command_line_tools.html#application-generator) will
ask which [services](core_concepts.html#services) you want to select.

```
? Generate boilerplate for services: (Press <space> to select)
❯ ◯ Cloudant / CouchDB
  ◯ Redis
  ◯ MongoDB
  ◯ PostgreSQL
  ◯ Object Storage
  ◯ AppID
  ◯ Auto-scaling
```

## CRUD store prompt
For [CRUD applications](core_concepts.html#crud), the
[application generator](../generator.html) will
ask how you want to store entities:

```
? Select data store: (Use arrow keys)
❯ Memory (for development purposes)
  Cloudant / CouchDB
```

Selecting `Memory (for development purposes)` will mean entities are stored in a simple
memory-based database.

> ![warning] The memory data store is volatile and any data added will be lost when
> the application is stopped. As such, it is only suitable for development purposes.

Selecting `Cloudant / CouchDB` will add a local CouchDB service for entity storage.

## Service configuration prompt
The [application generator](../generator.html) will
ask you which of the services you selected need to be configured, for example:

```
? Configure service credentials (leave unchecked for defaults): (Press <space> to select)
❯ ◯ Cloudant / CouchDB
  ◯ Redis
  ◯ Object Storage
```

Any services you do not select in this prompt will use default values.

For each service you select, a set of custom prompts will ask for the relevant connection
details to be supplied.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
