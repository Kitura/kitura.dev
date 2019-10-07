---
path: "/docs/databases/kuery-raw"
title: Add Swift Kuery to your app
---

# Swift Kuery with Raw routing

[Swift-Kuery](https://github.com/IBM-Swift/Swift-Kuery) is a pluggable SQL database driver/SDK abstraction layer. Its main idea is to unify the APIs to the various relational databases, providing a Swifty yet SQL-like API. This guide will demonstrate how to connect to a SQL database using one of the Swift-Kuery plugins and how to use this connection to send SQL queries to your database.

---

## Step 1: Create the Kuery routes

We are going to create a new file in our project for the Kuery routes.

>If you don't have a server, follow our [Create a server](https://www.kitura.io/docs/getting-started/create-server-cli.html) guide.

Open your **Application.swift** file:
```
open Sources/Application/Application.swift
```
Inside the **postInit()** function add:
```swift
initializeKueryRoutes(app: self)
```
Create a new file called **KueryRoutes.swift**:
```
touch Sources/Application/Routes/KueryRoutes.swift
```
Open the **KueryRoutes.swift** file:
```swift
touch Sources/Application/Routes/KueryRoutes.swift
```

Inside this file we are going to create two routes. The first will use Swift-Kuery to save a **Book** into a database and the second will retrieve all of the saved books.

Add the above code, for your chosen routing method, to your **KueryRoutes.swift** file.

```swift
import LoggerAPI
import Foundation

func initializeKueryRoutes(app: App) {

    app.router.post("/kuery") { request, response, next in
        guard let book = try? request.read(as: Book.self) else {
            let _ = response.send(status: .badRequest)
            return next()
        }
        // Handle POST here
    }

    app.router.get("/kuery") { request, response, next in
        // Handle GET here
    }
}
extension App {
    // Create connection pool and initialize BookTable here
}
```

---

## Step 2: Install a database plugin

Kitura has built in support for PostgreSQL, MySQL and SQLite.

The API to use each plugin is the same but the installation steps differ slightly.

The algorithms are as follows:

- [PostgreSQL](./kuery-postgresql)
- [MySQL](./kuery-mysql)
- [SQLite](./kuery-sqlite)

> Follow one of the links above to configure your signing and verifying algorithm before continuing with the rest of this guide.

---

## Step 3: Create a class to represent the database table

To use SwiftKuery we need to create a class in Swift that matches our database table.

Create a new file called **BookTable.swift**:
```
touch Sources/Application/Models/BookTable.swift
```
Open the **BookTable.swift** file:
```
open Sources/Application/Models/BookTable.swift
```
Inside **BookTable.swift**, define your **BookTable** class:
```swift
import SwiftKuery

class BookTable: Table {
    let tableName = "BookTable"
    let id = Column("id", Int32.self, primaryKey: true)
    let title = Column("title", String.self)
    let price = Column("price", Float.self)
    let genre = Column("genre", String.self)
}
```

The **BookTable** class represents our **Book** model as an SQL table. It needs to inherit from **Table** and match the column names of the table we created in the database. We must also provide the table name as a property.

Return to the **KueryRoutes.swift** file. In the **App** extension, create an instance of this table:

```swift
static let bookTable = BookTable()
```
Now we're ready to start saving data to our database.

---

## Step 4: Save data to the database

Now we're going to save a book that is posted to the '/kuery' route into our database.

Inside the handler for our POST route, we need to convert our book to an Array of Arrays of type **Any**. This converts the book that was sent to the route into the format required by Swift-Kuery. We need to use the **Any** type here as the database fields could be of any type.

```swift
    let rows = [[book.id, book.title, book.price, book.genre]]
    // Get connection from pool here
```

To talk to the database, the first thing we need to do is get a connection from the connection pool.

To do this we can use the **getConnection** method. We can add this into the handler for our POST route:

```swift
App.pool.getConnection() { connection, error in
        guard let connection = connection else {
            Log.error("Error connecting: \(error?.localizedDescription ?? "Unknown Error")")
            let _ = response.send(status: .internalServerError)
            return next()
        }
        // Write query and execute it here
}
```

When we get a connection from the connection pool we need to confirm it's a valid connection.

If we don't get a valid connection, we will stop the execution and log an error to the console.

Now we can build the query for inserting data into a database.

Beneath our connection guard closure, add the following code:
```swift
let insertQuery = Insert(into: App.bookTable, rows: rows)
```
Once we have defined our insert query, we need to execute the query using the connection we took from the pool:

```swift
connection.execute(query: insertQuery) { insertResult in
    guard insertResult.success else {
        Log.error("Error executing query: \(insertResult.asError?.localizedDescription ?? "Unknown Error")")
        let _ = response.send(status: .internalServerError)
        return next()
    }
    response.send(book)
    return next()
}
```

That's it! We've setup our POST route to save data to a database. the completed handler for your POST route should now look as follows:

```swift
app.router.post("/kuery") { request, response, next in
    guard let book = try? request.read(as: Book.self) else {
        let _ = response.send(status: .badRequest)
        return next()
    }
    let rows = [[book.id, book.title, book.price, book.genre]]
    App.pool.getConnection() { connection, error in
        guard let connection = connection else {
            Log.error("Error connecting: \(error?.localizedDescription ?? "Unknown Error")")
            let _ = response.send(status: .internalServerError)
            return next()
        }
        let insertQuery = Insert(into: App.bookTable, rows: rows)
        connection.execute(query: insertQuery) { insertResult in
            guard insertResult.success else {
                Log.error("Error executing query: \(insertResult.asError?.localizedDescription ?? "Unknown Error")")
                let _ = response.send(status: .internalServerError)
                return next()
            }
            response.send(book)
            return next()
        }
    }
}
```

Next we can test our implementation.

---

## Step 5 (Optional): Test saving a book to database

First we need to start our Kitura server.

Once the server is running run the following in a terminal:
```
curl -X POST \
      http://localhost:8080/kuery \
      -H 'content-type: application/json' \
      -d '{
      "id": 0,
      "title": "A Game of Thrones",
      "price": 14.99,
      "genre": "Fantasy"
  }'
```

This will make a POST request to the server and we should be returned our book in JSON format:
```
{"id":0,"title":"A Game of Thrones","price":14.99,"genre":"Fantasy"}
```

>The following steps are for PostgreSQL. The commands will be different if you used a different database.

Then using the PostgreSQL CLI we can query the database to see if our data was saved.

Start the PostgreSQL CLI for our database by running the following in a terminal:
```
psql bookstoredb
```

In a terminal which is running the **psql** command, run the following:
```
    SELECT * FROM "BookTable";
```

You should see the following printed in the terminal:

     id |       title       | price |  genre
    ----+-------------------+-------+---------
     0  | A Game of Thrones | 14.99 | Fantasy
    (1 row)

This shows our POST route is working as we'd expect.

A better way to test this, as we're writing Swift code, would be to query the database directly from our server instead of using Terminal.

---

## Step 6: Retrieve data from the database

Now we're going to build a SELECT query that will query the database and return all the entries in our **BookTable**.

Inside the handler for our GET route, we need to get a connection from the connection pool:

```swift
App.pool.getConnection() { connection, error in
      guard let connection = connection else {
          Log.error("Error connecting: \(error?.localizedDescription ?? "Unknown Error")")
          let _ = response.send(status: .internalServerError)
          return next()
      }
      // Write query and execute it here
  }
```

Now we can build our SELECT query that will query the database for every entry in the "BookTable":
```
let selectQuery = Select(from: App.bookTable)
```
Like before we can now execute our query using **connection.execute**:

```swift
connection.execute(query: selectQuery) { selectResult in
    guard let resultSet = selectResult.asResultSet else {
        Log.error("Error connecting: \(selectResult.asError?.localizedDescription ?? "Unknown Error")")
        let _ = response.send(status: .internalServerError)
        return next()
    }
    // Iterate through result set here
}
```

The query should return a set of results, in the code we use **.asResultSet** to check that the returned value is a valid result set, otherwise we log an error and return.

Next we need to iterate through our result set, converting each of the returned database table rows into a book:
```swift
var books = [Book]()
resultSet.forEach() { row, error in
    // Handle callback here
}
```

The **forEach** function will return either a **row**, an **error** or **nil** (in this case **nil** means that there are no more rows).

Inside the **forEach** callback, we need to handle these three cases:

```swift
guard let row = row else {
      if let error = error {
          Log.error("Error getting row: \(error)")
          let _ = response.send(status: .internalServerError)
          return next()
      } else {
          // All rows have been processed
          response.send(books)
          return next()
      }
  }
  // Convert row to book here
```

When we get a row back from the database we need to convert it back into a **Book** model type.

After the **guard** closure, add the following code:

```swift
guard let idString = row[0] as? String,
      let id = Int(idString),
      let title = row[1] as? String,
      let price = row[2] as? Double,
      let genre = row[3] as? String
  else {
      Log.error("Unable to decode book")
      let _ = response.send(status: .internalServerError)
      return next()
  }
  books.append(Book(id: id, title: title, price: price, genre: genre))
```

That's it! We've enabled our GET route to retrieve data from a database.

Our completed **KueryRoutes.swift** file should now look as follows:

```swift
import LoggerAPI
  import Foundation
  import SwiftKuery
  import SwiftKueryPostgreSQL // This will be different if you did not use PostgreSQL

  func initializeKueryRoutes(app: App) {

      app.router.post("/kuery") { request, response, next in
          guard let book = try? request.read(as: Book.self) else {
              let _ = response.send(status: .badRequest)
              return next()
          }
          let rows = [[book.id, book.title, book.price, book.genre]]
          App.pool.getConnection() { connection, error in
              guard let connection = connection else {
                  Log.error("Error connecting: \(error?.localizedDescription ?? "Unknown Error")")
                  let _ = response.send(status: .internalServerError)
                  return next()
              }
              let insertQuery = Insert(into: App.bookTable, rows: rows)
              connection.execute(query: insertQuery) { insertResult in
                  guard insertResult.success else {
                      Log.error("Error executing query: \(insertResult.asError?.localizedDescription ?? "Unknown Error")")
                      let _ = response.send(status: .internalServerError)
                      return next()
                  }
                  response.send(book)
                  next()
              }
          }
      }

      app.router.get("/kuery") { request, response, next in
          App.pool.getConnection() { connection, error in
              guard let connection = connection else {
                  Log.error("Error connecting: \(error?.localizedDescription ?? "Unknown Error")")
                  let _ = response.send(status: .internalServerError)
                  return next()
              }
              let selectQuery = Select(from: App.bookTable)
              connection.execute(query: selectQuery) { selectResult in
                  guard let resultSet = selectResult.asResultSet else {
                      Log.error("Error connecting: \(selectResult.asError?.localizedDescription ?? "Unknown Error")")
                      let _ = response.send(status: .internalServerError)
                      return next()
                  }
                  var books = [Book]()
                  resultSet.forEach() { row, error in
                      guard let row = row else {
                          if let error = error {
                              Log.error("Error getting row: \(error)")
                              let _ = response.send(status: .internalServerError)
                              return next()
                          } else {
                              // All rows have been processed
                              response.send(books)
                              return next()
                          }
                      }
                      guard let idString = row[0] as? String,
                          let id = Int(idString),
                          let title = row[1] as? String,
                          let price = row[2] as? Double,
                          let genre = row[3] as? String
                          else {
                              Log.error("Unable to decode book")
                              let _ = response.send(status: .internalServerError)
                              return next()
                      }
                      books.append(Book(id: id, title: title, price: price, genre: genre))
                  }
              }
          }
      }
  }
  extension App {
      static let poolOptions = ConnectionPoolOptions(initialCapacity: 1, maxCapacity: 5)
      // The createPool() will be different if you used a plugin other than PostgreSQL
      static let pool = PostgreSQLConnection.createPool(host: "localhost", port: 5432, options: [.databaseName("bookstoredb")], poolOptions: poolOptions)
      static let bookTable = BookTable()
  }
```

---

## Step 7 (Optional): Test retrieving the books from a database

If you followed "Step 5: Testing saving to database", then you will have a book in your database, which we can retrieve using the code we wrote in "Step 6: Retrieve data from the database".

To do this, start the server and navigate to: [http://localhost:8080/kuery](http://localhost:8080/kuery)

This will call GET on the **/kuery** route and we will see the book we posted in Step 5 returned in JSON format. The book data persists even if we restart the Kitura server as it is now stored in a database.
