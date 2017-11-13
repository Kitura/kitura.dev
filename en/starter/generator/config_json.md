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

The configuration information for your application is stored in the `config.json` file in the project root directory. This file is listed in `.gitignore` to prevent sensitive information from being stored in git. The connection and configuration information for any configured services, such as username, password and hostname, is stored in this file.

Your Swift Server Generator application uses the [Configuration package](https://github.com/IBM-Swift/Configuration) to configure your application, including any [services](core_concepts.html#services) when it was generated.

If the [IBM Cloud capability](core_concepts.html#bluemix-capability) is enabled, then
[CloudConfiguration package](https://github.com/IBM-Swift/CloudConfiguration) is also
used to manage the configuration of [IBM Cloud services](core_concepts.html#bluemix-services).
In this case, the configuration information will be read from the environment when the
application is deployed on IBM Cloud and from the `config.json` file when running locally.

## IBM Cloud capability disabled

The following example `config.json` file shows the default settings with the [IBM Cloud capability](core_concepts.html#bluemix-capability) **disabled** and no services:

```json
{
  "services": {},
  "logger": "helium",
  "port": "8080"
}
```

You can configure the `port` used by the application.

Any services you select will necessarily be [Non-IBM Cloud services](core_concepts.html#non-bluemix-services)
and their configuration will be added within the `services` object. For example:

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
    ],
    "redis": [
      {
        "name": "redis",
        "type": "redis",
        "host": "localhost",
        "port": 6397
      }
    ]
  },
  ...
}
```

You may alter the configuration of these services to match any required connection details.
If you omit properties, they take their default values.

## IBM Cloud capability enabled

The following example `config.json` file shows the default settings with the [IBM Cloud capability](core_concepts.html#bluemix-capability) **enabled** and no services:

```json
{
  "vcap": {
    "services": {}
  }
}
```

Any services you select will necessarily be [IBM Cloud services](core_concepts.html#bluemix-services)
and their configuration will be added within the `services` object. For example:

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

If your application is running locally, e.g. when testing, it can connect to IBM Cloud services using the credentials read from this file. If you need to create credentials for your service, you can do so from the IBM Cloud web console ([example](https://console.ng.bluemix.net/docs/services/Cloudant/tutorials/create_service.html#creating-a-service-instance)), or using the CloudFoundry CLI [`cf create-service-key` command](http://cli.cloudfoundry.org/en-US/cf/create-service-key.html). If you use the CloudFoundry CLI you need to create the service instance first with the [`cf create-service` command](http://cli.cloudfoundry.org/en-US/cf/create-service.html). The key information is retrieved with the [`cf service-key` command](http://cli.cloudfoundry.org/en-US/cf/service-key.html).

> ![info] Note: the service names and types will need to match the settings within your
> `config.json` file and in the generated boilerplate code in `Sources/Application/Application.swift`.

> ![tip] Tip: Create your IBM Cloud services before generating your application so you can enter
> the connection information in the [service configuration prompts](prompts.html#service-configuration-prompt)
> so you don't have to edit them later.

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

When deployed to IBM Cloud, the connection information used for a given named service is
taken from a matching named service bound to the deployed application in preference to
what is defined in your `config.json` file.

This allows you to run the application locally and on IBM Cloud without modification.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
