---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Leverage Docker For Your Development Environment Setup
menu: starter
lang: en
redirect_from: "/starter/leveragedocker.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Leverage Docker For Your Development Environment Setup</h1>
</div>


# Compile and test your code on macOS and Linux

Here are steps you can take for setting up your development environment for Kitura:

1. Install [Docker](https://docs.docker.com/engine/installation/) on your development system and start a Docker session/terminal.

2. From the Docker session, pull down the `swift-ubuntu` image from Docker Hub:

   `docker pull ibmcom/swift-ubuntu:latest`

3. Create a Docker container using the `swift-ubuntu` image and mount the folder on your macOS system that contains the Kitura Swift package you are working on:

   `docker run -i -t -v <absolute path to the swift package>:/root/<swift package name> ibmcom/swift-ubuntu:latest /bin/bash`

   For example:

   `docker run -i -t -v /Users/olivieri/git/Kitura/:/root/Kitura ibmcom/swift-ubuntu:latest /bin/bash`

4. Now you have access to the same source code files from your macOS system and Docker container. You can compile and test your code on macOS and also on Linux with minimal effort.


# Expose Kitura's Port in Docker Container to Host Machine

Depending on your Docker installation the instructions to expose the Docker container's port differs:

## If you are using the new Docker for Mac macOS app:

Since the new Docker for Mac macOS app removed the need for VirtualBox, exposing your Kitura server's port in a Docker container is much simpler. Simply pass in the port binding as an option when you first run the container image, like so:

`docker run -p <host-port>:<container-port> [additional-options] ibmcom/swift-ubuntu:latest`.

For example, if your Kitura server is running on port 3000, and you want to make it accessible at port 4000 on the host OS:

`docker run -p 4000:3000 ibmcom/swift-ubuntu:latest`

Your Kitura server can now listen on port 3000 inside the Docker container, and be accessible through your host OS at port 4000. Please check the [official docs](https://docs.docker.com/engine/reference/run/#/expose-incoming-ports) for more information on how to configure the `-p` option.

**NOTE** This only works if you don't have a live container already. There is no way to expose ports on a live container. [If you already have a live container and wish to expose a port, you can first commit the live container to a new image, then run this new image with the `-p` option.](http://stackoverflow.com/a/21374974)

## If you are using legacy Docker (i.e., with VirtualBox):

These are the steps to expose Kitura's port in a Docker container to the host (e.g. a macOS laptop):

1) Execute `docker run -d -P ibmcom/swift-ubuntu:latest`.

2) Execute `docker ps`.

3) Inspect the values under the PORTS column for the container you just started. You should see something like the following: `0.0.0.0:32768->8080/tcp`. This means that Kitura’s port `8080` in the Docker container is mapped to port `32768` on the host. Now, the host in this case is not the macOS laptop. Instead, it is the VirtualBox machine that Docker uses.

4) Go to VirtualBox, and open the settings panel for the virtual machine that is running Docker (i.e. right click on the virtual machine and select `Settings`).

5) Go to the Network tab and click on `Port Forwarding`.

6) Add a new row with the following values:

- name: kitura
- protocol: tcp
- host ip: 127.0.0.1
- host port: 8080
- guest port: &lt;the host port reported under the PORTS column (e.g. 32768)&gt;

7) Click `OK` and `OK` again to save the settings for the virtual machine.

8) Open your browser and go to `http://localhost:8080`. You should see the Kitura welcome page.

<section class="social-section">
	<div class="social-link">
		<a rel="nofollow" href="http://swift-at-ibm-slack.mybluemix.net">
		<img src="https://developer.ibm.com/swift/wp-content/uploads/sites/69/2018/01/slack-150x150.png" alt="Slack Logo" width="60" height="60" class="social-image"/></a>
		<p class="social-header">Join the discussion on Slack</p>
	</div>
	<div  class="social-link">
		<iframe class="social-image" src="https://ghbtns.com/github-btn.html?user=IBM-Swift&amp;repo=Kitura&amp;type=star&amp;count=true&amp;size=large" frameborder="0" scrolling="0" width="150px" height="30px"></iframe>
		<p class="social-header">Star Kitura on GitHub</p>
	</div>
</section>
