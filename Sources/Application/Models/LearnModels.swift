import Foundation

struct Topic: Codable {
    let title: String
    let url: String
}

struct GuideCard: Codable {
    let title: String
    let alt: String
    let image: String
    let topics: [Topic]
}

struct Tutorial: Codable {
    let title: String
    let author: String
    let url: String
    let image: String
    let alt: String
    let styleClass: String
}

public struct LearnWrapper: Codable {
    let guideCards: [GuideCard]
    let tutorials: [Tutorial]
}

let topicsFirst = [
    Topic(title: "GETTING STARTED", url: "public/guides/gettingstarted.html"),
    Topic(title: "BUILDING FOR LINUX USING MAC", url: "public/guides/building/linuxbuild.html"),
    Topic(title: "BUILDING WITHIN XCODE", url: "public/guides/building/xcodebuild.html"),
    Topic(title: "TESTING YOUR KITURA APP", url: "public/guides/building/testing.html"),
    Topic(title: "APPLICATION METRICS FOR SWIFT", url: "public/guides/building/metrics.html"),
    Topic(title: "ENABLING SSL/TLS", url: "public/guides/building/ssl.html"),
]
let topicsSecond = [
    Topic(title: "USING KITURA CREATE", url: "public/guides/kituracli/gettingstarted.html"),
    Topic(title: "DEPLOYING TO THE CLOUD", url: "public/guides/kituracli/deploying_cloud.html"),
    Topic(title: "USING WITH DOCKER", url: "public/guides/kituracli/docker.html"),
]
let topicsThird = [
    Topic(title: "CODABLE ROUTING", url: "public/guides/routing/codablerouting.html"),
    Topic(title: "SPECIAL RESPONSE HANDLERS", url: "public/guides/routing/specialresponsehandlers.html"),
    Topic(title: "USING CUSTOM PATHS", url: "public/guides/routing/custompaths.html"),
    Topic(title: "TYPE-SAFE MIDDLEWARE: SESSIONS", url: "public/guides/middleware/typesafesessions.html"),
    Topic(title: "HTTP BASIC AUTHENTICATION", url: "public/guides/middleware/typesafehttpbasic.html"),
]
let topicsFourth = [
    Topic(title: "USING KITURA-STENCIL", url: "public/guides/templating/stenciltemplate.html"),
    Topic(title: "USING KITURA-MUSTACHE", url: "public/guides/templating/mustachetemplate.html"),
    Topic(title: "USING KITURA-MARKDOWN", url: "public/guides/templating/markdowntemplate.html"),
]
let guideCards = [
    GuideCard(title: "BUILDING", alt: "building", image: "/public/assets/tools.png", topics: topicsFirst),
    GuideCard(title: "KITURA CLI", alt: "cli", image: "/public/assets/terminal.png", topics: topicsSecond),
    GuideCard(title: "ROUTING", alt: "routing", image: "/public/assets/code.png", topics: topicsThird),
    GuideCard(title: "TEMPLATING", alt: "templating", image: "/public/assets/file.png", topics: topicsFourth),
]
let tutorials = [
    Tutorial(title: "Kitura Tutorial: Getting Started with Server Side Swift",
             author: "David Okun | raywenderlich.com",
             url: "https://www.raywenderlich.com/180721/kitura-tutorial-getting-started-with-server-side-swift",
             image: "/public/assets/ray-icon.png",
             alt: "Getting Started",
             styleClass: "wenderlich-starter"),
    
    Tutorial(title: "Kitura and Stencil: How to Make Websites with Swift",
             author: "David Okun | raywenderlich.com",
             url: "https://www.raywenderlich.com/181130/kitura-stencil-tutorial-how-to-make-websites-with-swift",
             image: "/public/assets/wenderlich-hero2.png",
             alt: "Stencil Tutorial",
             styleClass: "wenderlich-stencil"),
    
    Tutorial(title: "Food Tracker: Building a Swift Backend",
             author: "Kitura Team",
             url: "https://github.com/IBM/FoodTrackerBackend",
             image: "/public/assets/FoodTrackerBezel.png",
             alt: "Food Tracker",
             styleClass: "food-tracker"),
    
    Tutorial(title: "ToDo Backend: Make a Backend server",
             author: "Kitura Team",
             url: "https://github.com/IBM/ToDoBackend",
             image: "/public/assets/TodoBackend.png",
             alt: "ToDo Backend",
             styleClass: "todo-backend"),
]

public let learnContext = LearnWrapper(guideCards: guideCards, tutorials: tutorials)
