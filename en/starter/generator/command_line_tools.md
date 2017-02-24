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

-   IBM API Connect developer toolkit CLI: `apic swiftserver`.

You use these command line tools to create and configure Swift Server Generator applications. The table below describes using the Yeoman command-line options. If you are familiar with the IBM API Connect developer toolkit and prefer to use that you can refer to the Swift [Server Generator installation and command line options](https://www.ibm.com/support/knowledgecenter/en/SSMNED_5.0.0/com.ibm.apic.toolkit.doc/capic_swift_overview.html).

The command-line tools provide an [Application generator](#application-generator) to create a new Swift Server Generator application and a number of sub-generators to define models and properties within the application, as described in the following table:

*Table 1. Available commands*

| Command                           | Command type                                   | Description                                                                                                                                                                                                                                                            |
|---------------------------------  |------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`yo swiftserver`**              | [Application generator](#application-generator) | Create a new Swift Server Generator application.                                                                                                                                                                                                                       |
| **`yo swiftserver:model`** | [Model generator](#model-generator)             | Add a new model to a Swift Server Generator application.                                                                                                                                                                                                               |
| **`yo swiftserver:property`**     | [Property generator](#property-generator)       | Add a new property to an existing model.                                                                                                                                                                                                                               |
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

-   Data store to use; this defaults to memory which is an in-memory data source that is built into Swift Server Generator and is suitable only for development and initial testing. If you want to connect your models to a real data source such as the Cloudant® database server, choose `cloudant` for your back-end data store. The tool prompts you for additional settings and automatically installs the appropriate Cloudant connector package by using the Swift Package Manager. If you want to switch between data stores see the [`config.json file`](config_json.html).

The tool creates the standard Swift Server Generator application structure; for details, see [Swift Server Generator project layout reference](project_layout_reference.html).

After you create an application, you can run additional generators from the application root directory:

-   [Model generator](#model-generator)

-   [Property generator](#property-generator)

---

## Model generator

**Important:** Before running this generator, you must create an application by using the [Application generator](#application-generator). Then you must run the command from the root directory of the application.

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

The tool creates a new file that defines the model, /models/model-name.json; for details, see [Model definition JSON file](model_definition_json_file.html). It also generates an [*OpenAPI (Swagger 2.0) specification*](http://swagger.io/specification/) YAML file that describes and documents the REST APIs. By convention this file is located in the project’s definitions directory; for example, `definitions/appname.yaml`.

---

## Property generator

**Important:** Before running this generator, you must create an application by using the [Application generator](#application-generator). Then you must create a model using the [Model generator](#model-generator). Then you must run the command from the root directory of the application.

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
