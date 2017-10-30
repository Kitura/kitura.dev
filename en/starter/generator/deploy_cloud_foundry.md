---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Deploying to the Cloud
menu: starter
lang: en
redirect_from: "/starter/generator/deploy_cloud_foundry.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Deploying to the Cloud with Cloud Foundry</h1>
	<p>Use the generator to create scaffolding for a simple Kitura web application and deploy to the cloud using Cloud Foundry CLI.	</p>
</div>

> ![warning] Make sure you have installed the command-line tools as described in
> [Installation](installation.html) before you begin.

---

#### In this tutorial you will:

- Create a scaffolded Kitura application
- Use CloudFoundry CLI to deploy to IBM Cloud

---
<span class="arrow">&#8227;</span> First, run the Swift Server generator (see [Command line tools](command_line_tools.html)):

    $ kitura create

---
<span class="arrow">&#8227;</span> Enter `swiftserver-deploy` as the application name.

    ? What's the name of your application? swiftserver-deploy

> ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `swiftserver-deploy` throughout the rest of this tutorial.

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default directory for the project (the same as the application name).

    ? Enter the name of the directory to contain the project: (swiftserver-deploy)

---
<span class="arrow">&#8227;</span> Select `Scaffold a starter` at the [type of project prompt](prompts.html#project-type-prompt) and press **Enter**.

    ? Select type of project: (Use arrow keys)
    ❯ Scaffold a starter
      Generate a CRUD application

---
<span class="arrow">&#8227;</span> Select [`Web`](prompts.html#web-pattern) at the [application pattern prompt](prompts.html#application-pattern-prompt) (this determines the default set of capabilities) and press **Enter**.

    ? Select capability presets for application pattern: (Use arrow keys)
      Basic
    ❯ Web
      Backend for frontend

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default [capabilities](core_concepts.html#capabilities) for the `Web` application pattern.

    ? Select capabilities: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◉ Static web file serving
      ◯ Swagger UI
      ◉ Embedded metrics dashboard
      ◉ Docker files

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not generating code from a [swagger](core_concepts.html#endpoints-from-swagger-file) specification in the scaffolding.

    ? Select endpoints to generate: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◯ Swagger file serving endpoint
      ◯ Endpoints from a swagger file

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not generating a Swift server SDK from a swagger file in the scaffolding.

    ? Would you like to generate a Swift server SDK from a Swagger file? (y/N)

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not including any boilerplate for [services](core_concepts.html#services) in the scaffolding.

    ? Generate boilerplate for services: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◯ Cloudant
      ◯ Redis
      ◯ MongoDB
      ◯ PostgreSQL
      ◯ Object Storage
      ◯ AppID
      ◯ Auto-scaling

---

The generator will display messages as it scaffolds and builds the application including:

1.  Initializing the project folder structure.

1.  Creating and compiling default Swift files.

1.  Downloading and installing dependent Swift modules (as if you had manually run `swift build`).

---
<span class="arrow">&#8227;</span> Change to the application directory:

    $ cd swiftserver-deploy

---


<span class="arrow">&#8227;</span> To push to `IBM Cloud` use the `Cloud Foundry` type the command `cf push` in the root of your project.

You will receive updates on the progress of the deploying of your app which will look something like this...

```
Using manifest file /path-to-application/swiftserver-deploy/manifest.yml

Creating route swiftserverdeploy-unanalyzable-meridian.stage1.mybluemix.net...
OK

Binding swiftserverdeploy-unanalyzable-meridian.mybluemix.net to swiftserverdeploy...
OK
```

> ![info] Note: Ensure you are logged in to the correct API endpoint. To check type `cf target` and to login type `cf login`, more information on `cf` commands can be found  [here](https://console.ng.bluemix.net/docs/cli/reference/cfcommands/index.html)

## Next Steps
Take a look at the [other tutorials](../generator.html#tutorials).



[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
