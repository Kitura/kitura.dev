---
path: "/docs/databases/what-are-databases"
title: What are Databases?
---

#What are Databases?

A database is a computerized system that is used to host a collection of information which is organized in a way that allows it to be easily accessed, managed and updated.

Databases exist everywhere in the real world. For example, your local supermarket will have a database that stores information regarding all its products. When the cashier scans an item at the checkout a request is made to their database using the unique barcode for that item. The price and name for that item are retrieved from the database, this information is then printed to your receipt.

There are two main types of databases, SQL (or relational) and NoSQL (or non-relational). Kitura has support for both types. In this guide, we will describe SQL databases first and how Kitura provides support for them, then we will define what is meant by the term NoSQL database and list which NoSQL databases Kitura supports.

---

##SQL Databases

SQL databases are table based databases, that is you create tables within your database to store information in. These tables have columns defined to organize the data and rows inserted to add values to the columns.

###Swift-Kuery

Swift-Kuery is a pluggable SQL database abstraction layer; this is how Kitura provides support for users wishing to use SQL databases, whether directly or via the ORM (see the section below). The intent of the Kuery library is to unify the APIs to the various relational databases, providing a Swifty yet SQL-like API for users. This allows easy switching between different databases.

Kitura has support for the following SQL databases:

- PostgreSQL using the Swift-Kuery-PostgreSQL plugin.
- MySQL using the SwiftKueryMySQL plugin.
- SQLite using the Swift-Kuery-SQLite plugin.

###Swift-Kuery-ORM

Swift-Kuery-ORM is an Object Relational Mapping library (ORM) built for Swift. The ORM provides APIs which simplify the persistence of model objects, by allowing you to interact with the database directly from your Swift types (structs and classes).

The ORM doesn’t require you to directly specify how the data should be represented in the database. You define your Swift type as a class or a struct, extend it to conform to the Model protocol (which requires no additional code) and the ORM automatically generates a table schema for you. You can then save, fetch, update and delete directly by calling functions on your Swift type.

The ORM is built on top of Swift-Kuery, this means that it can be used with any database that is supported by Kuery. If the functionality of the ORM is insufficient, you can use Kuery directly for more complex SQL queries.

---

##NoSQL Databases

NoSQL databases are document based, key-value pairs, graph databases or wide-column stores which do not have standard schema definitions which they need to adhere to unlike SQL databases.

Kitura has support for the following NoSQL databases:

- CouchDB and IBM Cloudant use the same API so the Kitura-CouchDB plugin works with either database.
- MongoDB using the third party MongoKitten repository.
