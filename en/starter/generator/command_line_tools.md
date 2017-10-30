---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Command-line tools
menu: starter
lang: en
redirect_from: "/starter/generator/command_line_tools.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Command-line interface reference</h1>
	<p>Documents the Kitura command-line interface for generating server applications</p>
</div>

> ![info] On Linux, follow [these instructions](command_line_tools_for_linux) to generate Kitura applications.

On macOS, `kitura create` and `kitura init` generate template Kitura applications.

*Table 1. Available commands*

| Command                           | Description                                                                                                                                                                                                                                                            |
|---------------------------------  |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`kitura init`**              | Create a new Swift Server application with default options selected.                                                                                                                                                                                                                       |
| **`kitura create`**              | Create a new Swift Server application.                                                                                                                                                                                                                       |
| **`kitura create <modelname>`** | Add a new model to a Swift Server Generator CRUD application.                                                                                                                                                                                                               |

### `kitura init`

This command generates a basic Kitura project including [`SwiftMetrics`](https://github.com/RuntimeTools/SwiftMetrics) for monitoring and configuration files to allow you to easily deploy to a Docker container, a Kubernetes cluster, or the IBM Cloud.

### `kitura create`

This command generates an application based on your answers to a series of questions. Once all the questions have been answered, the project is created, written to the filesystem, and built using `swift build`. If you select 'Basic' and answer all questions with default responses it will generate the same application as `kitura init`.

### `kitura create <modelname>`

Allows you to define a data model for a CRUD ([Create-Read-Update-Delete](core_concepts#crud)) application through a series of questions.


> ![tip] Note that you must run `kitura create` before creating your first model.




[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
