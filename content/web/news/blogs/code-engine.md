---
title: Kitura on Code Engine
blurb: Deploying Kitura on IBM Code Engine (Beta)
date: "2020-09-26"
author: Mathieu Barnachon
path: "/blogs/code-engine"
---

# Kitura on Code Engine

## Introduction

IBM recently opens in beta the new [Code Engine](https://cloud.ibm.com/codeengine/overview).
It is a new serverless approach, based on Kubernetes,
that runs docker images, or even build your own code,
to run on the cloud.
It takes seconds, according to the docs,
and not more than minutes, according to my tests, to go live!

> Today, we are gonna to launch this blog post, with Kitura, hosted on the Code Engine!

Keep in mind, that the service is still in beta, and is not (yet) ready for production.
If you were not convinced by the warning,
after 7 days, your engine will be removed completely (thanks to the beta mode!).
Is it then too early to try it? No!

## Kitura

The first step will be to create a very simple Kitura server,
to serve our Markdown content.

Kitura recently move from an IBM-hosted project, to a community driven project.
You can see the announcement [here](http://www.kitura.dev/blogs/announcing-kitura-community).
If you want to build something more complex or that suits more your needs,
have a look at the Kitura [documentation](https://www.kitura.dev).
If you already have a Kitura application (or another...),
you can skip directly to the Host secion.

The first step is to create the Kitura server:

```bash
mkdir blog
cd blog
swift package init --type=executable
```

This creates a barebone skeleton of a Swift application.
If you were to type:

```bash
swift run
```

The result would be: `Hello, world!`.
Enjoy! It means your Swift environment is setup properly!

Now, let's add Kitura to it!

Add the following line to your `Package.swift`

```swift
.package(url: "https://github.com/Kitura/Kitura", from: "2.9.1")
```

and don't forget to add Kitura as a dependency of the `blog` target.
Run your code again: nothing is changing in the result, but a few packages are downloaded!

## Serve page(s)

Kitura is now fully added to your application, and ready to be used.
Open the `main.swift` file, and replace its content by the simplest serving endpoint.

```swift 
import Kitura

let router = Router()

router.get("/") { request, response, next in
    response.send("Hello world!")
    next()
}

Kitura.addHTTPServer(onPort: 8080, with: router)
Kitura.run()
```

Re-run the code. Your server is up and running, and waiting for requests.

Open another terminal, and query your endpoint:

```bash
curl localhost:8080
```

You should see the usual `Hello, world`, but this time served through a request!
What an achievement for so few lines.
From here on, feel free to play a bit with Kitura and add new routes if needed!
(Again, the new documentation is [here](https://www.kitura.dev))

## Markdown

We are serving this markdown document.
There is a lot of option, but
Kitura comes with a complete engine for that.
In order to serve Markdown into HTML, Kitura needs to use the Kitura-Markdown package.
Add the dependency in your `Package.swift` and in the target.

```swift
.package(name: "KituraMarkdown", url: "https://github.com/Kitura/Kitura-Markdown", from: "1.1.2")
```

Here we specify the name of the package, as it is problematic with the latest version of Swift.

Now, create a `Views` folder on the top level directory, and add your Markdown file inside.

Go to the `main.swift` file, and add a new route to server your new blog entry:

```swift
router.get("/code-engine") { request, response, next in
    try response.render("code-engine.md", context: [:])
    response.status(.OK)
    next()
}
```

Restart your server, and hit `http://localhost:8080/code-engine` from your favorite browser.
You should see your blog post fully served in HTML!

> If you want, you could also serve the article into the root endpoint.

Add some customization to your page if you want, like syntax highliting and/or font/colors!

## Host

Let do the fun part: hosting on Code Engine.
I will skip all the steps to create an IBM Cloud account, there is already many good tutorial, and it is quite simple.
The whole tutorial is eligible to the free tier, so you shouldn't have to pay to try it!

I will use the CLI quite often, as it makes it easier to follow I think.
If you haven't installed the IBM Cloud CLI, you can do it [now](https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli),
and install the [Code Engine plugin](https://cloud.ibm.com/codeengine/cli).
I will move directly to the core part.

> Currently, Code Engine is only working on the US-South region.
> Make sure your environment is set properly before continuing:

```bash
ibmcloud target -r us-south
```

> You also need to be sure, that the Organization, Space and Resource group are set (or at least that you have one).

When using Code Engine, you have 2 options: a Docker image or running from the source code.
Both use the same initial configuration that we will detailled here.

For the Code Engine to work, we need a project to host it.
This can be create with the CLI easily:

```bash
ibmcloud ce project create --name blog-ce
ibmcloud ce project select --name blog-ce
```

If `select` is failing, it is because the project is not yet ready.
You can confirm its status by hitting:

```bash
ibmcloud ce project get --name blog-ce
```

### Docker image

#### Make the image
That's the easiest method: host an image somewhere and run it through Code Engine.
For Kitura, there is a 2 stages Docker process, that can be generated by the Kitura CLI if you use it.
Otherwise, the Docker files are that simple:

The `Dockerfile-tools`:
It is used to compile the code, with the compilation dependency in a bigger environment.

```
FROM swift:5.3
LABEL maintainer="M. Barnachon"
LABEL Description="Dockerfile for the Blog Code Engine builder."

# We can replace this port with what the user wants
EXPOSE 8080

# Default user if not provided
ARG bx_dev_user=root
ARG bx_dev_userid=1000

# Include base Kitura dependencies
RUN apt-get update && apt-get install -y sudo libssl-dev libcurl4-openssl-dev locales locales-all libz-dev && apt-get clean

# Add utils files
ADD https://raw.githubusercontent.com/IBM-Swift/swift-ubuntu-docker/master/utils/tools-utils.sh /swift-utils/tools-utils.sh
ADD https://raw.githubusercontent.com/IBM-Swift/swift-ubuntu-docker/master/utils/common-utils.sh /swift-utils/common-utils.sh
RUN chmod -R 755 /swift-utils

# Create user if not root
RUN if [ "$bx_dev_user" != root ]; then useradd -ms /bin/bash -u $bx_dev_userid $bx_dev_user; fi

# Bundle application source & binaries
COPY . /swift-project
```

The `Dockerfile`:
It is used to run your server in production mode.

```
FROM swift:5.3-slim
LABEL maintainer="M. Barnachon"
LABEL Description="Dockerfile for the Blog Code Engine server."

# We can replace this port with what the user wants
EXPOSE 8080

# Default user if not provided
ARG bx_dev_user=root
ARG bx_dev_userid=1000

# Add utils files
ADD https://raw.githubusercontent.com/IBM-Swift/swift-ubuntu-docker/master/utils/run-utils.sh /swift-utils/run-utils.sh
ADD https://raw.githubusercontent.com/IBM-Swift/swift-ubuntu-docker/master/utils/common-utils.sh /swift-utils/common-utils.sh
RUN chmod -R 755 /swift-utils

# Create user if not root
RUN if [ $bx_dev_user != "root" ]; then useradd -ms /bin/bash -u $bx_dev_userid $bx_dev_user; fi

# Bundle application source & binaries
COPY . /swift-project

# Command to start Swift application
CMD [ "sh", "-c", "cd /swift-project && .build-ubuntu/release/blog-ce" ]
```

Then, copy, build and run like that:

```bash
docker build -t blog-ce-build -f Dockerfile-tools .
docker run -v $PWD:/swift-project -w /swift-project blog-ce-build /swift-utils/tools-utils.sh build release
docker build -t blog-ce-run --squash -f Dockerfile .
```

Once your server image is build, you can host it on Docker Hub or the IBM registry.
Here, we will be using the IBM cloud registry, as there is a free tier.

```bash
ibmcloud cr login
ibmcloud cr namespace-add blog
docker tag blog-ce-run:latest blog-ce:0.0.1
docker tag blog-ce:0.0.1 us.icr.io/blog/blog-ce:0.0.1
docker push us.icr.io/blog/blog-ce:0.0.1
```

1. We log on the Container registry.
2. We create a new namespace on the Container registry.
3. We tag the image with the running name.
4. We tag the image to be pushed on the Container registry.
5. We push the image on the registry.


#### Accessing the private registry

In that example, we are using a private registry.
You then need to grant access to that registry within Code Engine.

```bash
ibmcloud iam api-key-create cliapikey -d "My CLI API key" --file key_file
ibmcloud ce registry create --name blog --server us.icr.io --username iamapikey --password-from-file key_file
```

1. Creates an IAM API key to use with the Command Line Interface.
2. Grant Code Engine the access to the Container registry.
	Don't forget to set the password into a file named `key_file`.
	This step tends to fail for various reasons. In that case, go through the web UI, and add the registry manually when creating the application.

> The file `key_file, if used, should be excluded from the next Docker image creation!


#### Create the application

You are now ready to deploy your application.
Still using the command line (if the step 2 did succeed for you),
create a new application running your Kitura image:

```bash
ibmcloud ce application create --name blog --image us.icr.io/blog:0.0.1
```

Monitor the status of your application with:

```bash
ibmcloud ce application list
```

Once it is running, you can query the URL with the detail access to the application:

```bash
ibmcloud ce application get -n blog
```

and point your browser to it!
Don't forget to add the endpoint, if you have one, like `/code-engine`.

Congratulation! Your new blog is online!

## Conclusion

It was easy to host a simple page, using Kitura and IBM Code Engine.
Keep in mind that this is still in beta phase, and it can break anytime.
I actually re-try multiple times some commands, as they seems to failed for no obvious reason.
My go-to to fix it, was to remove completely the Code Engine project and redo all the steps.
Sometimes also, the command line is failing, but the web UI does work.
Alternating the two, usually, allow me to succeed.

We haven't detailed the build approach through Code Engine, as it involves solving the double Docker file approach.

The source code (with extra adjustment) can be found [here](https://github.com/mbarnach/blog-ce).

I hope you've enjoyed that post, and feel free to play more with Kitura!

Mathieu