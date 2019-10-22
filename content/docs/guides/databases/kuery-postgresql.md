---
path: "/docs/databases/kuery-postgresql"
title: Installing PostgreSQL
---

# Installing and configuring a PostgreSQL database

---

## Step 1: Install the PostgreSQL client

To use Swift-Kuery-PostgreSQL you need to have the appropriate PostgreSQL C-language client installed.

### macOS

On macOS we can use Homebrew to install Postgres:
```
brew install postgresql
```

### Linux

On Linux we can use `apt` to install PostgreSQL:
```
sudo apt install postgresql postgresql-contrib
```
Linux requires that you [create a PostgreSQL user](http://postgresguide.com/setup/users.html).

---

## Step 2: Create a PostgreSQL database

Now that we have PostgreSQL installed we can create a database:
```
createdb bookstoredb
```
Then we can open the PostgreSQL command-line interface:
```
psql bookstoredb
```
Finally we can create a table in our database:
```
CREATE TABLE "BookTable" (
      id varchar(100) PRIMARY KEY,
      title text NOT NULL,
      price float8 NOT NULL,
      genre text NOT NULL
);
```
Enter `\q` in terminal to exit psql.

Now we're ready to connect to our database from our Kitura server.

---

## Step 3: Create a connection to a PostgreSQL database

Add [Swift-Kuery](https://github.com/IBM-Swift/Swift-Kuery#update-your-packageswift-file) and [SwiftKueryPostgreSQL](https://github.com/IBM-Swift/Swift-Kuery-PostgreSQL#add-dependencies) to the dependencies in the `Package.swift` file.

Inside the file which defines the routes, `KueryRoutes.swift`, import SwiftKuery and SwiftKueryPostgreSQL:
```swift
import SwiftKuery
import SwiftKueryPostgreSQL
```

Inside the `App` extension, create a connection pool of connections:
```swift
static let poolOptions = ConnectionPoolOptions(initialCapacity: 1, maxCapacity: 5)
static let pool = PostgreSQLConnection.createPool(host: "localhost", port: 5432, options: [.databaseName("bookstoredb")], poolOptions: poolOptions)
// Create table instance here
```

This creates a pool of connections for us to use to make requests to our database.

>If you are on Linux, you must provide your username and password in the options for `PostgreSQLConnection.createPool()`.

Now you can return to the [Swift-Kuery](/docs/databases/kuery#step-2-install-a-database-plugin) guide.
