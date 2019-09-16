---
title: "Kitura-Session 3.3: Sharing Codable objects between a user’s requests"
blurb: This blog will describe Kitura-Session’s new capabilities and provide an example of using sessions with a Kitura server
date: "2018-12-18"
author: Andrew Lees
path: /blogs/codable-kitura-session
---

Web application servers are generally “stateless” and handle HTTP requests independently. However, it’s common for a developer to want to link requests from the same user together in a session. A simple way to achieve this is by using a cookie to identify the user and associating data to that cookie. Kitura-Session allows you to implement this flow and, as of version 3.3, you can now directly store and retrieve Codable objects. This blog will describe Kitura-Session’s new capabilities and provide an example of using sessions with a Kitura server.

##Codable Kitura-Session

Previously, if you wanted to save something in a Raw routing session, you would store it as an Any. This is not type safe since you could try and save objects the would fail to be serialized as JSON. Furthermore, when you retrieve the item you have to cast it to the type you expect. With the 3.3 release of Kitura-Session, you can store and retrieve Codable objects adding type safety and removing the need for explicit casting. To demonstrate how this improves usability, we will apply these changes to the sessions example from Kitura-Sample:

###An online Bookstore

This example simulates a website where users buy books. The user doesn’t want to have to select all their book at once so they add the book they are interested in to their shopping cart. This cart is shared between requests until the checkout. In server terms, the cart is our session, where we store the users selected Book models.

```swift
public struct Book: Codable {
    var name: String
    var author: String
    var rating: Int  
}
```

###Adding a book to the shopping cart

The user wants to add a book to their cart. They do this by sending a POST request with the book’s data to the server. The server receives the request, uses cookies to identify the user and adds the book to their session.

In Kitura-Session 3.2 this would be done as follows:

```swift
router.post("/session") { request, response, next in
    let inputBook = try request.read(as: Book.self)
    var books = request.session?["books"] as? [[String: String]] ?? []
    let newBook: [String: String] = ["name": inputBook.name, "author": inputBook.author, "rating": String(inputBook.rating)]
    books.append(newBook)
    session["books"] = books
    response.send(inputBook)
    next()
}
```

In Kitura-Session 3.3, we can pass the book from the request body straight into the session:

```swift
router.post("/session") { request, response, next in
    let inputBook = try request.read(as: Book.self)
    var books: [Book] = request.session?["books"] ?? []
    books.append(inputBook)
    session["books"] = books
    response.send(inputBook)
    next()
}
```

This has removed the need to convert our model into a JSON dictionary, saving us from clunky boilerplate code.

###Viewing your shopping cart

Once the user has added a few books to their cart, they want to view all their books. The do this by sending a GET request to the server. Cookies identify the user again and all the books they previously saved in the session are returned to them.

In Kitura-Session 3.2 this would be done as follows:

```swift
router.get("/session") { request, response, next in
    let bookData = request.session?["books"] as? [[String: String]] ?? []
    var books: [Book] = []
    for book in bookData {
        guard let bookName = book["name"],
              let bookAuthor = book["author"],
              let ratingString = book["rating"],
              let bookRating = Int(ratingString)
        else { continue }
        let newBook = Book(name: bookName, author: bookAuthor, rating: bookRating)
        books.append(newBook)
    }
    response.send(books)
    next()
}
```

In Kitura-Session 3.3, by defining the type we expect from the session, we get our Codable model straight out of the session:

```swift
router.get("/session") { request, response, next in
    let books: [Book] = request.session?["books"] ?? []
    response.send(books)
    next()
}
```

Even with a simple model, this has vastly reduced the amount of code required, added compile time safety and made our code easier to read!

