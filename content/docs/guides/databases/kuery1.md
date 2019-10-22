---
path: "/docs/databases/kuery1"
title: Raw snippet 1
---

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
