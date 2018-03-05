---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Setting Up
menu: starter
lang: en
redirect_from: "/starter/setting up.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---
[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png

<div class="titleBlock">
	<h1>Setting Up</h1>
	<p>Kitura can run on both macOS and Linux.
	<br>
	To start, you’ll need to install a few prerequisites.</p>
</div>

## macOS

<span class="arrow">&#8227;</span> Download and install [Xcode 9](https://developer.apple.com/download/).

<span class="arrow">&#8227;</span> Install the Command Line Tools for Xcode:

```
$ xcode-select --install
```

<span class="arrow">&#8227;</span> Install [Homebrew](https://brew.sh).

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


<hr>
## Ubuntu Linux

Kitura is tested on Ubuntu 14.04 LTS and Ubuntu 16.04 LTS.

<span class="arrow">&#8227;</span> Install the following Linux system packages:
```
$ sudo apt-get update
$ sudo apt-get install clang libicu-dev libcurl4-openssl-dev libssl-dev
```
> ![info] Kitura requires OpenSSL v1.0.x, whereas newer versions of Linux may install OpenSSL v1.1.x. If this occurs, install OpenSSL v1.0.x using:
```
$ sudo apt-get install libssl1.0-dev
```

<span class="arrow">&#8227;</span> Download a Swift 4 toolchain from [swift.org](https://swift.org/download/).

<span class="arrow">&#8227;</span> After extracting the `.tar.gz` file, update your `PATH` environment variable so that it includes the extracted tools:

```
$ export PATH=<path to uncompressed tar contents>/usr/bin:$PATH
```

<hr>
## Next Steps

Now you are now ready to develop your first Kitura app. Learn how to [Get Started](/{{ page.lang }}/starter/gettingstarted.html).
