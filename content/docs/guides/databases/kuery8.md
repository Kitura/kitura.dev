---
path: "/docs/databases/kuery8"
title: Raw snippet 8
---

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
