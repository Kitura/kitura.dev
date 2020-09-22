---
title: "Introducing SwiftKafka: Accessing Event Streams in Swift"
blurb: We have just released SwiftKafka, a new Swift package for producing and consuming from an Apache Kafka distributed streaming platform
date: "2019-08-13"
author: Andrew Lees
path: /blogs/swift-kafka-event-streams
---

We have just released [SwiftKafka](https://github.com/Kitura/SwiftKafka), a new Swift package for producing and consuming from an Apache Kafka distributed streaming platform. This blog post explains why you would use Apache Kafka, how you can use the Swift Kafka API and provides an example of producing and consuming messages.

##What is Apache Kafka?

Apache Kafka is a distributed event streaming platform capable of handling trillions of events a day. A streaming platform has three key capabilities:

- Publish and subscribe to streams of records, similar to a message queue or enterprise messaging system.
- Store streams of records in a fault-tolerant durable way.
- Process streams of records as they occur.

Instead of sending messages directly from a producer to a consumer, Kafka stores streams of records in categories called topics. Producers add messages to a topic and consumers read messages from a topic. Producing and consuming from a stream is very cheap and works with Kafka’s built in distributed architecture. The result is a messaging system that is fast, fault tolerant and can handle high volumes of data.

If you would like to learn more about Kafka, check out the [Apache Kafka website](https://kafka.apache.org/intro.html).

---

##Swift Kafka

The new [SwiftKafka](https://github.com/Kitura/SwiftKafka) library is built on top of the [librdkafka](https://github.com/edenhill/librdkafka) C library. This provides high performance messaging with an easy to use Swift API. Swift Kafka provides three classes that you will need to connect your application to event streams:

###KafkaProducer

The `KafkaProducer` class produces messages to a Kafka server.

Once you have initialized a KafkaProducer, you can call `connect(brokers:)` to connect to one or more Kafka servers.

The producer can then call `send()` with a `KafkaProducerRecord`, which contains the following fields:

- Topic: The topic where the producer sends the record. If this topic doesn’t exist, the producer will try to create it.
- Value: The body of the message that will be sent with the record.
- Partition: The topic partition where the producer sends the record. If this is not set the server will automatically assign the partition.
- Key: If the partition is not set, the server will assign records with the same key to the same partition. Since order is guaranteed within a partition, these records will be consumed in the order they were produced.

The message is sent to the connected brokers and the Kafka server stores the message on a partition of the topic.

###KafkaConsumer

The `KafkaConsumer` class consumes messages from a Kafka server.

Once you have initialized a `KafkaConsumer`, you can call `connect(brokers:)` to connect to one or more Kafka servers.

You can then subscribe to topics using `subscribe()`. This will distribute the topic partitions evenly between consumers with the same group id. If you do not set a group id, a random UUID will be used.

Alternatively, you can use `assign()` to manually set the partition and offset where the consumer will consume from.

Both `subscribe()` and `assign()` are asynchronous and will return immediately, however they may take up to sessionTimeoutMs (default 10 seconds) * 2 before the consumer connects and is assigned partitions.

To consume messages from Kafka you call poll `(timeout:)`. This will poll Kafka, blocking for timeout seconds. When the function completes, you are returned an array of `KafkaConsumerRecord`, with the following fields:

- Value: The message value, if it can be UTF8 decoded to a String.
- ValueData: The message value as raw data.
- Key: The message key, if it can be UTF8 decoded to a String.
- KeyData: The message key as raw data.
- Offset: The message offset.
- Topic: The topic that the message was consumed from.
- Partition: The partition that the message was consumed from.

When you have finished consuming, you can call `close()` to close the connection and unassign the consumer. The Kafka server then rebalances the unassigned partitions between other consumers in the group. If you don’t call `close()`, the consumer will be closed when the class is deallocated.

###KafkaConfig

The `KafkaConfig` class contains your settings for a Kafka consumer or Kafka producer. You pass an instance of this class to the Kafka client initializer to set its configuration.

You initialize the class with default values, which you can change using the helper functions. For example, if you want to enable all logging, you would set the debug variable:

```swift
let config = KafkaConfig()
config.debug = [.all]
```

---

##Swift Kafka Example

To demonstrate Swift Kafka, we are going to create a producer that reads user input and sends it to the Kafka server and a consumer that reads the message and prints it back to the user. The first thing we need is a Kafka server to connect to:

###Setting up a Kafka Server (Mac)

For macOS, we will use [Homebrew](https://brew.sh) to install and run the server:

1. Install `librdkafka` (required to build SwiftKafka)

```
$ brew install librdkafka
```

2. Install Kafka server (and Java dependency)

```
$ brew cask install java
$ brew install kafka
```

3. Start the Zookeeper service

```
$ brew services start zookeeper
```

4. Start the Kafka service

```
$ brew services start kafka
```

These commands will install and run Zookeeper and Kafka as background services. Zookeeper is a centralized service that maintains information within distributed systems and is required by Kafka.

---

###Setting up a Kafka Server (Linux)

On Linux, please follow the [Kafka quick start instructions](https://kafka.apache.org/quickstart) and [install librdkafka](https://github.com/edenhill/librdkafka#installing-prebuilt-packages).

---

###Create a Kafka Producer

We will create a simple producer that reads user input from the terminal and sends it to a Kafka topic using Swift Kafka.

1. Create an executable Swift project

```
$ mkdir kafkaProducer
$ cd kafkaProducer/
$ swift package init --type executable
```

2. Add Swift Kafka

Open your `Package.swift` file:

```
$ open Package.swift
```

Add Swift Kafka to your dependencies:

```
.package(url: "https://github.com/Kitura/SwiftKafka.git", from: "0.0.0")
```

Then add `SwiftKafka` to your target dependencies.

```
.target(
            name: "kafkaProducer",
            dependencies: ["SwiftKafka"]),
```

3. Add the `KafkaProducer` code

```
open Sources/kafkaProducer/main.swift
```

Replace the code in this file with:

```swift
import SwiftKafka

let config = KafkaConfig()
config.brokerAddressFamily = .v4
if let producer = try? KafkaProducer(config: config) {
let connection = producer.connect(brokers: "localhost:9092")
    print("Connected to \(connection) brokers")
    print("Enter message to produce to Kafka:")
    while(true) {
        if let userInput = readLine() {
            producer.send(producerRecord: KafkaProducerRecord(topic: "example", value: userInput)) { result in
                switch result {
                case .success(let record):
                    print("Successfully produced: \(record.value as Any) to offset: \(record.offset)")
                case .failure(let error):
                    print("Failed to send message with error: \(error.description)")
                }
            }
        }
    }
}
```

This code will initialize a new KafkaProducer. We have configured our producer to only connect to brokers on IPv4 since we are running on localhost. We then connect to the Kafka server we started earlier on the default port of “9092”. The program will then read user input from the terminal and send it to the broker.

You can test this out by running the program in terminal:

```
$ swift run
```

---

###Create a Kafka Consumer

We will create a simple consumer that reads everything from a topic and prints it to the terminal.

1. Create an executable Swift project

We start by creating an executable Swift project using the same steps as above:

```
$ mkdir kafkaConsumer
$ cd kafkaConsumer/
$ swift package init --type executable
```

2. Add Swift Kafka

Open your `Package.swift` file:

```
$ open Package.swift
```

Add Swift Kafka to your dependencies:

```
.package(url: "https://github.com/Kitura/SwiftKafka.git", from: "0.0.0")
```

Then add `SwiftKafka` to your target dependencies.

```
.target(
            name: "kafkaProducer",
            dependencies: ["SwiftKafka"]),
```

3. Add the `KafkaConsumer` code

```
open Sources/kafkaConsumer/main.swift
```

Replace the code in this file with:

```swift
import SwiftKafka

let config = KafkaConfig()
config.autoOffsetReset = .beginning
config.brokerAddressFamily = .v4
config.groupId = "exampleGroup"
do {
    let consumer = try KafkaConsumer(config: config)
    let connection = consumer.connect(brokers: "localhost:9092")
    print("Connected to \(connection) brokers")
    print("Waiting for messages from Kafka:")
    try consumer.subscribe(topics: ["example"])
    while(true) {
        let records = try consumer.poll()
        for record in records {
            print("Consumed message: \(record.value as Any) from offset \(record.offset)"
            )
        }
    }
} catch {
    print("Error thrown: \(error.localizedDescription)")
}
```

This code will initialize a new KafkaConsumer. We have configured our producer to only connect to brokers on IPv4 since we are running on localhost, to begin consuming from the start of all messages and to consume with a group id of “exampleGroup”. We then connect to the Kafka server we started earlier on the default port of “9092”. The program will then read messages from the “example” topic and print the message.

You can test this out by running the program:

```
$ swift run
```

Once the consumer connects to Kafka it should consume all the messages you sent from the producer and print them to the terminal.

##Next steps

Congratulations! You have just set up an Apache Kafka event stream platform and connected a producer and consumer in Swift.

If you would like learn more about SwiftKafka, [check it out on GitHub](https://github.com/Kitura/SwiftKafka).

If you would like to learn more about using the SwiftKafka API, [visit our API reference](https://ibm-swift.github.io/SwiftKafka/index.html).

Any questions or comments? Please join the Kitura community on [Slack](http://swift-at-ibm-slack.mybluemix.net/?cm_sp=dw-bluemix-_-swift-_-devcenter&_ga=2.118803593.186671014.1570626561-1743126121.1570022962&cm_mc_uid=83263075142115698398229&cm_mc_sid_50200000=53695431570707266328)!
