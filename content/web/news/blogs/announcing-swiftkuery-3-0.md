---
title: Announcing SwiftKuery 3.0
blurb: We have recently released version 3.0 of Swift-Kuery along with version 2.0 of Swift-Kuery-PostgreSQL, SwiftKueryMySQL and Swift-Kuery-SQLite
date: "2018-12-18"
author: Matt Kilner
path: /blogs/announcing-swiftkuery-3-0
---

We have recently released version 3.0 of [Swift-Kuery](https://github.com/IBM-Swift/Swift-Kuery) along with version 2.0 of [Swift-Kuery-PostgreSQL](https://github.com/IBM-Swift/Swift-Kuery-PostgreSQL), [SwiftKueryMySQL](https://github.com/IBM-Swift/SwiftKueryMySQL) and [Swift-Kuery-SQLite](https://github.com/IBM-Swift/Swift-Kuery-SQLite). You can find a summary of the major changes below, for more detail on the changes please refer to the [Swift-Kuery migration guide](https://github.com/IBM-Swift/Swift-Kuery/blob/master/MigrationGuide.md).

##API changes

The SwiftKuery API has had an overhaul and has been updated to be entirely asynchronous.

You now pass callbacks to the API for establishing your connections and preparing statements in the same way as you do currently when executing your queries and transactions.

The API for retrieving results from the databases has also been updated to be asynchronous in style and you now pass a callback into the asRows function. A new API forEach has been added to allow iteration of the result set.

---

Asynchronous API behaviour

Previously the SwiftKuery API, while largely asynchronous in style, had underlying behaviour which was synchronous. In the SwiftKuery 3.0 and plugin updates the behaviour of the API has been reimplemented to be fully asynchronous.

With this change all code using the SwiftKuery API needs to be written in an asynchronous style. For example if you previously had code that did not nest API calls within the previous calls completion handler, such as the example below, you would now see undefined behaviour as both execute calls could run in parallel:

```swift
// BAD CODE
let query = Select(from: myTable)
connection.execute(query: query) { result in
    //Handle result
}
let newQuery = Select(from: otherTable)
connection.execute(query: newQuery) { result in
    //Handle result
}
```

For this to work in an asynchronous environment subsequent tasks must be chained in the preceding task’s completion handler, for example:

```swift
// CORRECT CODE
let query = Select(from: myTable)
connection.execute(query: query) { result in
    //Handle result
    let newQuery = Select(from: otherTable)
    connection.execute(query: newQuery) { result in
        //Handle result
    }
}
```

---

##Reuse table definitions

We have added the ability to specify a name for the table created from your structs. This will minimise duplication of code when wanting to use several tables with the same definition. For example the following could be used to represent both a Customer and an Employeee:

```swift
class Person: Table {
    let forename = Column("forename", String.self)
    let surname = Column("surname", String.self)
    let address = Column("address", String.self)
}
```

With the prior release you would need to define the same class twice naming it differently. Now you can simply name the table when you create it for example:

```swift
let customers = Person(name: "customers")
let employees = Person(name: "employees")
```

---

##MySQL 8 support and linker improvements

The update also adds support for MySQL version 8 and removes the requirements for specifying additional flags at build, test and run time on newer Swift releases.

MySQL version 8 includes some changes in the databases header files that were incompatible with version 5. We have updated the SwiftMySQL plugin to abstract these differences meaning the code you write will work on MySQL versions prior to and post 8.

We have also added pkg-config support so you no longer have to specify additional flags on your swift commands so long as you are running a MySQL release later than 5.5.

---

##Example usage

Below is a sample function that can be used in a Kitura route to retrieve data from a database:

```swift
func grades(_ callback: @escaping (String) -> Void) -> Void {
    connection.connect() { result in
        guard result.success else {
            guard let error = result.asError else {
                return callback("Error connecting: Unknown Error")
            }
            return callback("Error connecting: \(error)")
        }
        // Build and execute your query here.

        // First build query
        let query = Select(grades.course, grades.grade, from: grades)

        // Execute query
        connection.execute(query: query) { result in
            guard let resultSet = result.asResultSet else {
                guard let error = result.asError else {
                    return callback("Error executing query: Unknown Error")
                }
                return callback("Error executing query: \(error)")
            }
            var retString = ""
            resultSet.getColumnTitles() { titles, error in
                guard let titles = titles else {
                    guard let error = error else {
                        return callback("Error fetching column titles: Unknown Error")
                    }
                    return callback("Error fetching column titles: \(error)")
                }
                for title in titles {
                    //The column names of the result.
                    retString.append("\(title.padding(toLength: 35, withPad: " ", startingAt: 0))")
                }
                retString.append("\n")

                resultSet.forEach() { row, error in
                    guard let row = row else {
                        // A null row means we have run out of results unless we encountered an error
                        if let error = error {
                            return callback("Error fetching row: \(error)")
                        }
                        // No error so all rows are processed, make final callback passing result.
                        return callback(retString)
                    }
                    for value in row {
                        if let value = value {
                            let valueStr = String(describing: value)
                            let padStr = valueStr.padding(toLength: 35, withPad: " ", startingAt: 0)
                            retString.append(padStr)
                        }
                    }
                    retString.append("\n")
                }
            }
        }
    }
}
```

When called you will see results that look similar to this:

```
course                             grade                              
How to build your first computer   99                                 
How to work at a rock quarry       71
```

The full example can be found in the [Swift-Kuery-PostgreSQL](https://github.com/IBM-Swift/Swift-Kuery-PostgreSQL) GitHub repository within the Readme.md file.

---

##Future

Now that Swift-Kuery is entirely asynchronous we are ready for the future of Swift. The new APIs should transition seamlessly to async/await, and it should also be possible to take advantage of the new database drivers being discussed in the Swift Server Working Group.
