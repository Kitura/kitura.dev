---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Model definition JSON file
menu: starter
lang: en
redirect_from: "/starter/generator/model_definition_json_file.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Model definition JSON file</h1>
  <p>The model definition JSON file declaratively defines a Swift Server Generator model.</p>
</div>

## Overview

The Model generator creates a model definition JSON file for a model in the models directory. The file is named `<model_name>.json`, where `<model_name>` is the name of the model; for example, `customer.json`. The model definition JSON file defines all of the properties of the models.

The following example shows the model definition JSON file for the sample todo application:

    {
      "name": "todo",
      "plural": "todos",
      "classname": "Todo",
      "properties": {
        "id": {
          "type": "number",
          "id": true
        },
        "title": {
          "type": "string"
        },
        "completed": {
          "type": "boolean",
          "default": false
        },
        "order": {
          "type": "number"
        }
      }
    }

The following table describes the properties that are specified in the file:

*Table 1. Model definition JSON file properties*

| Property   | Type   | Description                                                                                                           |
|------------|--------|-----------------------------------------------------------------------------------------------------------------------|
| name       | String | Name of the model.                                                                                                    |
| plural     | String | Plural form of the model name.                                                                                        |
| classname  | String | Name of the generated Swift class which represents the model.                                                         |
| properties | Object | JSON object that specifies the properties in the model. For details, see the [Properties](#properties) section. |

---

## Properties

The properties key defines one or more properties, each of which is an object that has keys. The following example shows a basic property definition:

    ...
    "properties": {
      "id": {
        "type": "number",
        "id": true
      },
      "title": {
        "type": "string"
    },
    ...

Each model property can have the keys described in the following table; only the type property is required.

*Table 2. Model property keys*

| Key      | Required? | Type     | Description                                                                                                                                            |
|----------|--------- -|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| type     | Yes       | String   | Property type. Can be any type described in the [Swift Server Generator type](#swift-server-generator-types) section.                               |
| default  | No        | Any      | Default value for the property. The type must match that specified by type key.                                                                        |
| id       | No        | Boolean  | Whether the property is a unique identifier. Default is false. For details, see the [ID properties](#id-properties) section.                      |
| required | No        | Boolean  | Whether a value for the property is required. If true, then adding or updating a model instance requires a value for the property. Default is `false`. |

---

## ID properties

A model representing data to be persisted in a database has one *ID property* that uniquely identifies the model instance. The ID property must be named `id`.

By default, Swift Server Generator automatically adds an `id` property to each model as follows:

    "id": {
      "type": "string",
      "id": true
    }

The `type` defaults to `string`.

Swift Server Generator CRUD methods expect the model to have an `id` property.

---

## Swift Server Generator types

The Swift Server Generator model properties can be defined as various data types. The following table summarizes the supported data types:

*Table 3. Swift Server Generator types*

| Type      | Description  | Example                                                   |
|-----------|--------------|-----------------------------------------------------------|
| `array`   | JSON array   | `[ "one", 2, true ]`                                      |
| `boolean` | JSON boolean | `true`                                                    |
| `number`  | JSON number  | `23.501`                                                  |
| `object`  | JSON object  | `{ "firstName": "John", "lastName": "Smith", "age": 25 }` |
| `string`  | JSON string  | `"Example"`                                               |



[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
