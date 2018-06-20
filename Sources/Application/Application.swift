import Foundation
import Kitura
import LoggerAPI
import Configuration
import CloudEnvironment
import KituraContracts
import Health
import KituraStencil

public let projectPath = ConfigurationManager.BasePath.project.path
public let health = Health()

public class App {
    let router = Router()
//    let cloudEnv = CloudEnv()
    
    public init() throws {
        // Run the metrics initializer
        initializeMetrics(router: router)
    }
    
    func postInit() throws {
        router.add(templateEngine: StencilTemplateEngine())
        router.setDefault(templateEngine: StencilTemplateEngine())
        router.all("/public", middleware: StaticFileServer())
        // Endpoints
        initializeHealthRoutes(app: self)
        
        let slideItems = [
            SlideItem(title: "Kitura", caption: "A powerful server-side Swift web framework", url: "http://www.google.com"),
            SlideItem(title: "Kitura", caption: "This is my second slide", url: ""),
            SlideItem(title: "Kitura", caption: "This is my third slide", url: "")
        ]
        
        let blogs = [
            Blog(title:"ANNOUNCING KITURA 2.4", author: "Ian Partridge", team: "Kitura Team", image: "/public/assets/kitura-2dot4.jpg", alt: "Kitura 2.4", url: "https://developer.ibm.com/swift/2018/06/01/announcing-kitura-2-4/"),
            Blog(title: "INTRODUCING KITURA-NIO", author: "Pushkar Kulkarni", team: "Kitura Team", image: "/public/assets/kitura-nio.jpg", alt: "Kitura NIO", url: "https://developer.ibm.com/swift/2018/05/31/introducing-kitura-nio/"),
            Blog(title: "TYPESAFE TEMPLATING", author: "David Dunn", team: "Kitura Team", image: "/public/assets/typesafe-icon.jpg", alt: "Typesafe Templating", url: "https://developer.ibm.com/swift/2018/05/31/type-safe-templating/")
        ]
        
        let navLinks = [
            NavLink(title: "Learn"),
            NavLink(title: "Packages"),
            NavLink(title: "Events"),
            NavLink(title: "Help")
        ]
        
        let context = CodableWrapper(slideItems: slideItems, blogs: blogs, navLinks: navLinks)
        
        let topicsFirst = [
            Topic(title: "GETTING STARTED", url: ""),
            Topic(title: "BUILDING FOR LINUX USING MAC", url: ""),
            Topic(title: "BUILDING WITHIN XCODE", url: ""),
            Topic(title: "TESTING YOUR KITURA APP", url: ""),
            Topic(title: "APPLICATION METRICS FOR SWIFT", url: ""),
            Topic(title: "ENABLING SSL/TLS", url: ""),
            ]
        let topicsSecond = [
            Topic(title: "USING KITURA CREATE", url: ""),
            Topic(title: "DEPLOYING TO THE CLOUD", url: ""),
            Topic(title: "USING WITH DOCKER", url: ""),
            ]
        let topicsThird = [
            Topic(title: "CODABLE ROUTING", url: ""),
            Topic(title: "SPECIAL RESPONSE HANDLERS", url: ""),
            Topic(title: "USING CUSTOM PATHS", url: ""),
            Topic(title: "TYPE-SAFE MIDDLEWARE: SESSIONS", url: ""),
            Topic(title: "HTTP BASIC AUTHENTICATION", url: ""),
            ]
        let topicsFourth = [
            Topic(title: "USING KITURA-STENCIL", url: ""),
            Topic(title: "USING KITURA-MUSTACHE", url: ""),
            Topic(title: "USING KITURA-MARKDOWN", url: ""),
            ]
        let guideCards = [
            GuideCard(title: "BUILDING", alt: "building", image: "/public/assets/tools.png", topics: topicsFirst),
            GuideCard(title: "KITURA CLI", alt: "cli", image: "/public/assets/terminal.png", topics: topicsSecond),
            GuideCard(title: "ROUTING", alt: "routing", image: "/public/assets/code.png", topics: topicsThird),
            GuideCard(title: "TEMPLATING", alt: "templating", image: "/public/assets/file.png", topics: topicsFourth),
            ]
        let tutorials = [
            Tutorial(title: "Kitura Tutorial: Getting Started with Server Side Swift", author: "David Okun | raywenderlich.com", url: "https://www.raywenderlich.com/180721/kitura-tutorial-getting-started-with-server-side-swift", image: "/public/assets/ray-icon.png", alt: "Getting Started"),
            Tutorial(title: "Kitura and Stencil: How to Make Websites with Swift", author: "David Okun | raywenderlich.com", url: "https://www.raywenderlich.com/181130/kitura-stencil-tutorial-how-to-make-websites-with-swift", image: "/public/assets/wenderlich-hero2.png", alt: "Stencil Tutorial"),
            Tutorial(title: "Food Tracker: Building a Swift Backend", author: "Kitura Team", url: "https://github.com/IBM/FoodTrackerBackend", image: "/public/assets/FoodTrackerBezel.png", alt: "Food Tracker"),
            Tutorial(title: "ToDo Backend: Make a Backend server", author: "Kitura Team", url: "https://github.com/IBM/ToDoBackend", image: "/public/assets/TodoBackend.png", alt: "ToDo Backend"),
            ]
        
        let learnContext = LearnWrapper(guideCards: guideCards, tutorials: tutorials)
        
        router.get("/") { request, response, next in
            try response.render("index", with: context)
            next()
        }
        router.get("/learn") { request, response, next in
            try response.render("learn", with: learnContext)
        }
    }
    
    public func run() throws {
        try postInit()
        Kitura.addHTTPServer(onPort: 8080, with: router)
        Kitura.run()
    }
}
