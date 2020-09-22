---
path: "/docs/web/what-is-templating"
title: What are Web Applications?
---

#What are Web Applications?

A web application is a client-server program, which the client runs in a web browser. The server processes incoming requests and determines what should be returned to the user. The client browser then renders the response, which is usually HTML, CSS and JavaScript, to present the information in a human readable format.

Kitura supports being used as the server for a web application, and provides the following features:

> Since web applications are a non-RESTful API, we will need Raw routing to use these features.

---

##Serving static files

If you want to provide a file to the user that will not change based on the state of the server, you can use Kitura's built-in static file server middleware. This will return the file that is stored at the requested URL. This is useful for providing images, CSS files, JavaScript files, or a static HTML webpage.

##Templating

Templating is the process of creating template files that are reusable and populated at runtime using a Template Engine with values determined by your application logic.

Template files are files that contain placeholder values, such as:

```
{{ yourVariableName }}
```

It is these placeholder values that are replaced by the Template Engine.

A Template Engine executes the actual replacement of the variables within the template file. A template engine also transforms the template file into an HTML file which is then sent to the client. Template engines support more than just simply replacing values, they can also handle looping and conditional logic such as for loops and if statements. This makes template engines a good choice for creating HTML files.

A simple example of this is imagine you're creating a website. This website could have 5, 10, 15 or more pages but some things are consistent across these pages. Typically you may want to keep the header and footer the same across all pages but writing out code for the header and footer for each of these pages would be tedious. What happens if you need to change something in the header you would need to change this on every page of your website. Templating provides a simple solution to this problem. You can create a template file that contains the code for your header and footer but the main content section is determined at runtime using the template engine. An example of this template file using Stencil could look as follows:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>An Example of Templating</title>
  </head>
  <body>
    <header>
      <h1>Name</h1>
      <nav>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </nav>
    </header>

    <main>

      {% block content %}{% endblock %}

    </main>

    <footer>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
      <nav>
        <li>Link1</li>
        <li>Link2</li>
        <li>Link3</li>
      </nav>
    </footer>
  </body>
</html>
```

You could reuse this template file to generate every page on your website, but the code for your header and footer would be in a single location. This is a simple example but it illustrates how powerful templating can be when creating web applications.

Here is a list of Template Engines Kitura works with:

- [Stencil](https://github.com/stencilproject/Stencil) using the [Kitura-StencilTemplateEngine](https://github.com/Kitura/Kitura-StencilTemplateEngine) plugin.

- [Markdown](https://daringfireball.net/projects/markdown/) using the [Kitura-Markdown](https://github.com/Kitura/Kitura-Markdown) plugin.

##Next steps

[StaticFileServer](./static-file-server): Learn how to serve static files from a Kitura server.

[Stencil](./stencil): Learn how to add Stencil templating to your Kitura application.

[Markdown](./markdown): Learn how to add Markdown templating to your Kitura application.
