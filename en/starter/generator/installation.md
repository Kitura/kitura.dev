---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Installing
menu: starter
lang: en
redirect_from: "/starter/generator/installation.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---
[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png

<div class="titleBlock">
	<h1>Installing</h1>
</div>

## macOS

- Follow the [Getting Started](../gettingstarted.html).

<hr>
## Ubuntu Linux

**Prerequisities**

-   Install Node.js. If you haven’t already installed Node.js, [download the pre-built installer](https://nodejs.org/en/download/) for your platform and run it.

-   Install Swift 4.0.x, so that the tool can compile the generated Kitura/Swift application. For installation instructions, see [Kitura: Setting up](../settingup.html).

Complete the following steps to install Swift Server Generator

1.  Open a Terminal window.

2.  You will need the Yeoman command line utility [yo](https://github.com/yeoman/yo) installed in your global Node.js module directory:

        $ npm install -g yo

3.  To install [Swift Server Generator](https://github.com/IBM-Swift/generator-swiftserver), run the following command:

        $ npm install -g generator-swiftserver

> ![info] Note: Swift Server Generator is supported only on the following operating systems:
>
> -   Ubuntu Linux 14.04 LTS
> -   Ubuntu Linux 16.04 LTS

