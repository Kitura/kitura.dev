---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Installing Kitura
menu: starter
lang: en
redirect_from: "/starter/installing.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Installing

Kitura can run on macOS and Linux.

* [macOS](#macos)
* [Ubuntu Linux](#ubuntu-linux)

## macOS

1. Download and install [Xcode 8](https://developer.apple.com/download/).

2. There is no step 2.

> Note: if you have been using the Xcode 8 betas, you may also need to run `sudo xcode-select -r` to reset your selected developer directory.

## Ubuntu Linux

Kitura is tested on Ubuntu 14.04 LTS and Ubuntu 15.10.

1. Install the following Linux system packages:

    `$ sudo apt-get install libcurl4-openssl-dev uuid-dev`

2. Download Swift 3.0 from [swift.org](https://swift.org/download/).

3. After extracting the `.tar.gz` file, update your `PATH` environment variable so that it includes the extracted tools: `export PATH=/<path to uncompress tar contents>/usr/bin:$PATH`.

# Next Steps

Now you are ready to develop your first Kitura app. Learn how to [get started](/en/starter/gettingstarted.html).
