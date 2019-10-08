---
path: "/docs/databases/kuery-sqlite"
title: Installing SQLite
---

# Installing and configuring a SQLite database

---

## Step 1: Install SQLite

To use Swift-Kuery-SQLite you need to first install SQLite:

### macOS

On macOS we can use Homebrew to install SQLite:
```
brew install sqlite
```
### Linux

On Linux we can use `apt-get` to install SQLite:
```
sudo apt-get install sqlite3 libsqlite3-dev
```

---

## Step 2: Create an SQLite database

Now that we have SQLite installed we can create a database file.

In terminal return to your home directory:
```
cd ~
```
Use the SQL command line to create your database:
```
sqlite3 bookstoredb.sqlite
```
Remaining in the command line, create an SQL table:
```
CREATE TABLE BookTable (
      id varchar(100) primary key,
      title text,
      price real,
      genre text
);
```

press `Control-d` to exit SQLite.

Now we're ready to connect to our database from our Kitura server.

---

## Step 3: Create a connection to an SQLite database

Add [Swift-Kuery](https://github.com/IBM-Swift/Swift-Kuery#update-your-packageswift-file) and [SwiftKuerySQLite](https://github.com/IBM-Swift/Swift-Kuery-SQLite/#add-dependencies) to the dependencies in the `Package.swift` file.

Inside the file which defines the routes, `KueryRoutes.swift`, import the SwiftKuery and SwiftKuerySQLite packages:
```swift
import SwiftKuery
import SwiftKuerySQLite
```
Inside the `App` extension, create a connection pool by passing in the path to your database file:
```swift
static let path = NSString(string: "~/bookstoredb.sqlite").expandingTildeInPath
static let poolOptions = ConnectionPoolOptions(initialCapacity: 1, maxCapacity: 5)
static let pool = SQLiteConnection.createPool(filename: String(path), poolOptions: poolOptions)
// Create table instance here
```

This creates a pool of connections for us to use to make requests to our database.

Now you can return to the [Swift-Kuery](./kuery#step-2-install-a-database-plugin) guide.
