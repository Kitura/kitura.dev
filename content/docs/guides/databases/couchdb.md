---
path: "/docs/databases/couchdb"
title: Kitura CouchDB
---

#Kitura CouchDB

[CouchDB](https://couchdb.apache.org) is a NoSQL (or non-relational) database which takes a document-oriented approach to data storage.

[Kitura-CouchDB](https://github.com/IBM-Swift/Kitura-CouchDB) is a pure Swift client which allows Kitura applications to interact with a CouchDB or [Cloudant](https://www.ibm.com/uk-en/cloud/cloudant) database.

In this guide we’ll demonstrate how to create a CouchDB database, define a CouchDB document, save the document to the database and finally retrieve the document from the database.

---

##Step 1: Install CouchDB and create a database

Before we can use CouchDB within our server we first need to:

* [Download and install CouchDB](https://couchdb.apache.org/#download).
* Set up an admin username and password in CouchDB.
* Create a database. (In this example we're using the name `bookstore`.)

> It is important to remember the database name and credentials, as we will need them later on in the guide.

---

##Step 2: Add CouchDB to your project

To use CouchDB from a server, we need to [add Kitura-CouchDB to our dependencies](https://github.com/IBM-Swift/Kitura-CouchDB#add-dependencies).

> If you don't have a server, follow our [Create a server](../getting-started/create-server-cli) guide.

---

##Step 3: Define the CouchDB routes

Next, we are going to create a file in our project for the CouchDB routes.

Open your `Application.swift` file:

```
open Sources/Application/Application.swift
```

Inside the `postInit()` function add:

```swift
initializeCouchRoutes(app: self)
```

Create a new file, called `CouchRoutes.swift`:

```
touch Sources/Application/Routes/CouchRoutes.swift
```

Open your `CouchRoutes.swift` file:

```
open Sources/Application/Routes/CouchRoutes.swift
```

Inside our file, we will define two routes. In the first route, we will retrieve a book from the user and save it into the bookstore database. In the second route, we will retrieve all of the documents that have been saved to the database.

```swift
import KituraContracts
import CouchDB
import LoggerAPI

func initializeCouchRoutes(app: App) {
    app.router.post("/couch", handler: app.couchSaveHandler)
    app.router.get("/couch", handler: app.couchFindAllHandler)
}
extension App {
    // Define ConnectionProperties and CouchDBClient here

    func couchSaveHandler(book: BookDocument, completion: @escaping (BookDocument?, RequestError?) -> Void) {
        // Save book here
    }

    func couchFindAllHandler(completion: @escaping ([BookDocument]?, RequestError?) -> Void) {
        // Get all books here
    }
}
```

---

##Step 4: Define a Document

CouchDB is a NoSQL database for storing documents. A `Document` is any structure that can be represented as JSON and contains `_id` and `_rev` fields.

- The `id` field is the unique identifier for the document.
- The `_rev` field is the revision of the document. It is returned when you make requests and is used to prevent conflicts from multiple users updating the same document.

To define a CouchDB document, all we need to do is create a Swift object and make it conform to the `Document` protocol.

Create a new file, called `BookDocument.swift`:

```
touch Sources/Application/Models/BookDocument.swift
```

Open your `BookDocument.swift` file:

```
open Sources/Application/Models/BookDocument.swift
```

Inside this file, define your `BookDocument`:

```swift
import CouchDB

struct BookDocument: Document {
    let _id: String?
    var _rev: String?
    let title: String
    let price: Double
    let genre: String
}
```

---

##Step 5: Connect to CouchDB database

Inside our App extension, we will define our connection properties for CouchDB, substituting in the credentials we defined earlier for the admin username and password:

```swift
static let properties = ConnectionProperties(
        host: "127.0.0.1",              // http address
        port: 5984,                     // http port
        secured: false,                 // https or http
        username: "<CouchDB-username>", // admin username
        password: "<CouchDB-password>"  // admin password
)
```

Now we can use these connection properties to create our CouchDB client:

```swift
static let couchDBClient = CouchDBClient(connectionProperties: properties)
```

The `CouchDBClient` represents a connection to a CouchDB server. It is initialized with your `ConnectionProperties` and handles the creation, retrieval and deletion of CouchDB databases.

---

##Step 6: Save our document to the database

We are going to modify the `couchSaveHandler` we defined earlier to store a document in our database.

The first thing we need to do is connect to our `bookstore` database. We achieve this by using the `CouchDBClient.retrieveDB()` method and passing in our database name.

Inside the `couchSaveHandler` add the following code:

```swift
App.couchDBClient.retrieveDB("bookstore") { (database, error) in
    guard let database = database  else {
        return completion(nil, .internalServerError)
    }
    // Initialize document here
}
```

> Since the CouchDB functions are asynchronous, we must handle responses inside the function's callback.

Now we are going to save our book document to the database. We will use the CouchDB `Database` class to make an HTTP request to our database. This class can make CRUD (Create, Retrieve, Update, Delete) requests for our CouchDB `Document`. In this case we will use `create` to save our book document. If the call succeeds we then return the book document with it's updated id and revision, otherwise we return an error.

```swift
database.create(bookDocument) { (response, error) in
    guard let response = response else {
        return completion(nil, RequestError(httpCode: error?.statusCode ?? 500))
    }
    var updatedBook = book
    updatedBook._id = response.id
    updatedBook._rev = response.rev
    completion(updatedBook, nil)
}
```

Your completed `POST` handler should now look as follows:

```swift
func couchSaveHandler(book: BookDocument, completion: @escaping (BookDocument?, RequestError?) -> Void) {
    App.couchDBClient.retrieveDB("bookstore") { (database, error) in
        guard let database = database  else {
            return completion(nil, .internalServerError)
        }
        database.create(book) { (response, error) in
            guard let response = response else {
                return completion(nil, RequestError(httpCode: error?.statusCode ?? 500))
            }
            var updatedBook = book
            updatedBook._id = response.id
            updatedBook._rev = response.rev
            completion(updatedBook, nil)
        }
    }
}
```

---

##Step 7: Test saving a document to the database

Now we're going to test our route by passing in a book and checking that it is saved to the database.

First we need to start our Kitura server.

Once the server is running, open a terminal and run the following:

```
curl -X POST \
      http://localhost:8080/couch \
      -H 'content-type: application/json' \
      -d '{
      "title": "A Game of Thrones",
      "price": 14.99,
      "genre": "Fantasy"
  }'
```

This will make a POST request to the server and we should be returned our book document in JSON format:

```
{"_id":"<generated id number>","_rev":"<generated revision number>","title":"A Game of Thrones","price":14.99,"genre":"Fantasy"}
```

> Since we did not provide an `_id` in our request, a UUID was generated for us.

---

##Step 8: Retrieve the document from the database

Similar to our other handler, the first step is to connect to our `bookstore` database.

Inside the `couchFindAllHandler` add the following code:

```swift
App.couchDBClient.retrieveDB("bookstore") { (database, error) in
    guard let database = database  else {
        return completion(nil, .internalServerError)
    }
    // Retrieve documents here
}
```

Next we're going to retrieve our document from the database. To retrieve all the documents from a CouchDB database we need to use the aptly named `retrieveAll` method.

```swift
database.retrieveAll(includeDocuments: true, callback: { (allDocuments, error) in
    guard let allDocuments = allDocuments else {
        return completion(nil, RequestError(httpCode: error?.statusCode ?? 500))
    }
    // Decode and return books here
})
```

When we made the call to `retrieveAll` we set the `includeDocuments` parameter to true, this means that each row returned from the database will have an additional field called "doc" in it which contains the JSON document. These documents can then be decoded to a given Swift type using `decodeDocuments(ofType:)`.

We decode all the documents that match the `BookDocument` type, and return them in the completion:

```swift
let books = allDocuments.decodeDocuments(ofType: BookDocument.self)
completion(books, nil)
```

Your completed `GET` handler should now look as follows:

```swift
func couchFindAllHandler(completion: @escaping ([BookDocument]?, RequestError?) -> Void) {
    App.couchDBClient.retrieveDB("bookstore") { (database, error) in
        guard let database = database  else {
            return completion(nil, .internalServerError)
        }
        database.retrieveAll(includeDocuments: true, callback: { (allDocuments, error) in
            guard let allDocuments = allDocuments else {
                return completion(nil, RequestError(httpCode: error?.statusCode ?? 500))
            }
            let books = allDocuments.decodeDocuments(ofType: BookDocument.self)
            completion(books, nil)
        })
    }
}
```

---

##Step 9: Test retrieving documents from the database

If you have followed the guide so far then you will now have a book document in your database, which we can retrieve using the code we just wrote.

To do this, start the server and navigate to: http://localhost:8080/couch.

This will call GET on the `/couch` route and we will see the book we posted earlier returned in JSON format. The book data persists even if we restart the Kitura server as it is now stored in a database.
