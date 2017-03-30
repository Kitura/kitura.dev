---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Getting started with Swift Server Generator
menu: starter
lang: en
redirect_from: "/starter/generator/getting_started.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Getting started with Swift Server Generator</h1>
	<p>Use the generator to create scaffolding for a simple Kitura web application.	</p>
</div>

> ![warning] Make sure you have installed the command-line tools as described in
> [Installation](installation.html) before you begin.

---
<span class="arrow">&#8227;</span> First, run the Swift Server generator (see [Command line tools](command_line_tools.html)):

    $ yo swiftserver

---
<span class="arrow">&#8227;</span> Enter `swiftserver-getting-started` as the application name.

    ? What's the name of your application? swiftserver-getting-started

> ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `swiftserver-getting-started` throughout the rest of this tutorial.

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default directory for the project (the same as the application name).

    ? Enter the name of the directory to contain the project: (swiftserver-getting-started)

---
<span class="arrow">&#8227;</span> Select `Scaffold a starter` at the [type of project prompt](core_concepts.html#project-type-prompt) and press **Enter**.

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
<span class="arrow">&#8227;</span> Press **Enter** to accept the default [capabilities](core_concepts.html#capabilities) for the [`Web`](prompts.html#web-pattern) application pattern.

    ? Select capabilities: (Press <space> to select)
    ❯ ◉ Static web file serving
      ◯ OpenAPI / Swagger endpoint
      ◯ Example endpoints
      ◉ Embedded metrics dashboard
      ◉ Docker files
      ◉ Bluemix cloud deployment

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not including any boilerplate for [services](core_concepts.html#services) in the scaffolding.

    ? Generate boilerplate for Bluemix services: (Press <space> to select)
    ❯ ◯ Cloudant
      ◯ Redis
      ◯ Object Storage
      ◯ AppID
      ◯ Auto-scaling

The generator will display messages as it scaffolds and builds the application including:

1.  Initializing the project folder structure.

1.  Creating and compiling default Swift files.

1.  Downloading and installing dependent Swift modules (as if you had manually run `swift build`).

---
<span class="arrow">&#8227;</span> Now you should have a generated application directory similar to this:
<pre>
swiftserver-getting-started/
├── public/
├── Sources/
│   ├── Application
│   │   ├── Application.swift
│   │   └── Routes/
│   └── swiftserver-getting-started
│       └── main.swift
├── Package.swift
├── README.md
├── config.json
└── ...
</pre>

> ![info] For a description of the generated files, take a look at the structure of a generated project in the [Project layout reference](project_layout_reference.html).

---
<span class="arrow">&#8227;</span> Change to the application directory:

    $ cd swiftserver-getting-started

---
<span class="arrow">&#8227;</span> Start the application:

    $ .build/debug/swiftserver-getting-started

---
<span class="arrow">&#8227;</span> Confirm the application is running locally by opening the URL
[http://localhost:8080](http://localhost:8080) in your browser. You'll see something like this:

    Welcome to Kitura
    Your Kitura based server is up and running!

Congratulations, you now have a simple Kitura web application ready for extension with your own application logic.

## Next Steps

> TODO

* Review and modify the generated code.
* Create web content in the `public` directory.
* View the embedded metrics dashboard.
* Run the application inside a Docker container.
* Deploy the application to Bluemix or CloudFoundry.
* Try generating an application with a local CouchDB service.
* Try generating an application with Bluemix Cloudant service.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
