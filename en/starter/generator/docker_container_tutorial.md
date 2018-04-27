---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Running inside a Docker container
menu: starter
lang: en
redirect_from: "/starter/generator/docker_container_tutorial.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---
[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png

<div class="titleBlock">
	<h1>Running inside a Docker container</h1>
	<p>How to run your Kitura application inside a Docker container.</p>
</div>

**Prerequisities:**

> ![warning] Make sure you have installed the command-line tools as described in
> [Getting Started](../gettingstarted.html) before you begin.

---

<span class="arrow">&#8227;</span> Install [Docker](http://www.docker.com/products/docker) on your development system.

# Generating the scaffolded application

<span class="arrow">&#8227;</span> First, start the Kitura server generation (see [Command line tools](command_line_tools.html)):

    $ kitura create

<span class="arrow">&#8227;</span> Enter `docker-getting-started` as the application name.

    ? What's the name of your application? docker-getting-started

> ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `docker-getting-started` throughout the rest of this tutorial.

<span class="arrow">&#8227;</span> Press **Enter** to accept the default directory for the project (the same as the application name).

    ? Enter the name of the directory to contain the project: (docker-getting-started)

<span class="arrow">&#8227;</span> Select `Scaffold a starter` at the [type of project prompt](prompts.html#project-type-prompt) and press **Enter**.

    ? Select type of project: (Use arrow keys)
    ❯ Scaffold a starter
      Generate a CRUD application

<span class="arrow">&#8227;</span> Select [`Basic`](prompts.html#basic-pattern) at the [application pattern prompt](prompts.html#application-pattern-prompt) (this determines the default set of capabilities) and press **Enter**.

    ? Select capability presets for application pattern: (Use arrow keys)
    ❯ Basic
      Web
      Backend for frontend

<span class="arrow">&#8227;</span> Press **Space** to select the [capabilities](core_concepts.html#capabilities) for the [`Basic`](prompts.html#basic-pattern) application pattern.

Use the spacebar to select or deselect any capabilities. For this tutorial you must select **Docker files**.

    ? Select capabilities: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◯ Static web file serving
      ◯ Swagger UI
      ◯ Embedded metrics dashboard
      ◉ Docker files

<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not generating code from a [swagger](core_concepts.html#endpoints-from-swagger-file) specification in the scaffolding.

    ? Select endpoints to generate: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◯ Swagger file serving endpoint
      ◯ Endpoints from a swagger file

<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not generating a Swift server SDK from a swagger file in the scaffolding.

    ? Would you like to generate a Swift server SDK from a Swagger file? (y/N)

<span class="arrow">&#8227;</span> Press **Enter** to accept the default of not including any boilerplate for [services](core_concepts.html#services) in the scaffolding.

    ? Generate boilerplate for services: (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯ ◯ Cloudant / CouchDB
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

<span class="arrow">&#8227;</span> Now you should have a generated application directory similar to this:
<pre>
docker-getting-started/
├── Sources/
│   ├── Application
│   │   ├── Application.swift
│   │   └── Routes/
│   └── docker-getting-started
│       └── main.swift
├── Package.swift
├── README.md
├── config.json
├── Dockerfile
├── Dockerfile-tools
├── .dockerignore
└── ...
</pre>

> ![info] For a description of the generated files, take a look at the structure of a generated project in the [Project layout reference](project_layout_reference.html).

<span class="arrow">&#8227;</span> Change to the application directory:

    $ cd docker-getting-started

<span class="arrow">&#8227;</span> Build the Docker run and Docker build tools images:

```bash
$ docker build -t myapp-run .
$ docker build -t myapp-build -f Dockerfile-tools .
```

You may customize the names of these images by specifying a different value after the `-t` option.

<span class="arrow">&#8227;</span> To compile the application using the build tools Docker image, run:

```bash
$ docker run -v $PWD:/root/project -w /root/project myapp-build /swift-utils/tools-utils.sh build release
```

<span class="arrow">&#8227;</span> To run the application in the Docker container:

```bash
$ docker run -it -p 8080:8080 -v $PWD:/root/project -w /root/project myapp-run sh -c .build-ubuntu/release/docker-getting-started
```

<span class="arrow">&#8227;</span> Confirm the application is running locally by opening the URL
[http://localhost:8080](http://localhost:8080) in your browser. You'll see something like this:

    Welcome to Kitura
    Your Kitura based server is up and running!

Congratulations, you now have a simple Kitura web application in a Docker image which can be distributed and deployed to other Docker servers.

## Next Steps
Take a look at the [other tutorials](../generator.html#tutorials).

