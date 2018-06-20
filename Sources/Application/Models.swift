//
//  Models.swift
//  Application
//
//  Created by David Dunn on 08/06/2018.
//

import Foundation

public struct SlideItem: Codable {
    let title: String
    let caption: String
    let url: String
}

public struct Blog: Codable {
    let title: String
    let author: String
    let team: String
    let image: String
    let alt: String
    let url: String
}

public struct NavLink: Codable {
    let title: String
}

public struct CodableWrapper: Codable {
    let slideItems: [SlideItem]
    let blogs: [Blog]
    let navLinks: [NavLink]
}


/*
 Learn Page Models
 */

public struct Topic: Codable {
    let title: String
    let url: String
}

public struct GuideCard: Codable {
    let title: String
    let alt: String
    let image: String
    let topics: [Topic]
}

public struct Tutorial: Codable {
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
