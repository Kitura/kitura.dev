---
title: Filtering in Swift-Kuery-ORM
blurb: In Kitura 2.4 we have made enhancements to Codable Query Parameters to support extra filtering
date: "2018-06-08"
author: Enrique Lacal
path: /blogs/filtering-swift-kuery-orm
---

##Introduction

In Kitura 2.4 we have made enhancements to Codable Query Parameters to support extra filtering. This includes the ability to filter using operators such as greater than, inclusive ranges and pagination through Codable Routing. We then took a further step and incorporated these capabilities into Swift-Kuery-ORM in order to filter results from database queries.

---

##Setting Up Swift-Kuery-ORM

In your Kitura application, follow the README to set up Swift-Kuery-ORM using PostgreSQL, MySQL or SQLite.

1. Create a Student type that implements Model:
```swift
struct Student: Model {
  let name: String
  let age: Int
  let grade: Double
}
```

2. Create the table in the database:
```swift
do {
  try Student.createTableSync()
} catch let error {
  print("Error:", error)
}
```

3. Save a list of students:
```swift
let students = [Student(name: "Mark", age: 26, grade: 78.5),
                Student(name: "David", age: 20, grade: 65.3),
                Student(name: "Alex", age: 23, grade: 82.7),
                Student(name: "Mark", age: 24, grade: 94.6)]
                 
for student in students {
  student.save { student, error in
    if let error = error {
      print("Error:", error)
    }
  }
}
```

4. Find a list of students and print them:

```swift
Student.findAll { students, error in
  if let error = error {
    print("Error:", error)    
  }
   
  if let students = students {
    students.forEach { print($0) }
```

Output:

```swift
Student(name: "Mark", age: 26, grade: 78)
Student(name: "David", age: 20, grade: 65)
Student(name: "Alex", age: 23, grade: 82)
Student(name: "Mark", age: 24, grade: 94)
```

This would translate in Raw SQL to:

```
SELECT * FROM Students;
```

---

##Using Query Parameters with Swift-Kuery-ORM

The following types have been added to Kitura 2.4 to enhance filtering:

- GreaterThan & LowerThan
- GreaterThanOrEqual & LowerThanOrEqual
- InclusiveRange & ExclusiveRange
- Pagination
- Ordering

Let’s suppose we want to filter over the name of the Student, the age being greater than a value and the grade being inside a range.

1. Let’s define our Query type that implements QueryParams:
```swift
struct Query: QueryParams {
  let name: String
  let age: GreaterThan<Int>;
  let grade: InclusiveRange<Double>;
} 
```

2. Create an instance of Query:
```swift
let query = Query(name: "Mark", age: GreaterThan(value: 23), grade: InclusiveRange(start: 76, end: 88))
```

3. Find the students matching the query and print them:

```swift
Student.findAll(matching: query) { students, error in
  if let error = error {
    print("Error:", error)    
  }
   
  if let students = students {
    students.forEach { print($0) }
  }
}
```

Output:

```swift
Student(name: "Mark", age: 26, grade: 78)
```

This would translate in Raw SQL to:

```
SELECT * FROM Students WHERE ((Students.name = "Mark") AND (Students.age > 23)) AND ((Students.grade >= 76) AND (Students.grade <= 88));
```

The URL would look like:

```
?name=Mark&age=23&grade=76,88
```

Now, we want only the first 3 values and they have to be ordered descending by grade:

1. Let’s define our MyQuery type that implements QueryParams:
```swift
struct MyQuery: QueryParams {
  let pagination: Pagination
  let order: Ordering
}
```

2. Create an instance of MyQuery:
```swift
let myQuery = MyQuery(pagination: Pagination(start: 0, size: 3), order: Ordering(by: .desc("grade")))
```

3. Find the students matching the query and print them:
```swift
Student.findAll(matching: myQuery) { students, error in
  if let error = error {
    print("Error:", error)    
  }
   
  if let students = students {
    students.forEach { print($0) }
  }
}
```

Output:

```swift
Student(name: "Mark", age: 24, grade: 94)
Student(name: "Alex", age: 23, grade: 82)
Student(name: "Mark", age: 26, grade: 78)
```

This would translate in Raw SQL to :

```
SELECT * FROM Students ORDER BY Students.grade DESC LIMIT 3 OFFSET 0;
```

The URL would look like:

```
?pagination=0,3&order=desc(grade)
```

---

##Working with Codable Routing in Kitura

Swift-Kuery-ORM really shines when used with Kitura, in particular because the ORM API has been aligned with Kitura’s Codable Routing APIs, allowing the completion handlers from the Codable Routes to be passed directly into the ORM calls. This means that no additional code needs to be written.

1. Create a handler that retrieves the students and register it with the Router for GET requests on /students:

```swift
func getStudents(completion: @escaping([Student]?, RequestError?) -> Void) -> Void {
    Student.findAll(completion)
}
 
router.get("/students", handler: getStudents)
```

This has implemented the following URI: GET: /students.

2. Create a handler that saves the students, and register it with the Router for POST requests on /students:

```swift
func saveStudents(student: Student, completion: @escaping (Student?, RequestError?) -> Void) -> Void {
    student.save(completion)
}
  
router.post("/students", handler: saveStudents)
```

This has implemented the following URI: POST: /students.

3. Now let’s add filtering to the GET route by updating the getStudents handler to also accept your type that implements QueryParams as an additional parameter:
Note: This is using the Query struct from earlier:

```swift
func getStudents(query: Query?, completion: @escaping([Student]?, RequestError?) -> Void) -> Void {
    Student.findAll(matching: query, completion)
}
```

This now implements a completely type-safe implementation of both the data handling, and the URL encoded query parameters for the following URI:

```
GET:  /users?name=<String>&age=<Int>&grade=<Int>,<Int>
```

Note: that the type Query is set to optional. This means that the following URI is also supported:

```
GET:  /users
```

If you want to include support for optional (non-required) query parameters, you just need to mark them as optional in your declared Swift type, eg: InclusiveRange?

We have increased the capabilities of Swift-Kuery-ORM and carefully aligned it with Kitura to make persistence as easy as possible whilst maintaining type safety.

---

##Future

The next features we are looking to integrate in Swift-Kuery-ORM, we believe will truly enhance its usage and provide essential functionalities. The following are just some of them:

- Migrations – the ability to apply incremental and reversible schema changes to the database.

- Relations between models – such as nested Models:

```swift
struct School: Model {
  let name: String
}
 
struct Student: Model {
  let name: String
  let age: Int
  let grade: Double
  let school: School
}
```

- Support for NoSQL Databases such as Redis, MongoDB and CouchDB.

- Control over data types and sizes

