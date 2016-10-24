---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Deploying to the Cloud
menu: starter
lang: en
redirect_from: "/starter/deploy.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Deploying to the Cloud

Kitura is built to be Cloud-ready.

We provide a simple starter project that demonstrates deployment to [Bluemix](https://www.bluemix.net), plus a macOS desktop application to aid integration with Xcode.

Additionally, you can use our pre-built Docker image to guide you on how to deploy a container-based Kitura application.

# Kitura-Starter

[Kitura-Starter](https://github.com/IBM-Bluemix/Kitura-Starter) is a Kitura based server application that you can use as a starting point to get your own Kitura application up and running on Bluemix. After cloning this GitHub repo to your local system, you can deploy this application to Bluemix right away.

Once you have the Cloud Foundry command line tool installed, deploying to the cloud is as simple as `cf push`.

# IBM Cloud Tools for Swift

[IBM Cloud Tools for Swift](http://cloudtools.bluemix.net/) radically simplifies the management and deployment of server-side assets. It helps improve productivity by complimenting a developer's familiar Xcode environment.

Swift developers can extend their mobile apps and connect them to IBM Bluemix with a local development environment. Now, every Swift developer can more easily begin to deploy cloud services.

Visit [cloudtools.bluemix.net](http://cloudtools.bluemix.net/) to learn more about this free macOS app.

# Docker

We provide a pre-built Docker image containing the latest release of Kitura.  Follow these steps to try it out.

1. Install [Docker](https://www.docker.com/products/docker) on your development system.

2. Pull down the [kitura-ubuntu](https://hub.docker.com/r/ibmcom/kitura-ubuntu/) image from Docker Hub:

    `$ docker pull ibmcom/kitura-ubuntu:latest`

3. Create a Docker container using the `kitura-ubuntu` image you just downloaded and forward port 8090 on host to the container:

    `$ docker run -i -p 8090:8090 -t ibmcom/kitura-ubuntu:latest /bin/bash`

4. From within the Docker container, execute the `clone_build_kitura.sh` script to build the [Kitura-Starter](https://github.com/IBM-Bluemix/Kitura-Starter) sample project:

    `# /root/clone_build_kitura.sh`

    The last line should be:

    `>> Build for Kitura-Starter completed (see above for results).`

5. You can now run the Kitura-Starter executable inside the Docker container:

    `# /root/start_kitura_sample.sh`

    You should see an output message that contains the string `Listening on port 8090`.

6. Visit `http://localhost:8090/` in your web browser.

