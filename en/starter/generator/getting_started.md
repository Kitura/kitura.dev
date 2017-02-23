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
</div>

**Summary:** Use the application generator tool to quickly create a Swift Server Generator application, models and data sources.

**Prerequisite:** Install command-line tools as described in [Installation](installation.html).

**Recommended:** Read Swift Server Generator core concepts.

---

## Create new application

To create a new application, run the Swift Server application generator (see [Command line tools](command_line_tools.html) ):

    $ yo swiftserver

The Swift Server generator prompts you for the name of the application.

Enter `swiftserver-getting-started`. The generator will prompt you for the name of the directory to contain the project. Press **Enter** to accept the default (the same as the application name). For example:

    [?] What's the name of your application? swiftserver-getting-started

    [?] Enter the name of the directory to contain the project: swiftserver-getting-started

  > ![info] Note: You can use a different name for the application, but if you do, be sure to substitute your name for `swiftserver-getting-started` throughout the rest of this tutorial.

The tool prompts you to select the data store to use for the project:

    [?] Select the data store (Use arrow keys)
    > memory (for development purposes)
    cloudant

Press **Enter** to accept the default selection, the `memory` data source. This memory data source, suitable for development and testing, is built into the Swift Server Generator.

  The tool displays several messages as it creates the project directory and adds a number of directories and files to it. 

The generator then displays messages as it scaffolds the application including:

1.  Initializing the project folder structure; see [Project layout reference](project_layout_reference.html).

2.  Creating default JSON files.

3.  Creating and compiling default Swift files.

4.  Downloading and installing dependent Swift modules (as if you had manually run `swift build`).

---

## Create models

Now that you’ve created the initial project, you’re going to create a *CoffeeShop* model that will automatically have REST API endpoints.

Go into your new application directory, then run the Swift Server [model generator](http://loopback.io/doc/en/lb2/Model-generator):

    $ cd swiftserver-getting-started

    $ yo swiftserver:model

The generator will prompt for a model name.  Enter `CoffeeShop`:

    [?] Enter the model name: CoffeeShop

Swift Server Generator automatically creates a REST route associated with your model using the *plural* of the model name.  By default, it pluralizes the name for you (by adding "s"), but you can specify a custom plural form if you wish.  See [Exposing Swift Server Generator models over REST](exposing_ssg_models_over_rest.html) for details.  

Press **Enter** to accept the default plural form (`CoffeeShops`):

    [?] Custom plural form (used to build REST URL): (CoffeeShops)

Every model has properties.  Right now, you’re going to define one property, `name`, for the CoffeeShop model:

    Let's add some CoffeeShop properties now.

    Enter an empty property name when done.
    [?] Enter the property name: name

Select `string` as the property type (press **Enter**, as `string` is the default choice):

    [?] Property type: (Use arrow keys)
    > string
    number
    boolean
    object
    array

Each property can be optional or required. Enter `y` to make name required:

    [?] Required? (y/N)

Then you'll be prompted to enter a default value for the property; press **Enter** for no default value:

    [?] Default? (y/N)

Then, you'll be prompted to add another property. Follow the prompts to add a required property named `city` which does not have a default value.

    ? Enter the property name: city
    ? Property type: string
    ? Required? Yes
    ? Default? (y/N)

End the model creation process by pressing **Enter** when prompted for the name of the next property.

The model generator creates a file in the application’s `models` directory that defines the model: `CoffeeShop.json`

---

## Check out the project structure

For all the details of the Swift Server Generator application structure, see [Project layout reference](project_layout_reference.html).

---

## Run the application

Start the application:

    $ .build/debug/swiftserver-getting-started

To confirm that the project is running locally, open the URL
`http://localhost:8090` in your browser. You'll see something like this:

    Welcome to Kitura
    Your Kitura based server is up and running!

Through a set of simple steps using the Swift Server Generator tool, you’ve created a CoffeeShop model, specified its properties and then exposed it through REST.

Models that are created by following this tutorial have a standard set of create, read, update and delete operations defined. See [Exposing Swift Server Generator models over REST](exposing_ssg_models_over_rest.html) for details. You can test any of the API endpoints by using **`curl`** commands. For example, to display all the model instances in the `swiftserver-getting-started` project, enter the following command (the `-k` option avoids certificate errors):

    curl http://localhost:8090/api/CoffeeShops

If the project has some model instances, the console displays the JSON data, otherwise, the console displays an empty array `[]`.

[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
