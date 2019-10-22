---
path: "/docs/databases/kuery3"
title: Raw snippet 3
---

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
