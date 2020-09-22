---
title: "Kitura CouchDB 3.0: Persisting Codable Swift objects in a CouchDB/Cloudant NoSQL Database"
blurb: We have just released Kitura-CouchDB 3.0, featuring a new Codable API
date: "2019-02-01"
author: Andrew Lees
path: /blogs/kitura-couchdb-cloudant-nosql-database
---

[Kitura CouchDB](https://github.com/Kitura/Kitura-CouchDB) is a pure Swift client, that allows applications to interact with a CouchDB or Cloudant NoSQL database. We have just released Kitura-CouchDB 3.0, featuring a new Codable API, which removes the JSON boilerplate and works directly with your Swift objects. This blog will describe the new API and demonstrate its benefits, using an example.

##Codable Kitura CouchDB

Previously, in Kitura CouchDB 2.0, you would interact with the database using [SwiftyJSON](https://github.com/Kitura/SwiftyJSON). This involved a lot of boilerplate code to convert your Swift object to a SwiftyJSON object and vice versa. The introduction of Codable, simplifies the conversion from Swift to JSON and Kitura CouchDB 3.0 utilizes this new functionality in its new API. To demonstrate how this improves usability, we will apply these changes to our [CouchDBSample](https://github.com/Kitura/Kitura-CouchDB/blob/master/Sources/CouchDBSample/main.swift).

The following examples compare the code required for executing CRUD (create, retrieve, update, delete) operations on a Swift object using Kitura-CouchDB versions 2.0 and 3.0. It assumes you have [installed CouchDB](https://docs.couchdb.org/en/master/install/mac.html) and imported Kitura-CouchDB as a dependency in your Swift project.

###CouchDB Document

CouchDB is a NoSQL database for storing documents. A document is any structure that can be represented as JSON and contains `_id` and `_rev` fields.

- The `_id` field is the unique identifier for the document. If it is not set, a random UUID will be assigned for the document.
- The `_rev` field is the revision of the document. It is returned when you make requests and is used to prevent conflicts from multiple users updating the same document.

Kitura CouchDB 3.0 introduces a new `Document` protocol that encapsulates the requirements of a CouchDB document:

```swift
public protocol Document: Codable {
    var _id: String? { get }
    var _rev: String? { get }
}
```

In our example, we define a struct that represents the documents we want to store in our database:

```swift
struct MyDocument: Document {
    let _id: String?
    var _rev: String?
    var value: String
}
```

We have made this struct conform to `Document` so it can be used with the new API.

###Connect to the database with CouchDBClient

The `CouchDBClient` represents a connection to a CouchDB server. It is initialized from a `ConnectionProperties` struct:

```swift
let properties = ConnectionProperties(
    host: "127.0.0.1",              // http address
    port: 5984,                     // http port
    secured: false,                 // https or http
    username: "<CouchDB-username>", // admin username
    password: "<CouchDB-password>"  // admin password
)
let couchDBClient = CouchDBClient(connectionProperties: properties)
```

The couchDBClient can then be used to create, retrieve and delete CouchDB databases. For our example we retrieve an existing CouchDB database:

```swift
// Kitura CouchDB 2.0
couchDBClient.dbExists("SampleDB") { (exists, error) in
    if exists {
        let database = couchDBClient.database("SampleDB")
        // Use database
    }
}

// Kitura CouchDB 3.0
couchDBClient.retrieveDB("SampleDB") { (database, error) in
    if let database = database {
        // Use database
    }
}
```

In Kitura CouchDB 3.0, `dbExists` has been replaced with `retrieveDB`. This will check the database exists and, if it does, initialize a database instance for you in a single function.

###Database CRUD operations

Your database instance is used to perform asynchronous HTTP requests with your documents. In our example, the requests are nested within the previous requests callback to ensure they execute in the desired order.

We will be using the following document:

```swift
var myDocument = MyDocument(_id: "Kitura", _rev: nil, value: "Hello World")
```

####Create a Document

In Kitura CouchDB 2.0 we have to convert our object using SwiftyJSON, however in Kitura CouchDB 3.0, because we marked the object as a Document, it can be created directly:

```swift
// Kitura CouchDB 2.0
let jsonDict = [
    "_id": myDocument._id,
    "value": myDocument.value
]
let json = JSON(jsonDict)
database.create(json, callback: { (id: String?, rev: String?, response: JSON?, error: NSError?) in
    if let id = id {
        print("Created document with id \(id)")
        // Retrieve document here
    }
}

// Kitura CouchDB 3.0
database.create(myDocument) { (response, error) in
    if let response = response {
        print("Created document with id \(response.id)")
        // Retrieve document here
    }
}
```

####Retrieve a Document

When retrieving a document in Kitura CouchDB 2.0, you had to parse the JSON back into your object. In Kitura CouchDB 3.0, you define the type you expect and it will automatically parse the JSON to your type:

```swift
// Kitura CouchDB 2.0
database.retrieve("Kitura") { (document: JSON?, error: NSError?) in
    if let document = document,
        let id = document?["_id"].string,
        let rev = document?["_rev"].string,
        let value = document?["value"].string,
    {
        let retrievedDoc = MyDocument(_id: id, _rev: rev, value: value)
        print("Document value: \(retrievedDoc.value)")
        // Update document here
    }
}

// Kitura CouchDB 3.0
database.retrieve("Kitura") { (document: MyDocument?, error: CouchDBError?) in
    if var retrievedDoc = document {
        print("Document value: \(retrievedDoc.value)")
        // Update document here
    }
}
```

####Update a Document

When updating a document in Kitura CouchDB 2.0, you had to convert to and from SwiftyJSON. In Kitura CouchDB 3.0, you can interact and update objects directly:

```swift
// Kitura CouchDB 2.0
let newDoc = ["value": "New Value"]
let newJson = JSON(newDoc)
database.update(retrievedDoc._id, rev: retrievedDoc._rev, document: newJson) { (rev: String?, response: JSON?, error: NSError?) in
    if let rev = rev {
        print("Document updated. New rev: \(rev)")
        // Delete document here
    }
}

// Kitura CouchDB 3.0
retrievedDoc.value = "New Value"
database.update(retrievedDoc._id, rev: retrievedDoc._rev, document: retrievedDoc) { (response, error) in
    if let response = response {
        print("Document updated. New rev: \(response.rev)")
        // Delete document here
    }
}
```

####Delete a Document

Since deleting a document only requires the id and rev strings, this API hasn’t changed between versions.

```swift
// Kitura CouchDB 2.0
database.delete(retrievedDoc._id, rev: rev) { (error: NSError?) in
    if error == nil {
        print("Document successfully deleted")
    }
}
// Kitura CouchDB 3.0
database.delete(response.id, rev: response.rev) { (error) in
    if error == nil {
        print("Document successfully deleted")
    }
}
```

###Summary

Let’s quickly sum up what we have achieved with the above code examples. We have:

- Connected to a CouchDB database
- Defined our document
- Saved an instance of our document
- Retrieved the saved document
- Updated our document in the database
- Deleted our document

Even using the most basic model we have saved ourselves twelve lines of code. As documents get more complicated, Kitura-CouchDB 3.0 removes even more boilerplate code, thereby simplifying the code and adding compile time safety.

---

## Next steps

If you would like to run this example, or learn more about Kitura-CouchDB, [check it out on GitHub](https://github.com/Kitura/Kitura-CouchDB).

If you would like to learn about more features of Kitura-CouchDB such as bulk requests, design documents and attachments, [visit our API reference](https://ibm-swift.github.io/Kitura-CouchDB/index.html).

Any questions or comments? Please join the Kitura community on [Slack](http://swift-at-ibm-slack.mybluemix.net/?cm_sp=dw-bluemix-_-swift-_-devcenter&_ga=2.150897590.186671014.1570626561-1743126121.1570022962&cm_mc_uid=83263075142115698398229&cm_mc_sid_50200000=53695431570707266328)!
