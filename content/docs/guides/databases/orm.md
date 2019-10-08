---
path: "/docs/databases/orm"
title: Swift Kuery ORM
---

#Swift Kuery ORM

[Swift-Kuery-ORM](https://github.com/IBM-Swift/Swift-Kuery-ORM) is an ORM (Object Relational Mapping) library for Swift built on top of [Swift Kuery](https://github.com/IBM-Swift/Swift-Kuery), using it allows you to simplify the persistence of model objects with your server.

In this guide we will show you how to save and retrieve a `Codable` Swift model from a database (in this case PostgreSQL) using the ORM.

This guide uses the ORM with [codable routes](../routing/codable-routing), however, the ORM also works with Kitura's [raw routing](../routing/raw-routing).

> Support for nested `Codable` types (models, structs, arrays etc.) is not currently available in the ORM. Support for simple nesting will be added prior to releasing V1.0, more complex nesting will be added for V2.0.

---

##Step 1: Define the ORM routes

We are going to create a new file in our project for the ORM routes.

> If you don't have a server, follow our [Create a server](../getting-started/create-server-cli) guide.

Open your `Application.swift` file:

```
open Sources/Application/Application.swift
```

Inside the `postInit()` function add:

```swift
initializeORMRoutes(app: self)
```

Create a new file called `ORMRoutes.swift` to define the ORM routes in:

```
touch Sources/Application/Routes/ORMRoutes.swift
```

Open the `ORMRoutes.swift` file:

```
open Sources/Application/Routes/ORMRoutes.swift
```

Inside this file we will add the code for our ORM routes:

```swift
import KituraContracts

func initializeORMRoutes(app: App) {
    // Connect to database here
    app.router.post("/orm", handler: app.saveHandler)
    app.router.get("/orm", handler: app.findAllHandler)
    app.router.get("/orm", handler: app.findOneHandler)
}
extension App {
    func saveHandler(book: Book, completion: (Book?, RequestError?) -> Void) {
        // Save book here
    }

    func findAllHandler(completion: ([Book]?, RequestError?) -> Void) {
        // Get all books here
    }

    func findOneHandler(id: Int, completion: (Book?, RequestError?) -> Void) {
        // Get one book here
    }
}
```

We have defined three routes on the "/orm" endpoint. One to handle POST requests, one to handle GET requests with an identifier and one to handle GET requests without an identifier.

The routes in this guide are using the [Book model from the routing guide](../routing/what-is-routing#bookmodel), however you could use any Codable type.

---

##Step 2: Add the ORM to the project's dependencies

> You can use any of the other database plugins supported by [Swift-Kuery](https://github.com/IBM-Swift/Swift-Kuery), however, the rest of this guide is written to work with the [Swift-Kuery-PostgreSQL](https://github.com/IBM-Swift/Swift-Kuery-PostgreSQL#add-dependencies) plugin.

To use the ORM, we need to [add Swift-Kuery-ORM](https://github.com/IBM-Swift/Swift-Kuery-ORM#update-your-packageswift-file) and add [Swift-Kuery-PostgreSQL](https://github.com/IBM-Swift/Swift-Kuery-PostgreSQL#add-dependencies) to your dependencies.

Next, we import the ORM library and our chosen plugin to the project:

```swift
import SwiftKueryORM
import SwiftKueryPostgreSQL
```

---

##Step 3: Update our Model

The key component of the ORM is the `Model` protocol which extends what `Codable` provides. In order to use the ORM, we need to make `Book` conform to the `Model` protocol.

We do this using an extension beneath our import statements:

```swift
extension Book: Model { }
```

Now that your `Book` struct conforms to `Model`, after you have set up your database connection pool and created a database table, you automatically have access to a slew of convenience functions for your object.

---

##Step 4: Create a database connection

###Install the PostgreSQL client

To use Swift-Kuery-PostgreSQL you need to have the appropriate PostgreSQL C-language client installed.

####macOS

On macOS we can use Homebrew to install Postgres:

```
brew install postgresql
```

####Linux

On Linux we can use `apt` to install PostgreSQL:

```
sudo apt install postgresql postgresql-contrib
```

Linux requires that you [create a PostgreSQL user](http://postgresguide.com/setup/users.html).

###Create a PostgreSQL database

Now that we have PostgreSQL installed we can create a database:

```
createdb bookdb
```

Now we're ready to connect to our database from our Kitura server.

###Create a PostgreSQL connection pool

Inside `initializeORMRoutes`, create a PostgreSQL connection pool:

```swift
let pool = PostgreSQLConnection.createPool(host: "localhost", port: 5432, options: [.databaseName("bookdb")], poolOptions: ConnectionPoolOptions(initialCapacity: 10, maxCapacity: 50))
Database.default = Database(pool)
```

>If you are on Linux, you must provide your username and password in the options for `PostgreSQLConnection.createPool()`.

###Create a Book table

Inside `initializeORMRoutes`, create a table in the SQL database that represents our `Book` model:

```swift
do {
    try Book.createTableSync()
} catch {
    print("Failed to create table: \(error)")
}
```

To check that a database table called Book has been created, run your Kitura server and then use psql from the command-line as follows:

```
psql bookdb
SELECT * FROM "Book";
```

This should print the column names of the Book table with no data (i.e. no rows).

---

##Step 5: Save an object to the database

Now if we want to save a new `Book` object to our database we use the `save()` method.

In our handler for the `POST` route we add the following:

```swift
book.save(completion)
```

Because we are passing our `completion` closure to an asynchronous function, we need to make `completion` escaping:

```swift
completion: @escaping (Book?, RequestError?)
```

The POST handler should look similar to this:

```swift
func saveHandler(book: Book, completion: @escaping (Book?, RequestError?) -> Void) {
    book.save(completion)
}
```

That's all we need to do, with that one line of code any book data posted to the `/orm` endpoint will be stored in the Book table in our database.

Next we will show how easy it is to retrieve our book data from the database.

---

##Step 6: Retrieve all the books from the database

Next we will retrieve all the data from the book table in our database, to do this we use the `findAll` method.

The `findAll` method returns an array containing all the books.

In our `findAllHandler` add the following code:

```swift
Book.findAll(completion)
```

As with the `saveHandler`, again we must make the `completion` escaping:

```swift
completion: @escaping ([Book]?, RequestError?)
```

The `GET` handler should look similar to this:

```swift
func findAllHandler(completion: @escaping ([Book]?, RequestError?) -> Void) {
    Book.findAll(completion)
}
```

Now that we have defined both a `POST` and a `GET` route we can test saving and retrieving a book from the database using curl.

> Kitura has support for [OpenAPI](https://www.openapis.org) which makes testing Codable routes easy and provides a UI for testing.
> You can add OpenAPI to your server using our [OpenAPI guide](../routing/kitura-openapi).

Firstly we need to start our Kitura server.

In the terminal use curl to post a book to our endpoint:

```
curl -X POST \
      http://localhost:8080/orm \
      -H 'content-type: application/json' \
      -d '{
        "id": 0,
        "title": "A Game of Thrones",
        "price": 14.99,
        "genre": "Fantasy"
    }'
```

You should see the following output:

```
{"id": 0,"title":"A Game of Thrones","price":14.99,"genre":"Fantasy"}
```

Next we will retrieve our book data.

Open your browser at:

http://localhost:8080/orm

This will make a get request to the server and you should see the book we posted before:

```
[{"id": 0,"title":"A Game of Thrones","price":14.99,"genre":"Fantasy"}]
```

Now you can restart your Kitura server and the book data will persist in the database. This is one of the many advantages of using a database.

---

##Step 7: Retrieve a single book from the database

If we want to retrieve a single book from our database, we use the `find(id:)` method.

This will return a single object with the provided `id`.

In our `findOneHandler` add the following code:

```swift
Book.find(id: id, completion)
```

As with our previous handler, we must make the `completion` escaping:

```swift
completion: @escaping (Book?, RequestError?)
```

The `GET` one handler should look similar to this:

```swift
func findOneHandler(id: Int, completion: @escaping (Book?, RequestError?) -> Void) {
    Book.find(id: id, completion)
}
```

Test this out by opening your browser at:

http://localhost:8080/orm/0

This will make a get request to the server for a book with an `id` of 0, so it should return the book we posted previously.

Your completed routes file, `ORMRoutes.swift`, should look as follows:

```swift
import KituraContracts
import SwiftKueryORM
import SwiftKueryPostgreSQL

extension Book: Model { }
func initializeORMRoutes(app: App) {
    let pool = PostgreSQLConnection.createPool(host: "localhost", port: 5432, options: [.databaseName("bookdb")], poolOptions: ConnectionPoolOptions(initialCapacity: 10, maxCapacity: 50))
    Database.default = Database(pool)
    do {
        try Book.createTableSync()
    } catch {
        print("Failed to create table: \(error)")
    }
    app.router.post("/orm", handler: app.saveHandler)
    app.router.get("/orm", handler: app.findAllHandler)
    app.router.get("/orm", handler: app.findOneHandler)
}
extension App {
    func saveHandler(book: Book, completion: @escaping (Book?, RequestError?) -> Void) {
        book.save(completion)
    }

    func findAllHandler(completion: @escaping ([Book]?, RequestError?) -> Void) {
        Book.findAll(completion)
    }

    func findOneHandler(id: Int, completion: @escaping (Book?, RequestError?) -> Void) {
        Book.find(id: id, completion)
    }
}
```

---

##Next steps

[Sessions](../sessions/what-are-sessions): Learn about sessions and why you might want to use them.
