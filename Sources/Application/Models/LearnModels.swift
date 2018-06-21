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
}

public struct LearnWrapper: Codable {
    let guideCards: [GuideCard]
    let tutorials: [Tutorial]
}

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
    Tutorial(title: "Kitura Tutorial: Getting Started with Server Side Swift",
             author: "David Okun | raywenderlich.com",
             url: "https://www.raywenderlich.com/180721/kitura-tutorial-getting-started-with-server-side-swift",
             image: "/public/assets/ray-icon.png",
             alt: "Getting Started"),
    
    Tutorial(title: "Kitura and Stencil: How to Make Websites with Swift",
             author: "David Okun | raywenderlich.com",
             url: "https://www.raywenderlich.com/181130/kitura-stencil-tutorial-how-to-make-websites-with-swift",
             image: "/public/assets/wenderlich-hero2.png",
             alt: "Stencil Tutorial"),
    
    Tutorial(title: "Food Tracker: Building a Swift Backend",
             author: "Kitura Team",
             url: "https://github.com/IBM/FoodTrackerBackend",
             image: "/public/assets/FoodTrackerBezel.png",
             alt: "Food Tracker"),
    
    Tutorial(title: "ToDo Backend: Make a Backend server",
             author: "Kitura Team",
             url: "https://github.com/IBM/ToDoBackend",
             image: "/public/assets/TodoBackend.png",
             alt: "ToDo Backend"),
]

public let learnContext = LearnWrapper(guideCards: guideCards, tutorials: tutorials)
