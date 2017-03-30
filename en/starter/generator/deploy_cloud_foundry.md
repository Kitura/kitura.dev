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
	<p>Use the generator to create scaffolding for a simple Kitura web application and deploy to the cloud using `Cloud Foundry` cli.	</p>
</div>

> ![warning] Make sure you have installed the command-line tools as described in
> [Installation](installation.html) before you begin.

---
<span class="arrow">&#8227;</span> First, run the Swift Server generator (see [Command line tools](command_line_tools.html)):

    $ yo swiftserver

---
<span class="arrow">&#8227;</span> Enter `swiftserver-deploy` as the application name.

    ? What's the name of your application? swiftserver-deploy

> ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `swiftserver-deploy` throughout the rest of this tutorial.

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default directory for the project (the same as the application name).

    ? Enter the name of the directory to contain the project: (swiftserver-deploy)

---
<span class="arrow">&#8227;</span> Select [`Scaffold a starter`](prompts.html#scaffold) for the [type of project](prompts.html#project-type) and press **Enter**.

    ? Select type of project: (Use arrow keys)
    ❯ Scaffold a starter
      Generate a CRUD application

---
<span class="arrow">&#8227;</span> Select [`Web`](prompts.html#web-pattern) for the [application pattern](prompts.html#application-pattern) (this determines the default set of capabilities) and press **Enter**.

    ? Select capability presets for application pattern: (Use arrow keys)
      Basic
    ❯ Web
      Backend for frontend

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default [capabilities](prompts.html#capabilities) for the `Web` application pattern.

    ? Select capabilities: (Press <space> to select)
    ❯ ◉ Static web file serving
      ◯ OpenAPI / Swagger endpoint
      ◯ Example endpoints
      ◉ Embedded metrics dashboard
      ◉ Docker files
      ◉ Bluemix cloud deployment

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not including any boilerplate for [services](prompts.html#services) in the scaffolding.

    ? Generate boilerplate for Bluemix services: (Press <space> to select)
    ❯ ◯ Cloudant
      ◯ Redis
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


<span class="arrow">&#8227;</span> To push to `Bluemix` use the `Cloud Foundry` type the command `cf push` in the root of your project.

You will receive updates on the progress of the deploying of your app which will look something like this...

```
Using manifest file /path-to-application/swiftserver-deploy/manifest.yml

Creating route swiftserverdeploy-unanalyzable-meridian.stage1.mybluemix.net...
OK

Binding swiftserverdeploy-unanalyzable-meridian.mybluemix.net to swiftserverdeploy...
OK
```

> ![info] Note: Ensure you are logged in to the correct API endpoint. To check type `cf target` and to login type `cf login`, more information on `cf` commands can be found  [here](https://console.ng.bluemix.net/docs/cli/reference/cfcommands/index.html)

---

## Next Steps

> TODO

* Review and modify the generated code.
* Create web content in the `public` directory.
* View the embedded metrics dashboard.
* Run the application inside a Docker container.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
