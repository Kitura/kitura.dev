---
path: "/docs/websockets/echo-server"
title: Echo Server
---

# Echo Server

The application we are going to create is a very simple Echo Server, this is a server that will receive a message from a client and then echo back the same message to all clients connected to the server, this is the simplest implementation of WebSockets.

---

## Step 1: Pre-requisites

Before creating the server, we need to make sure everything is set up correctly, [Node.js](https://nodejs.org/en/) must be installed and the project directories should be created with this terminal command:
```
mkdir EchoServer
cd EchoServer
touch Package.swift
mkdir Sources
cd Sources
mkdir ChatServer
cd ChatServer
touch ChatService.swift
touch main.swift
```

>You can use Swift for the client, however for simplicitiy we are using Node.js in this example.

---

## Step 2: Setting up the Server

Add the following content to your `Package.swift` file, replacing "x.x.x" with the latest releases of [Kitura](https://github.com/IBM-Swift/Kitura/releases), [HeliumLogger](https://github.com/IBM-Swift/HeliumLogger/releases), [Kitura-WebSocket](https://github.com/IBM-Swift/Kitura-WebSocket/releases) and [Kitura-WebSocket-NIO](https://github.com/IBM-Swift/Kitura-WebSocket-NIO/releases):
```swift
import PackageDescription

let package = Package(
    name: "ChatServer",
    dependencies: [
         .package(url: "https://github.com/IBM-Swift/Kitura.git", .upToNextMinor(from: "x.x.x")),
         .package(url: "https://github.com/IBM-Swift/HeliumLogger.git", from: "x.x.x"),
    ],
    targets: [
        .target(
            name: "ChatServer",
            dependencies: ["Kitura", "HeliumLogger", "Kitura-WebSocket"]),
    ]

// Use alternate implementation of Kitura-WebSocket while building in NIO mode
if ProcessInfo.processInfo.environment["KITURA_NIO"] != nil {
    dependencies.append(.package(url:  "https://github.com/IBM-Swift/Kitura-WebSocket-NIO.git", from: "x.x.x"))
} else {
    dependencies.append(.package(url: "https://github.com/IBM-Swift/Kitura-WebSocket.git", from: "x.x.x"))
}

)
```

>[This code snippet](/docs/configuring/swiftnio#using-kitura-websocket-nio) allows either [Kitura-WebSocket](https://github.com/IBM-Swift/Kitura-WebSocket) or [Kitura-WebSocket-NIO](https://github.com/IBM-Swift/Kitura-WebSocket-NIO) packages to be used.

Add the following to your `ChatService.swift` file:

```swift
import Foundation

import KituraWebSocket

class ChatService: WebSocketService {

    private var connections = [String: WebSocketConnection]()

    let connectionTimeout: Int? = 60

    public func connected(connection: WebSocketConnection) {
        connections[connection.id] = connection
    }

    public func disconnected(connection: WebSocketConnection, reason: WebSocketCloseReasonCode) {
        connections.removeValue(forKey: connection.id)
    }

    public func received(message: Data, from: WebSocketConnection) {
        from.close(reason: .invalidDataType, description: "Chat-Server only accepts text messages")

        connections.removeValue(forKey: from.id)
    }

    public func received(message: String, from: WebSocketConnection) {
        for (connectionId, connection) in connections {
            if connectionId != from.id {
                connection.send(message: message)
            }
        }
    }
  }
}
```

The class has a Dictionary, connections, which is used to keep track of the connections of all of the connected clients. The Dictionary is maintained by the connected and disconnected functions, which are, respectively, adding and removing connections from the dictionary.

The received function, which receives binary messages, is rejecting the message, closing the client connection and removing the connection from the set of known connections.

Lastly, the received function, which receives text messages, simply echoes the message received to all clients except the one who sent the message.

It should be noted that all of these functions can be invoked from many threads simultaneously. In real applications, one should add locking around the access of non-thread safe artifacts of the application such as the connections Dictionary in this very simplistic example.

Add the following to your `main.swift` file:
```swift
import Foundation

import KituraNet
import KituraWebSocket

import HeliumLogger
import LoggerAPI

// Using an implementation for a Logger
HeliumLogger.use(.info)

WebSocket.register(service: ChatService(), onPath: "chat")

class ChatServerDelegate: ServerDelegate {
    public func handle(request: ServerRequest, response: ServerResponse) {}
}

// Add HTTP Server to listen on port 8080
let server = HTTP.createServer()
server.delegate = ChatServerDelegate()

do {
    try server.listen(on: 8080)
    ListenerGroup.waitForListeners()
} catch {
    Log.error("Error listening on port 8080: \(error).")
}
```

The `HeliumLogger` is set up to log info, warning, and error type messages.

The ChatService defined in the `ChatService.swift` file is registered on the path chat.

An HTTP server is created and setup to listen on port 8080.

With this server set up clients should connect to the chat service as ws://host:8080/chat, where host is the host running the server.

---

## Step 3: Setting up the Client

The client has a simple command line interface. At startup one passes the host and port number. The client simply reads messages to be sent from the terminal and displays messages received on the terminal as well.

To create a new directory for the client, exit out of your server directory and run this terminal command:
```
mkdir EchoClient
cd EchoClient
touch package.json
touch chat.js
```
Add the following content to your `package.json` file:
```json
{
  "name": "chat",
  "description": "Simple chat server client",
  "version": "0.0.1",
  "engines": {
    "node": ">=0.8.0"
  },
  "dependencies": {
    "websocket": "^1.0.23"
  }
}
```
Then add the following content to your `chat.js` file:
```javascript
/* main file of Simple Chat Server Client */

var readline = require('readline');
var WebSocketClient = require('websocket').client

var host = process.argv[2];

rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('> ');
rl.prompt();
var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
    process.exit();
});

client.on('connect', function(connection) {
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
        process.exit();
    });

    connection.on('close', function(reasonCode, description) {
        console.log('chat Connection Closed. Code=' + reasonCode + ' (' + description +')');
    });

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('\r=> ' + message.utf8Data);
            rl.prompt();
        }
    });

    rl.on('line', function(line) {
        connection.sendUTF(line);
        rl.prompt();
    });

    rl.on('close', function() {
        connection.close();
        console.log('Have a great day!');
        process.exit(0);
    });

    rl.prompt();
});
client.connect("ws://" + host +"/chat", "chat");
```

---

## Step 4: Building and Running your server

To build the server, go in to your server directory and run the command:
```
swift build
```
To run the server, in the same directory, run:
```
.build/debug/ChatServer
```
The server will now be up and running. The informational log message below will be displayed:
```
[INFO] [HTTPServer.swift:124 listen(on:)] Listening on port 8080
```

---

## Step 5: Setting up and Running the client

To setup the client, open a new terminal window, go in to your client directory and run the command:
```
npm install
```

>That will install the WebSocket package.

To run the client, go into your client directory and run the following command (**Note**: You will need to open multiple terminal windows and run the client multiple times to see the example action):
```
node chat.js localhost:8080
```
You can then enter a message on one client and see it appear on another client and vice versa.
