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

## Introduction

The configuration information for your application is stored in the `config.json` file in the project root directory. This file is listed in `.gitignore` to prevent sensitive information from being stored in git. The connection and configuration information for any configured services, such as username, password and hostname, is stored in this file.

Your Swift Server Generator application uses the [CloudConfiguration package](https://github.com/IBM-Swift/CloudConfiguration) to configure connections to your hosting services, such as Cloudant.  The configuration information will be read from the environment and the `config.json` file, which is used depends whether your application is running locally or remotely.

## Local configuration without bluemix

The following example `config.json` file shows the default settings without the [bluemix capability](core_concepts.html#bluemix-capability) selected:

```json
{
  "services": {},
  "logger": "helium",
  "port": "8080"
}
```

The following table describes the properties that you can configure:

*Table 1. `config.json` properties*

| Property name | Description                                                                                                                            | Default value |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `services`       | Define the services to use.  | `{}`      |
| `logger`      | Swift logger to use. Currently only `helium` is supported.                                                                             | `helium`      |
| `port`        | TCP port to use.                                                                                                                       | `8080`        |


## Local configuration with Cloudant store without bluemix

The [*Cloudant® store*](https://github.com/IBM-Swift/GeneratedSwiftServer-CloudantStore) supports CouchDB and Cloudant.

The following example shows Cloudant store configuration settings in the `config.json` file:

```json
{
  ...
  "services": {
    "cloudant": [
      {
        "name": "couchdb",
        "type": "cloudant",
        "host": "localhost",
        "port": 5984,
        "secured": false,
        "username": "user",
        "password": "password"
      }
    ]
  },
  ...
}
```
If you omit properties, they take their default values. If you omit `username` and `password` then no authentication is used.

When you run your application, if it is a CRUD type application and the database does not exist, it is created by using the model name (one database per model name). If a database with the same name as the model already exists then that database is used.

## Local configuration with Cloudant store as bluemix service

The following example shows Cloudant store configuration settings in the `config.json` file when running with the [bluemix capability](core_concepts.html#bluemix-capability) selected:

```json
{
  "vcap": {
    "services": {
      "cloudantNoSQLDB": [
        {
          "name": "myapp-Cloudant-z2s2",
          "label": "cloudantNoSQLDB",
          "tags": [],
          "plan": "Lite",
          "credentials": {
            "host": "localhost",
            "url": "",
            "username": "",
            "password": "",
            "port": 6984
          }
        }
      ]
    }
  }
}
```

If your application is running locally, for example for testing, it can connect to Bluemix services using unbound credentials read from this file. If you need to create unbound credentials you can do so from the Bluemix web console ([example](https://console.ng.bluemix.net/docs/services/Cloudant/tutorials/create_service.html#creating-a-service-instance)), or using the CloudFoundry CLI [`cf create-service-key` command](http://cli.cloudfoundry.org/en-US/cf/create-service-key.html). If you use the CloudFoundry CLI you need to create the service instance first with the [`cf create-service` command](http://cli.cloudfoundry.org/en-US/cf/create-service.html). The key information is retrieved with the [`cf service-key` command](http://cli.cloudfoundry.org/en-US/cf/service-key.html). Note, the service names and types will need to match the settings within your `config.json` file.

The following example is a `config.json` which has been updated with credentials information for a service instance called `myapp-Cloudant-z2s2`.

```json
{
  "vcap": {
    "services": {
      "cloudantNoSQLDB": [
        {
          "name": "myapp-Cloudant-z2s2",
          "label": "cloudantNoSQLDB",
          "tags": [],
          "plan": "Lite",
          "credentials": {
            "username": "bf274bea-e997-58ac-a108-572b959f2749-bluemix",
            "password": "c6fe2f0eaad7847ff58dd88c7d9bfb979c40cb3ef8ab7df64738f35310b8de1c",
            "host": "xy274bea-z978-57ec-a108-572b559f2749-bluemix.cloudant.com",
            "port": 443,
            "url": "https://bf274bea-e997-58ac-a108-572b959f2749-bluemix:c6fe2f0eaad7847ff58dd88c7d9bfb979c40cb3ef8ab7df64738f35310b8de1c@xy274bea-z978-57ec-a108-572b559f2749-bluemix.cloudant.com"
          }
        }
      ]
    }
  }
}
```

## Remote configuration

When you push your application to Bluemix the values in your `config.json` file are no longer used, instead Bluemix automatically connects to bound services using environment variables.


[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
