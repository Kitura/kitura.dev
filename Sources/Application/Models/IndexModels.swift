import Foundation

struct SlideItem: Codable {
    let title: String
    let caption: String
    let url: String
    let image: String?
    let alt: String
    let styleClass: String
}

struct Blog: Codable {
    let title: String
    let author: String
    let team: String
    let image: String
    let alt: String
    let url: String
}

public struct IndexWrapper: Codable {
    let slideItems: [SlideItem]
    let blogs: [Blog]
}

let slideItems = [
    SlideItem(title: "KITURA",
              caption: "A powerful server-side Swift web framework",
              url: "public/guides/gettingstarted.html",
              image: "public/assets/Kitura.svg",
              alt: "",
              styleClass: "slide-1"),
    
    SlideItem(title: "KITURA 2.4",
              caption: "Click here to find out what's new.",
              url: "https://developer.ibm.com/swift/2018/06/01/announcing-kitura-2-4/",
              image: "public/assets/Kitura-White.svg",
              alt: "",
              styleClass: "slide-2"),
]

let blogs = [
    Blog(title:"ANNOUNCING KITURA 2.4",
         author: "Ian Partridge",
         team: "Kitura Team",
         image: "/public/assets/kitura-2dot4.jpg",
         alt: "Kitura 2.4",
         url: "https://developer.ibm.com/swift/2018/06/01/announcing-kitura-2-4/"),
    
    Blog(title: "INTRODUCING KITURA-NIO",
         author: "Pushkar Kulkarni",
         team: "Kitura Team",
         image: "/public/assets/kitura-nio.jpg",
         alt: "Kitura NIO",
         url: "https://developer.ibm.com/swift/2018/05/31/introducing-kitura-nio/"),
    
    Blog(title: "TYPESAFE TEMPLATING",
         author: "David Dunn",
         team: "Kitura Team",
         image: "/public/assets/typesafe-icon.jpg",
         alt: "Typesafe Templating",
         url: "https://developer.ibm.com/swift/2018/05/31/type-safe-templating/")
]

public let indexContext = IndexWrapper(slideItems: slideItems, blogs: blogs)
