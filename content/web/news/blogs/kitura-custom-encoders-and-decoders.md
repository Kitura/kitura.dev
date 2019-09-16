---
title: Pluggable JSON encoders in Kitura 2.5
blurb: In Kitura 2.5, we have added the ability to customize the JSON encoders and decoders used by your router
date: "2018-09-01"
author: Andrew Lees
path: /blogs/kitura-custom-encoders-and-decoders
---

Codable routing allows you to quickly build REST APIs that work directly with concrete Swift types. Kitura achieves this by using the Codable protocol to encode and decode the body of HTTP requests. In Kitura 2.5, we have added the ability to customize the JSON encoders and decoders used by your router. Furthermore, you can add your own custom encoders and decoders. This allows your routes to handle other data serializations if you want, such as YAML, XML and MessagePack.

##BodyEncoder and BodyDecoder

We’ve added two new protocols called BodyEncoder and BodyDecoder that encapsulate the ability to change Codable types to and from Data.

A class that conforms to BodyEncoder must be able to encode an Encodable type into Data:

```swift
public protocol BodyEncoder: AnyObject {
    func encode<T : Encodable>(_ value: T) throws -> Data
}
```

A class that conforms to BodyDecoder must be able to decode data into a Decodable type:

```swift
public protocol BodyDecoder: AnyObject {
    func decode<T : Decodable>(_ type: T.Type, from data: Data) throws -> T
}
```

Kitura extends JSONEncoder/JSONDecoder as well as QueryEncoder/QueryDecoder to conform to BodyEncoder/BodyDecoder. As a result, these coders are usable out of the box. Other encoders/decoders can be made to conform to this protocol so that the Kitura router can use them.

---

##MediaType

The media type (formerly known as MIME type) is a two-part identifier that is separated by a forwards slash (e.g. “text/plain”). We have added a MediaType struct to Kitura that represents media type. This is used for selecting an encoder or decoder based on the media type identified in the Accepts or Content-Type HTTP headers. You can initialize a MediaType in three ways:

- From a raw media type string
```swift
let json = MediaType("application/json")
```
- By providing the type and sub type
```swift
let json = MediaType(type: .application, subtype: "json")
```
- Using a static helper initializer for certain popular media types
```swift
let json = MediaType.json
```

---

##Custom Encoders and Decoders on the Router

From Kitura 2.5, the Router class has two extra properties: dictionaries called encoders and decoders.

The encoders dictionary maps MediaType keys to closures for generating a BodyEncoder. On initialization, the dictionary includes a JSONEncoder() generator for “application/json”.

```swift
public var encoders: [MediaType: () -> BodyEncoder] = [.json: { return JSONEncoder() }]
```

You can send a Codable object from a route either by calling send(_ obj: T) from a RouterResponse or by using a Codable route. When this happens the Router will select the correct encoder based on the Accepts header of the Request. If the request doesn’t have an Accepts header or it doesn’t include any MediaTypes from your dictionary, the router’s defaultResponseMediaType will determine the encoder.

```swift
public var defaultResponseMediaType: MediaType = .json
```

The decoders dictionary maps MediaType keys to closures for generating a BodyDecoder. On initialization, the dictionary includes a JSONDecoder() generator for “application/json” and a QueryDecoder() generator for “application/x-www-form-urlencoded”.

```swift
public var decoders: [MediaType: () -> BodyDecoder] = [.json: {return JSONDecoder()}, .urlEncoded: {return QueryDecoder()}]
```

You can read a Codable object in a route either by calling read(as type: T.Type) from a RouterRequest or by using a Codable route. When this happens the Router will select the correct decoder based on the Content-Type header of the request.

You can add custom encoders and decoders to your router by adding BodyEncoders/BodyDecoders to these dictionary with the MediaType you would like them to encode/decode. You can also replace the existing JSONEncoder and JSONDecoder generators to customize how your Kitura router handles JSON.

---

##Adding other data serializations

The following data serialization formats already have existing Swift packages which implement them using Codable:

- YAML
- XML
- BSON
- Property Lists
- MessagePack

To use one of these custom encoders and decoders:

1. Follow the corresponding link above.
2. Import the repository to your Kitura project.
3. Extend their Encoder/Decoder Class to conform to BodyEncoder/Decoder.
4. Add the encoder/decoder and its MediaType to your encoder and decoder dictionary

--- 

##Example: Customizing the JSON encoder

JSON is the most common data serialization technique and Kitura uses it by default for its Codable routes. The JSONEncoder class includes options to customize its encoding strategy. In this example we will show you how to set your Kitura router to send pretty printed JSON from a Codable route.

1. In the terminal, using the Kitura command-line interface, generate a basic Kitura server:

```
mkdir ~/customCoders
cd ~/customCoders
kitura init
open customCoders.xcodeproj/
```

2. Open Sources > Application > Application.swift

3. Add a Hello struct after the App class:

```swift 
struct Hello: Codable {
    let hello: String
    let from: String
}
```

4. Construct a Codable route:

```swift
router.get("/hello") { (respondWith: (Hello?, RequestError?) -> Void) in
    let hello = Hello(hello: "world", from: "Kitura")
    respondWith(hello, nil)
}
```

5. In the top left corner of Xcode you should see a small toolbox icon with the text “customCoders-Package” next to it. Click this icon and then click “customCoders” from the dropdown menu.

6. Go to http://localhost:8080/hello

You will see the hello message printed as standard JSON.

7. After initializeMetrics(router: router) create your custom JSONEncoder() generator:

```swift
let jsonEncoderGenerator: () -> BodyEncoder = {
    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted
    return encoder
}
```

8. replace the router’s JSONEncoder with your new one:

```swift
router.encoders[.json] = jsonEncoderGenerator
```

9. Restart your project and go to http://localhost:8080/hello

The hello message will now be pretty printed JSON.