---
order: 3
---

```swift
import SwiftKueryORM

import SwiftKueryPostgresSQL
 
extension User: Model { }

func saveUser(user: User, completion: @escaping (User?, RequestError?) -> Void) {

    book.save(completion)
}
```