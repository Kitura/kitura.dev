---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Leverage Docker For Your Development Environment Setup
menu: starter
lang: en
redirect_from: "/starter/leverageDocker.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Leverage Docker For Your Development Environment Setup</h1>
</div>

<hr>
This page describes the steps I took for setting up my development environment for Kitura:

1. Install [Docker](https://docs.docker.com/engine/installation/) on your development system and start a Docker session/terminal.

2. From the Docker session, pull down the `swift-ubuntu` image from Docker Hub:
   
   `docker pull ibmcom/swift-ubuntu:latest`

3. Create a Docker container using the `swift-ubuntu` image and mount the folder on your OS X system that contains the Kitura Swift package you are working on:

   `docker run -i -t -v <absolute path to the swift package>:/root/<swift package name> ibmcom/swift-ubuntu:latest /bin/bash`

   For example:

   `docker run -i -t -v /Users/olivieri/git/Kitura/:/root/Kitura ibmcom/swift-ubuntu:latest /bin/bash`

4. Now you have access to the same source code files from your OS X system and Docker container. You can compile and test your code on OS X and also on Linux with minimal effort.
