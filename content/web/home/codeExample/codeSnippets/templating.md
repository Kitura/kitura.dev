---
order: 5
---

```swift
import KituraStencil
import Kitura

let router = Router()

router.add(templateEngine: StencilTemplateEngine())

router.get(“/“) { _, response, next in
    response.render(“example.stencil”, context: [:])
    next()
}
```