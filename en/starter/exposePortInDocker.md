---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Expose Kitura's Port in Docker Container to Host Machine
menu: starter
lang: en
redirect_from: "/starter/exposePortInDocker.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Expose Kitura's Port in Docker Container to Host Machine</h1>
</div>

Depending on your Docker installation the instructions to expose the Docker container's port differs:

### If you are using legacy Docker (i.e., with Virtual Box):

These are the steps to expose Kitura's port in a Docker container to the host (e.g. an OS X laptop):

1) Execute `docker run -d -P ibmcom/swift-ubuntu:latest`.

2) Execute `docker ps`.

3) Inspect the values under the PORTS column for the container you just started. You should see something like the following: `0.0.0.0:32768->8090/tcp`. This means that Kitura’s port `8090` in the Docker container is mapped to port `32768` on the host. Now, the host in this case is not the OS X laptop. Instead, it is the Virtual Box machine that Docker uses.

4) Go to Virtual Box, and open the settings panel for the virtual machine that is running Docker (i.e. right click on the virtual machine and select `Settings`).

5) Go to the Network tab and click on `Port Forwarding`.

6) Add a new row with the following values:

- name: kitura
- protocol: tcp
- host ip: 127.0.0.1
- host port: 8090
- guest port: &lt;the host port reported under the PORTS column (e.g. 32768)&gt;

7) Click `OK` and `OK` again to save the settings for the virtual machine.

8) Open your browser and go to `http://localhost:8090`. You should see the Kitura welcome page.

### If you are using the new Docker for Mac macOS app:

Since the new Docker for Mac macOS app removed the need for VirtualBox, exposing your Kitura server's port in a Docker container is much simpler. Simply pass in the port binding as an option when you first run the container image, like so:

`docker run -p <host-port>:<container-port> [additional-options] ibmcom/swift-ubuntu:latest`.

For example, if your Kitura server is running on port 3000, and you want to make it accessible at port 4000 on the host OS:

`docker run -p 4000:3000 ibmcom/swift-ubuntu:latest`

Your Kitura server can now listen on port 3000 inside the Docker container, and be accessible through your host OS at port 4000. Please check the [official docs](https://docs.docker.com/engine/reference/run/#/expose-incoming-ports) for more information on how to configuration the `-p` option.

**NOTE** This only works if you don't have a live container already. There is no way to expose ports on a live container. [If you already have a live container and wish to expose a port, you can first commit the live container to a new image, then run this new image with the `-p` option.](http://stackoverflow.com/a/21374974)
