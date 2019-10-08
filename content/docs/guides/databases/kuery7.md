---
path: "/docs/databases/kuery7"
title: Raw snippet 7
---

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
