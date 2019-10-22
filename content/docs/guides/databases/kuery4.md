---
path: "/docs/databases/kuery4"
title: Raw snippet 4
---

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
