---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Command-line tools
menu: starter
lang: en
redirect_from: "/starter/generator/command_line_tools.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Command-line tools</h1>
	<p>This article summarizes Swift Server Generator CLI tool commands.</p>
</div>

Two command-line tools are available for Swift Server Generator:

-   [Yeoman](http://yeoman.io/) command-line tools: `yo swiftserver`.

-   IBM API Connect developer toolkit CLI: `apic swiftserver`  
    Note, this is specific to version 1.0.4 of Swift Server Generator.

You can also invoke Swift Server Generator indirectly using the [Bluemix CLI Developer Plug-in](https://console.ng.bluemix.net/docs/cloudnative/tutorial_web.html#tutorial/). You can only scaffold starter application types through the Bluemix CLI Developer Plug-in command line: `bx dev create`, you cannot generate CRUD application types.

You use these command line tools to create and configure Swift Server Generator applications. The table below describes using the Yeoman command-line options.

The command-line tools provide an [Application generator](#application-generator) to create a new Swift Server Generator application. There are also a number of sub-generators to define models and properties, these only apply to CRUD application types, as described in the following table:

*Table 1. Available commands*

| Command                           | Command type                                   | Description                                                                                                                                                                                                                                                            |
|---------------------------------  |------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`yo swiftserver`**              | [Application generator](#application-generator) | Create a new Swift Server Generator application.                                                                                                                                                                                                                       |
| **`yo swiftserver:model`** | [Model generator](#model-generator)             | Add a new model to a Swift Server Generator CRUD application.                                                                                                                                                                                                               |
| **`yo swiftserver:property`**     | [Property generator](#property-generator)       | Add a new property to an existing model (within a Swift Server Generator CRUD application).                                                                                                                                                                                                                              |
| **`yo swiftserver:refresh`**      | Refresh generator                              | Generate OpenAPI (Swagger 2.0) definition YAML file, by convention named after your application (e.g. `appname.yaml`). This file is regenerated each time the refresh generator runs. |

---

## Application generator

**Synopsis**

Creates a new Swift Server Generator application.

    yo swiftserver [options] [name]

**Options**

    -h, --help

Print the generator’s options and usage.

**Interactive prompts**

The generator prompts you for the following information:

-   The name of the application to create, if you have not provided the application name as an argument, as in the following example:

        yo swiftserver bookshop

-   The name of the directory to create the application in; this defaults to the application name you previously entered.

-   The type of project to create; this is a choice between scaffolding a starter project or generating a CRUD application.

-   The pattern type which you would like your application to use; this defaults to Basic, you can also choose Web or Backend for Frontend (BFF).

-   The capabilities which you would like to add to your application; these vary according to your project type. If you select a CRUD application type you can choose any/all or none of the Embedded metrics dashboard, Docker files or Bluemix cloud deployment capabilities. If you select scaffold a starter application you can choose additional capabilities of Static web file serving, OpenAPI/Swagger endpoint and Example endpoints.

-   Select a Data store to use (for a CRUD application); this defaults to memory which is an in-memory data source that is built into Swift Server Generator and is suitable only for development and initial testing. If you want to connect your models to a real data source such as the Cloudant® database server, choose `cloudant` for your back-end data store. The tool prompts you for additional settings and automatically installs the appropriate Cloudant connector package by using the Swift Package Manager. If you want to switch between data stores see the [`config.json file`](config_json.html).

-   Select services (for scaffold a starter application) to generate boilerplate for; these will be Bluemix services if you selected the Bluemix cloud deployment capability, otherwise they will be local services. The available Bluemix services are Cloudant®, Redis, Object Storage, AppID and Auto-scaling; the local services are CouchDB and Redis. The tool prompts you for additional settings and automatically installs the appropriate Swift packages using the Swift Package Manager.

The tool creates the standard Swift Server Generator application structure; for details, see [Swift Server Generator project layout reference](project_layout_reference.html).

After you create an application, you can run additional generators from the application root directory:

-   [Model generator](#model-generator)

-   [Property generator](#property-generator)

---

## Model generator

**Important:** Before running this generator, you must create a CRUD type application by using the [Application generator](#application-generator). Then you must run the command from the root directory of the application.

**Synopsis**

Adds a new model to a Swift Server Generator application:

    yo swiftserver:model [options] [name]

**Options**

    -h, --help

Print the generator’s options and usage.

**Interactive prompts**

The tool will prompt you for the following information:

-   The name of the model, if you have not provided the model name as an argument

-   The custom plural form of the model name. By default, the tool pluralizes the model name by adding *s*.

    > ![info] All Swift Server Generator models are exposed over REST. A set of create, read, update, and delete (CRUD) operations are therefore available via REST endpoints; for details, see [Exposing Swift Server Generator models over REST](exposing_ssg_models_over_rest.html). Operations on all models use the model’s plural name in the URL; for example, `http://localhost:3000/api/bookshops`.

The tool then invokes the [Property generator](#property-generator) and prompts you to enter model properties.

**Output**

The tool creates a new file that defines the model, /models/model-name.json; for details, see [Model definition JSON file](model_definition_json_file.html). It also modifies the [*OpenAPI (Swagger 2.0) specification*](http://swagger.io/specification/) YAML file that describes and documents the REST APIs. By convention this file is located in the project’s definitions directory; for example, `definitions/appname.yaml`.

---

## Property generator

**Important:** Before running this generator, you must create a CRUD type application by using the [Application generator](#application-generator). Then you must create a model using the [Model generator](#model-generator). Then you must run the command from the root directory of the application.

**Synopsis**

Adds a new property to an existing Swift Server Generator model.

    yo swiftserver:property [options]

**Options**

    -h, --help

Print the generator's options and usage.

**Interactive prompts**

The tool will prompt you for the following information:

-   The model to which to add the new property. If there is more than one model defined in the application you will be asked to choose from a list of the available models.

-   The name of the property to add.

-   The data type of the property.

-   Whether the property is required; the default is no.

-   Whether the property has a default value; the default is no.

**Output**

The tool modifies the [Model definition JSON file](model_definition_json_file.html) to add the specified property to the specified model. It also modifies the [*OpenAPI (Swagger 2.0) specification*](http://swagger.io/specification/) YAML file that describes and documents the REST APIs; for example, `definitions/appname.yaml`.


[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
