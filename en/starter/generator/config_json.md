---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: config.json
menu: starter
lang: en
redirect_from: "/starter/generator/config_json.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1><code>config.json</code></h1>
	<p>Define Swift Server Generator application settings in the <code>config.json</code> file.</p>
</div>

The `config.json` file must be in the application root directory.

The following example `config.json` file shows the default settings:

    {
      "appName": "ExampleApplication",
      "store": "memory",
      "logger": "helium",
      "port": 8090
    }

The following table describes the properties that you can configure:

*Table 1. `config.json` properties*

| Property name | Description                                                                                                                            | Default value |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `appName`     | The name of your application                                                                                                           | N/A           |
| `store`       | Defines where the data is being stored; `memory` represents the in-memory datastore. Currently, `memory` and `cloudant` are supported. | `memory`      |
| `logger`      | Swift logger to use. Currently only `helium` is supported.                                                                             | `helium`      |
| `port`        | TCP port to use.                                                                                                                       | `8090`        |

---

## Cloudant store

The [*Cloudant® store*](https://github.com/IBM-Swift/GeneratedSwiftServer-CloudantStore) supports CouchDB and Cloudant.

The following example shows Cloudant store configuration settings in the `config.json` file:

    {
      ...
      "store": {
        "type": "cloudant",
        "host": "localhost",
        "port": 5984,
        "secured": false,
        "username": "user",
        "password": "password"
      },
      ...
    }

If you omit properties, they take their default values. If you omit `username` and `password` then no authentication is used.

To use all default values, omit the object and specify just the following Cloudant setting:

    {
      ...
      “store”: “cloudant”
      ...
    }

When you run your application, if the database does not exist, it is created by using the model name (one database per model name). If a database with the same name as the model already exists then that database is used.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
