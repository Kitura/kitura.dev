---
title: Write powerful web apps with Kitura templating
blurb: Kitura 2.4 introduces a new type-safe API for rendering Codable structures
date: "2018-05-31"
author: David Dunn
path: /blogs/type-safe-templating
---

Kitura has provided support for rendering templated content ever since version 1.0 but now Kitura 2.4 introduces a new type-safe API for rendering Codable structures.

##What is it?

With the release of Kitura 2.4 you can now use Codable structs to render content using templating.

##How do I get started?

Kitura supports multiple template engines:

- Kitura-Stencil
- Kitura-Mustache
- Kitura-Markdown

To use type-safe templating all you need to do is add Kitura (at 2.4 or later) and one of the above template engines to your Package.swift, like so:

```
.package(url: "http://github.com/IBM-Swift/Kitura", from: "2.4.0"),
.package(url: "http://github.com/IBM-Swift/Kitura-StencilTemplateEngine", from: "1.0.0")
```

##How do I use it?

When you've added Kitura and a template engine to your project you can start rendering your template files with Codable structs. Here is a quick example of that using the popular Stencil templating engine.

All we need to do is create a stencil template file, I called mine `MyStencil.stencil`, and then populate that file with the following:

```
{% if friends %}
    {% for friend in friends %}
        {{friend.firstName}} {{friend.lastName}}
    {% endfor %}
{% else %}
    You have no friends! :(
{% endif %}
```

Next we need to create our Codable struct:

```swift
struct Friend: Codable {
    let firstName: String
    let lastName: String
}
```

Then create an instance of this struct:

```swift
let friends = [Friend(firstName: "Jack", lastName: "Sparrow"), Friend(firstName: "Captain", lastName: "America")]
```

And now we can render the Stencil template file using the friends value:

```swift
router.get("/friends") { request, response, next in
    try response.render("MyStencil.stencil", with: friends, forKey: "friends")
    next()
}
```

The 'forKey' parameter is a new addition to the rendering methods, this allows you to provide the variable name from your template file that this particular struct will populate.

---

##Next Steps

Because the only requirement is that the struct you want to render is Codable, type-safe templating integrates easily with our [Swift-Kuery-ORM](https://github.com/IBM-Swift/Swift-Kuery-ORM). When you call Model.findAll() to retrieve data from your database you can pass the results straight through to your rendering code with type-safety from end to end.

---

##Credits

I'd like to thank Steven Van Impe from the Kitura community for his assistance with the development of this new API. Steven provided valuable help with the design and testing of the feature and I'm very grateful for his support.
