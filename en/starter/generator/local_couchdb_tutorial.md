---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Setting up a local couchdb application
menu: starter
lang: en
redirect_from: "/starter/generator/getting_started.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Setting up a local couchdb application</h1>
	<p>How to setup a Kitura application that can access a local couchdb database.</p>
</div>

**Prerequisities:**

Install couchdb locally:

Instructions for installing CouchDB can be found in the [CouchDB documentation](http://docs.couchdb.org).
For this tutorial, the Ubuntu packaged version (CouchDB 1.6.0) was installed on Ubuntu 16.04:

```bash
$ apt-get install couchdb
```

Full installation documentation for Linux, Mac and Windows can be found [here](http://docs.couchdb.org/en/1.6.0/install/index.html).  Once installed, you can verify the installation with a curl command:

```bash
$ curl http://127.0.0.1:5984/
{"couchdb":"Welcome","uuid":"c8693df0aa80678d55a2dc2084c32f9b","version":"1.6.0","vendor":{"name":"Ubuntu","version":"15.10"}}
```

# Generating the scaffolded application

<span class="arrow">&#8227;</span> Enter `yo swiftserver` to start the generator.

<span class="arrow">&#8227;</span> Enter `couchdb-getting-started` as the application name.

    ? What's the name of your application? couched-getting-started

> ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `couchdb-getting-started` throughout the rest of this tutorial.

<span class="arrow">&#8227;</span> Press **Enter** to accept the default directory for the project (the same as the application name).

    ? Enter the name of the directory to contain the project: (couchdb-getting-started)

<span class="arrow">&#8227;</span> Select [`Scaffold a starter`](core_concepts.html#scaffold) for the [type of project](core_concepts.html#project-type) and press **Enter**.

```
? Select type of project: (Use arrow keys)
❯ Scaffold a starter
  Generate a CRUD application
```

<span class="arrow">&#8227;</span> Select [`Basic`](core_concepts.html#web-pattern) for the [application pattern](core_concepts.html#application-pattern) (this determines the default set of capabilities) and press **Enter**.

```
? Select capability presets for application pattern: (Use arrow keys)
❯ Basic
  Web
  Backend for frontend
```

<span class="arrow">&#8227;</span> Press **Enter** to accept the default [capabilities](core_concepts.html#capabilities) for the `Basic` application pattern.

Use the spacebar to select or deselect any capabilities. For this tutorial you do not need any capabilities, you are free to deselect all of them.

```
? Select capabilities: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
  ◯ Static web file serving
  ◯ OpenAPI / Swagger endpoint
 ❯◯ Example endpoints
  ◉ Embedded metrics dashboard
  ◉ Docker files
  ◉ Bluemix cloud deployment
```

<span class="arrow">&#8227;</span> Press **space** to select the CouchDB boilerplate for inclusion as a [service](core_concepts.html#services) in the scaffolding.

```
? Generate boilerplate for local services: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
❯ ◉ CouchDB
  ◯ Redis
```

<span class="arrow">&#8227;</span> Press **space** to select the Cloudant / CouchDB configuration. If you let the generator provide the defaults, there is nothing more to do. The generator will now complete its code generation with defaults that allow CouchDB to be accessed on port **5984** on **localhost**. If you opt for setting the configuration options, then you will get further questions about the specifics of the CouchDB service. 

```
? Configure service credentials (leave unchecked for defaults): (Press <space> to select, <a> to toggle all, <i> to inverse selection)
❯ ◯ Cloudant / CouchDB
```

The generator will display messages as it scaffolds and builds the application including:

1.  Initializing the project folder structure.

1.  Creating and compiling default Swift files.

1.  Downloading and installing dependent Swift modules (as if you had manually run `swift build`).

<span class="arrow">&#8227;</span> Now you should have a generated application directory similar to this:
<pre>
couchdb-getting-started/
├── Sources/
│   ├── Application
│   │   ├── Application.swift
│   │   ├── CloudantConfig.swift
│   │   └── Routes/
│   └── couchdb-getting-started
│       └── main.swift
├── Package.swift
├── README.md
├── conig.json
└── ...
</pre>

> ![info] For a description of the generated files, take a look at the structure of a generated project in the [Project layout reference](project_layout_reference.html).

<span class="arrow">&#8227;</span> Change to the application directory:

    $ cd couchdb-getting-started

<span class="arrow">&#8227;</span> Start the application:

    $ .build/debug/couchdb-getting-started

<span class="arrow">&#8227;</span> Confirm the application is running locally by opening the URL
[http://localhost:8080](http://localhost:8080) in your browser. You'll see something like this:

    Welcome to Kitura
    Your Kitura based server is up and running!

Congratulations, you now have a simple Kitura web application ready for extension with your own application logic.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png