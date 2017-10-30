---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Overview
menu: starter
lang: en
redirect_from: "/starter/generator/overview.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Overview</h1>
</div>

The **kitura create** command is a [command-line tool](command_line_tools.html) that
provides a [guided question-and-answer](prompts.html) way to create Kitura Swift
applications.

The generator supports two different ways to generate an application: scaffolding a starter and
generating a CRUD application.

## Scaffolding a starter
A scaffolded starter is an application containing boilerplate code but little or no application
logic. You can use this as a base for your application by modifying the generated files with
your application logic.

You can select from a number of different options presented by the generator to define extra content to be
included in the resulting application. For example, these include things like adding the boilerplate for
serving static files and creating connections to databases.

## Generating a CRUD application
A CRUD ([Create-Read-Update-Delete](core_concepts#crud)) application is one where you provide a description of a data model and the
generator creates application code for a REST webservice that will provide endpoints to perform create, read,
update and delete operations for data matching that data model. In the current version of the generator, most
of the generated CRUD application is not open for modification or extension---expect this to change in a future
version to allow for more flexibility.

## Next Steps
* Get stuck in with the [Getting Started page](getting_started.html).
* For information on the question-and-answer prompts read the [Prompt reference page](prompts.html).

[Go back to the kitura create index page](../generator.html).
