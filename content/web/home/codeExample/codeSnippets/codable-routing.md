---
order: 1
---

```swift
import Kitura

let router = Router()
 
struct User: Codable {
    let name: String
}

let users = [User(name: “Jane”)]

func getUsers(completion: ([User]?, RequestError?) -> Void) {
    completion(users, nil)
}

router.get(“/“, handler: getUsers)

Kitura.addHTTPServer(onPort: 8080, with: router)
Kitura.run()
```