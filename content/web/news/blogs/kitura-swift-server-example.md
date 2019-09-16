---
title: "Kitura Sample: A Swift Server example demonstrating the features of Kitura."
blurb: We have rewritten the Kitura Sample demo application to better showcase the capabilities of Kitura
date: "2018-10-02"
author: Andrew Lees
path: /blogs/kitura-swift-server-example
---

We have rewritten the Kitura Sample demo application to better showcase the capabilities of Kitura. This update adds interactive webpages so you can try out the features live. You can also easily view the code for each feature by clicking on the embedded links.

Furthermore, we have added new demos for popular features such as databases, sessions and authentication. Altogether, these changes produce an example app which is a great resource for learning to develop using Kitura.

##Swift Server example

Our sample server shows off the following features available in Kitura:

- Hello World example with Raw routing
- Building REST APIs with Codable routing
- Persisting objects to a session store using Kitura-Session
- Rendering HTML web pages from Markdown and Stencil templates
- HTTP Basic authentication with Kitura-Credentials
- OAuth2 authentication with AppID, Facebook and Google

---

##Running Kitura Sample

To start the Swift server example locally, follow the steps below:

1. Open your terminal window

2. Clone the Kitura Sample project:
```
git clone https://github.com/IBM-Swift/Kitura-Sample.git
```

3. Move into the Kitura-Sample directory:
```
cd Kitura-Sample
```

4. Run the example server and wait while the code compiles:
```
swift run
```

5. Open your browser at http://localhost:8080.

You should see the Kitura-Sample website being run by the server.

---

##Interacting with the app

You can access all the Kitura-Sample demos via the menu on the left hand side. The inner page will provide you with a demonstration description, any further set-up required, and the method of interacting with the server. We then encourage you to view the relevant code on Github or within your local Kitura-Sample project. This sample also includes example tests for the routes and has used Kitura-OpenAPI to auto-generate an OpenAPI (AKA Swagger) file as well as an OpenAPI user interface.

We hope you enjoy trying out our new Swift server example and it helps you to understand and use the features of Kitura. If you have any questions or comments, Please join the vibrant Kitura community on Slack!