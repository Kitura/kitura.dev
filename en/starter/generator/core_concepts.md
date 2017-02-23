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

Swift Server Generator creates a Kitura Swift application based on data models that you define and attach to a data source. A full set of REST APIs for working with the back-end data is generated automatically.

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
