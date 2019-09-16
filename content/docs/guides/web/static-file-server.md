---
path: "/docs/web/static-file-server"
title: Serving static files in Kitura
---

#Serving static files in Kitura

In a web application, we will require resources such as images, HTML files, CSS files, and JavaScript files. These are static files, as they can be delivered to the user without needing to be modified, or generated and can be provided to the user with Kitura's built-in StaticFileServer middleware. This guide will show you how to configure and register a static file server on your Kitura server.

> If you don't have a Kitura server, follow our Create a server guide.

---

##Step 1: Create a directory for our files

The first thing we are going to need is a static file to serve. By default the static file server looks in the "public" directory, so let's create that now.

From the root directory of your project, where Package.swift is located, create the public directory:

```
mkdir public
```

Change into the directory:

```
cd public
```

Create a new file called hello.html:

```
touch hello.html
```

Open this file in your preferred text editor (we will use Xcode):

```
open hello.html -a Xcode.app
```

Inside this file, add the following text:

```html
<!DOCTYPE html>
<html>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
```

In this example, we will serve an HTML file, however, this could be any file type.

> If you are using Xcode and used the command line to create your public directory you will need to regenerate your Xcode project:
> ```
> swift package generate-xcodeproj
> ```
> This is to enable Xcode to detect the new directory.

---

##Step 2: Register a static file server on our router

The StaticFileServer middleware is built into Kitura. To use it we just need register it on our router.

Open your Application.swift file in your default text editor (or Xcode if you prefer):

```
open Sources/Application/Application.swift
```

Inside the postInit() function add:

```swift
router.all("/public", middleware: StaticFileServer())
```

That's it! Now, we will serve any files from the project's public directory (since this is the default path) from the /public route on our server.

We are using public for both the route and directory, however these could be set to anything.

For example, if you wanted to serve files from the assets folder from the '/internal' route, you could use the following code:

```swift
router.all("/internal", middleware: StaticFileServer(path: "./assets"))
```

---

##Step 3: Test serving a static file

To test our static file server, we can view the HTML file we created earlier.

We do this by running our server, then opening our browser at:

localhost:8080/public/hello.html

We should see our HTML document with the "Hello World!" message.

The StaticFileServer also loads files from subdirectories of the project's public directory, so all we need to do is place a file into a subdirectory e.g. ./public/images/picture.png and it will be served at http://localhost:8080/public/images/picture.png.

---