---
path: "/docs/databases/kuery5"
title: Raw snippet 5
---

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
