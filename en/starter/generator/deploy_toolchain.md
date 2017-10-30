---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Deploying to the Cloud
menu: starter
lang: en
redirect_from: "/starter/generator/deply_toolchain.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Deploying to the Cloud with Create Toolchain</h1>
	<p>Use the generator to create scaffolding for a simple Kitura web application, deploying to IBM Cloud and setting up your continuous delivery environment.	</p>
</div>

> ![warning] Make sure you have installed the command-line tools as described in
> [Installation](installation.html) before you begin.

---

#### In this tutorial you will:

- Create a scaffolded Kitura application
- Push to [GitHub](https://github.com/)
- Deploy to IBM Cloud
- Set up your [Continuous Delivery](https://console.ng.bluemix.net/docs/services/ContinuousDelivery/index.html) environment

---
<span class="arrow">&#8227;</span> First, start the Kitura server generation (see [Command line tools](command_line_tools.html)):

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
    ❯ ◯ Cloudant / CouchDB
      ◯ Redis
      ◯ MongoDB
      ◯ PostgreSQL
      ◯ Object Storage
      ◯ AppID
      ◯ Auto-scaling

The generator will display messages as it scaffolds and builds the application including:

1.  Initializing the project folder structure.

1.  Creating and compiling default Swift files.

1.  Downloading and installing dependent Swift modules (as if you had manually run `swift build`).

---
<span class="arrow">&#8227;</span> Change to the application directory:

    $ cd swiftserver-deploy

---

<span class="arrow">&#8227;</span> To deploy to `IBM Cloud` you will need to create a [GitHub repository](https://help.github.com/articles/creating-a-new-repository/) and push the project to your newly created repository.

---

<span class="arrow">&#8227;</span> View the README.md on the github repository page.

---

<span class="arrow">&#8227;</span> Go to the `Deploy to IBM Cloud` section and click the "Create Toolchain" button that looks like this:

![Create Toolchain](https://console.ng.bluemix.net/devops/graphics/create_toolchain_button.png)

This will take you to the page to create a default toolchain in `IBM Cloud` and set up [Continuous Delivery](https://console.ng.bluemix.net/docs/services/ContinuousDelivery/index.html).

---

<span class="arrow">&#8227;</span> Follow any set-up instructions and then click on the `Create` button to create a toolchain.  
This will provision services and start a deploy of your application.

> ![info] Note: The default toolchain will automatically redeploy your application when
> you push new changes to the `master` branch of your github repository.

## Next Steps
Take a look at the [other tutorials](../generator.html#tutorials).

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
