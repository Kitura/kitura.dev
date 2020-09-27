---
path: "/docs/getting-started/create-server-cli"
title: Create a Kitura server using Kitura CLI
---

# Create a server with the Kitura CLI

The Kitura command-line interface (CLI) allows you to quickly generate a Kitura project.

---

## Step 1: Installing the CLI

### Install via brew (macOS)

>For this installation you will need to have Homebrew installed.  If you do not have Homebrew installed you can follow the [Homebrew installation steps](https://docs.brew.sh/Installation)

Install Kitura’s Homebrew tap to allow ‘brew’ to access Kitura’s package repository:
```
brew tap ibm-swift/kitura
```

Install Kitura’s command-line interface:
```
brew install kitura
```

Verify that Kitura CLI is installed by running:
```
kitura --version
```
If the installation was successful we would see information about the version.

### Install via curl (macOS or Linux)

You can install (either on Mac or Linux) with:

```
curl -fsSL https://github.com/Kitura/kitura-cli/releases/latest/download/install.sh | sudo bash
```

Verify that Kitura CLI is installed by running:
```
kitura --version
```
If the installation was successful we would see information about the version.

---

## Step 2: Create a directory

Kitura CLI needs to be run in an empty directory so you will need to create a new directory for your server:
```
mkdir MyKituraApp && cd MyKituraApp
```

---

## Step 3: Create a Kitura server

Create a Kitura application using the Kitura CLI:
```
kitura init
```

`kitura init` will create a cloud-ready Kitura application in your current directory.

The name of your project will be the same as the directory name.

>The generated project contains a Swift 5.0 `Package.swift` file.

---

## Step 4: Start the Kitura server

By default `kitura init` builds our server code so we just need to run the server:
```
swift run
```

Once the terminal output contains:
```
[INFO] [HTTPServer.swift:195 listen(on:)] Listening on port 8080
```
We can navigate to: <a href="http://localhost:8080" target="blank">localhost:8080</a> to view our server.

---

## Next steps

[Routing:](../routing/what-is-routing) Learn about routing and the two types Kitura supports.
