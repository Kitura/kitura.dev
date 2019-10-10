---
path: "/docs/databases/kuery-mysql"
title: Installing MySQL
---

# Installing and configuring a MySQL database

---

## Step 1: Install MySQL

To use Swift-Kuery-MySQL you need to first install MySQL:

### macOS

On macOS we can use Homebrew to install MySQL:
```
brew install mysql
```
Then we can start MySQL:
```
mysql.server start
```
### Linux

On Linux we can use `apt-get` to install MySQL:
```
sudo apt-get install mysql-server libmysqlclient-dev pkg-config
```
Then we can start the MySQL service:
```
sudo service mysql start
```
We can view the default user/password for MySQL with the following command:
```
sudo cat /etc/mysql/debian.cnf
```

---

## Step 2: Create a MySQL database

Now that we have MySQL installed we can open the MySQL command-line interface:
```
mysql -u root
```
Using the MySQL command-line interface, we create a user:

>You can replace `kitura` and `password` with your own username and password.

```
GRANT ALL PRIVILEGES ON *.* TO 'kitura'@'localhost' IDENTIFIED BY 'password';
```

Then we can create a database:
```
CREATE DATABASE bookstoredb;
```
Then we want to use this database:
```
USE bookstoredb;
```
Finally we can create a table in our database:
```
CREATE TABLE BookTable (
      id VARCHAR(100) not null,
      title VARCHAR(100) not null,
      price DOUBLE not null,
      genre VARCHAR(100) not null,
      constraint pk_example primary key (id)
);
```
Enter `\q` in terminal to exit mysql.

Now we're ready to connect to our database from our Kitura server.

---

## Step 3: Create a connection to a MySQL database

Add [Swift-Kuery](https://github.com/IBM-Swift/Swift-Kuery#update-your-packageswift-file) and [SwiftKueryMySQL](https://github.com/IBM-Swift/SwiftKueryMySQL#add-dependencies) to the dependencies in the `Package.swift` file.

Inside the file which defines the routes, `KueryRoutes.swift`, import the SwiftKuery and SwiftKueryMySQL packages:
```swift
import SwiftKuery
import SwiftKueryMySQL
```

Inside the `App` extension, create a connection pool of connections:
```swift
    static let poolOptions = ConnectionPoolOptions(initialCapacity: 1, maxCapacity: 5)
    static let pool = MySQLConnection.createPool(user: "kitura", password: "password", database: "bookstoredb", poolOptions: poolOptions)
    // Create table instance here
```

This creates a pool of connections for us to use to make requests to our database.

Now you can return to the [Swift-Kuery](/docs/databases/kuery/#step-2-install-a-database-plugin) guide.
