---
order: 2
---

```swift
import Kitura
import LoggerAPI
import HeliumLogger

let router = Router()

HeliumLogger.use()

Log.info("Easy Application Logging!")

Kitura.addHTTPServer(onPort: 8080, with: router)
Kitura.run()

```