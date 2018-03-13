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

<div class="titleBlock">
	<h1>Deploying to the Cloud</h1>
	<p>Kitura is built to be Cloud-ready.</p>
</div>

We provide a simple starter project that demonstrates deployment to [IBM Cloud](https://www.bluemix.net).

Additionally, you can use our pre-built Docker image to guide you on how to deploy a container-based Kitura application.

---

## Specify a version of Swift (optional, but extremely recommended)

 Pushing your application to IBM Cloud will build your application using the latest Swift version supported by the [buildpack](https://github.com/IBM-Swift/swift-buildpack/releases), which changes periodically.  Adding a `.swift-version` to your application is a common convention to specify the version of Swift needed for your application.

---
<span class="arrow">&#8227;</span> Add a `.swift-version` file with the desired version or snapshot of Swift

```bash
echo "4.0.3" > .swift-version
```

---

## Kitura-Starter

[Kitura-Starter](https://github.com/IBM-Bluemix/Kitura-Starter) is a Kitura based server application that you can use as a starting point to get your own Kitura application up and running on IBM Cloud. After cloning this GitHub repo to your local system, you can deploy this application to IBM Cloud right away.

Once you have the IBM Cloud [command line tool](http://clis.ng.bluemix.net/ui/home.html) installed, deploying to the cloud is as simple as `bx app push`.

---

## Docker

We provide a pre-built Docker image containing the latest release of Kitura.  Follow these steps to try it out.

<span class="arrow">&#8227;</span> Install [Docker](https://www.docker.com/products/docker) on your development system.

<span class="arrow">&#8227;</span> Pull down the [kitura-ubuntu](https://hub.docker.com/r/ibmcom/kitura-ubuntu/) image from Docker Hub:

```
$ docker pull ibmcom/kitura-ubuntu:latest
```

<span class="arrow">&#8227;</span> Create a Docker container to build and run the `kitura-ubuntu` image you just downloaded and forward port 8080 on host to the container:

```
$ docker run -i -p 8080:8080 -t ibmcom/kitura-ubuntu:latest
```

You should see an output message similar to the following:

```
[2017-04-03T18:22:47.146Z] [INFO] [main.swift:28 Kitura_Starter] Server will be started on 'http://localhost:8080'.
[2017-04-03T18:22:47.222Z] [INFO] [HTTPServer.swift:104 listen(on:)] Listening on port 8080
```

<span class="arrow">&#8227;</span> Visit `http://localhost:8080/` in your web browser.

[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png
