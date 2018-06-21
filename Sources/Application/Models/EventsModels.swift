import Foundation

struct UpcomingEvents: Codable {
    let title: String
    let description: String
    let image: String
    let url: String
    let linkTitle: String
    let alt: String
    let colour: String
}

struct PastEvents: Codable {
    let title: String
    let description: String
    let image: String
    let url: String
    let linkTitle: String
    let alt: String
    let colour: String
    let resource: [Resource]
}

struct Resource: Codable {
    let resourceLink: String
    let resourceTitle: String
}

public struct EventsWrapper: Codable {
    let upcomingEvents: [UpcomingEvents]
    let pastEvents: [PastEvents]
}

let upcomingEvents = [
    UpcomingEvents(title: "AltConf 2018 - San Jose, USA",
                   description: "Meet the Kitura team across the street from WWDC, and explore a series of workshops and tutorials alongside presentations from some of our lead developers.",
                   image: "public/assets/calendar-white.png",
                   url: "http://altconf.com/",
                   linkTitle: "Visit the AltConf 2018 site >",
                   alt: "Alt Conf 2018",
                   colour: "rgb(127, 24, 28);"),
    
    UpcomingEvents(title: "ServerSide.swift 2018 - Berlin, Germany",
                   description: "More information will be announced soon!",
                   image: "public/assets/calendar.png",
                   url: "https://www.serversideswift.info/",
                   linkTitle: "Visit the ServerSide.swift site >",
                   alt: "ServerSide.swift 2018",
                   colour: "rgb(194, 230, 248);"),
    
    UpcomingEvents(title: "try! Swift 2018 - NYC, USA",
                   description: "More information will be announced soon!",
                   image: "public/assets/calendar.png",
                   url: "https://www.tryswift.co/",
                   linkTitle: "Visit the try! Swift site >",
                   alt: "try! Swift 2018",
                   colour: "rgb(234, 234, 234);"),
    
]

let iosLondonResource = [
    Resource(resourceLink: "https://skillsmatter.com/skillscasts/11998-ibm-server-side-swift-with-the-kitura-web-framework",
             resourceTitle: "Video: Server-side Swift with Kitura - David Dunn")
]

let iosConResource = [
    Resource(resourceLink: "https://skillsmatter.com/skillscasts/11530-understanding-codable",
             resourceTitle: "Video: Understanding Codable - Ian Partridge")
]

let trySwiftTokyoResource = [
    Resource(resourceLink: "https://www.youtube.com/watch?v=5ciZS7Cxyp0",
             resourceTitle: "Video: Codable Routing in Kitura - Pushkar Kulkarni"),
    
    Resource(resourceLink: "https://developer.ibm.com/swift/2017/10/30/kitura-20/",
             resourceTitle: "Blog Post: Introducing Kitura 2 - Chris Bailey")
]

let pastEvents = [
    PastEvents(title: "iOSLondon - London, UK",
               description: "David Dunn gave a presentation about server-side Swift with Kitura and spoke to attendees about the Swift community and the state of server-side Swift.",
               image: "public/assets/calendar-white.png",
               url: "https://skillsmatter.com/groups/10773-ios-london",
               linkTitle: "Visit the iOS London site >",
               alt: "iOSLondon Meetup 2018",
               colour: "black;",
               resource: iosLondonResource),
    
    PastEvents(title: "iOSCon 2018 - London, UK",
               description: "Our own Ian Partridge also gave a talk on Codable in Swift 4, which we have linked above. Visit the link below to catch up on the other talks at the event.",
               image: "public/assets/calendar-white.png",
               url: "https://skillsmatter.com/conferences/9319-ioscon-2018-the-conference-for-ios-and-swift-developers",
               linkTitle: "Visit the iOS Con 2018 site >",
               alt: "iOSCon 2018",
               colour: "black;",
               resource: iosConResource),
    
    PastEvents(title: "try! Swift 2018 - Tokyo, Japan",
               description: "Our very own Pushkar gave a presentation on the power of codable routing, introduced in Kitura 2. We also spoke to lots of developers and ran some workshops that proved popular with the community, ran by our own Ian Partridge and David Okun.",
               image: "public/assets/calendar.png",
               url: "https://www.tryswift.co/",
               linkTitle: "Visit the try! Swift site >",
               alt: "try! Swift Tokyo 2018",
               colour: "rgb(234, 234, 234)",
               resource: trySwiftTokyoResource)
]

let eventsContext = EventsWrapper(upcomingEvents: upcomingEvents, pastEvents: pastEvents)
