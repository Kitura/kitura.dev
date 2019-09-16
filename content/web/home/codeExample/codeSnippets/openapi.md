---
order: 4
---

```swift
import Kitura
import KituraOpenAPI

let router = Router()

Kitura.addEndpoints(to: router)

Kitura.addHTTPServer(onPort: 8080, with: router)
Kitura.run()
```