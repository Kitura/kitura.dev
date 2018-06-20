import Foundation
import Kitura
import KituraStencil

func initializeWebRoutes(app: App) {
    app.router.add(templateEngine: StencilTemplateEngine())
    app.router.setDefault(templateEngine: StencilTemplateEngine())
    app.router.all("/public", middleware: StaticFileServer())
    
    app.router.get("/") { request, response, next in
        try response.render("index", with: indexContext)
        next()
    }
    app.router.get("/learn") { request, response, next in
        try response.render("learn", with: learnContext)
    }
    
    //        router.get("/packages") { request, response, next in
    //            try response.render("packages", with: packagesContext)
    //        }
    //
    //        router.get("/events") { request, response, next in
    //            try response.render("events", with: eventsContext)
    //        }
}
