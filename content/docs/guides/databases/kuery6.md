---
path: "/docs/databases/kuery6"
title: Raw snippet 6
---

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
