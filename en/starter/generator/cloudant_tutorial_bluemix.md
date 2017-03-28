---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Getting started with Cloudant on Bluemix
menu: starter
lang: en
redirect_from: "/starter/generator/cloudant_tutorial_bluemix.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Creating a project with Cloudant for Bluemix</h1>
	<p>Use the generator to create scaffolding for a simple Kitura web application and using a Cloudant service on Bluemix.	</p>
</div>

> ![warning] Make sure you have installed the command-line tools as described in
> [Installation](installation.html) before you begin.

---
<span class="arrow">&#8227;</span> First, run the Swift Server generator (see [Command line tools](command_line_tools.html)):

    $ yo swiftserver

---
<span class="arrow">&#8227;</span> Enter `swiftserver-cloudant` as the application name.

    ? What's the name of your application? swiftserver-cloudant

> ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `swiftserver-cloudant` throughout the rest of this tutorial.

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default directory for the project (the same as the application name).

    ? Enter the name of the directory to contain the project: (swiftserver-cloudant)

---
<span class="arrow">&#8227;</span> Select [`Scaffold a starter`](core_concepts.html#scaffold) for the [type of project](core_concepts.html#project-type) and press **Enter**.

    ? Select type of project: (Use arrow keys)
    ❯ Scaffold a starter
      Generate a CRUD application

---
<span class="arrow">&#8227;</span> Select [`Web`](core_concepts.html#web-pattern) for the [application pattern](core_concepts.html#application-pattern) (this determines the default set of capabilities) and press **Enter**.

    ? Select capability presets for application pattern: (Use arrow keys)
      Basic
    ❯ Web
      Backend for frontend

---
<span class="arrow">&#8227;</span> Press **Enter** to accept the default [capabilities](core_concepts.html#capabilities) for the `Web` application pattern.

    ? Select capabilities: (Press <space> to select)
    ❯ ◉ Static web file serving
      ◯ OpenAPI / Swagger endpoint
      ◯ Example endpoints
      ◉ Embedded metrics dashboard
      ◉ Docker files
      ◉ Bluemix cloud deployment

---
<span class="arrow">&#8227;</span> Navigate to `Cloudant` and press **Space** to select and include [Cloudant](https://console.ng.bluemix.net/docs/services/Cloudant/index.html#getting-started-with-cloudant) into the scaffolding.

    ? Generate boilerplate for Bluemix services: (Press <space> to select)
    ❯ ◉ Cloudant
      ◯ Redis
      ◯ Object Storage
      ◯ AppID
      ◯ Auto-scaling

---
<span class="arrow">&#8227;</span> To configure `Cloudant` press **Space** to select and **Enter** to configure. If you want to keep the defaults then leave it unselected and just press **Enter**.

    ? Configure service credentials (leave unchecked for defaults): (Press <space> to select, <a> to toggle all, <i> to inverse selection)
    ❯◯ Cloudant / CouchDB


If you selected to configure `Cloudant` you will get a series of questions:

```
Configure Cloudant / CouchDB
? Enter name (blank for default):
? Enter host name: sdfef-61c1-4b7f-9b74-1837370d4185-bluemix.cloudant.com
? Enter port: 443
? Secure (https)? Yes
? Enter username (blank for none): sdfef-61c1-4b7f-9b74-1837370d4185-bluemix
? Enter password: ***********
```

> ![info] Note: You will need to get the information/credentials from `Bluemix` or `CloudFoundry` and copy the values into the respective places

The generator will display messages as it scaffolds and builds the application including:

1.  Initializing the project folder structure.

1.  Creating and compiling default Swift files.

1.  Downloading and installing dependent Swift modules (as if you had manually run `swift build`).

---
<span class="arrow">&#8227;</span> Now you should have a generated application directory similar to this:
<pre>
swiftserver-cloudant/
├── public/
├── Sources/
│   ├── Application
│   │   ├── Application.swift
│   │   └── Routes/
│   │   └── Extensions
|   |       └── CouchDBExtension.swift
│   └── swiftserver-cloudant
│       └── main.swift
├── Package.swift
├── README.md
├── config.json
└── ...
</pre>

> ![info] For a description of the generated files, take a look at the structure of a generated project in the [Project layout reference](project_layout_reference.html).

---
<span class="arrow">&#8227;</span> Change to the application directory:

    $ cd swiftserver-cloudant

---
<span class="arrow">&#8227;</span> Start the application:

    $ .build/debug/swiftserver-cloudant

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

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
