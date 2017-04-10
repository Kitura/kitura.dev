---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Moving To A New Version Of The Swift Binaries
menu: resources
lang: en
redirect_from: "/resources/tutorial-todo.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Moving To A New Version Of The Swift Binaries</h1>
</div>

This page documents the steps the Kitura development team should follow when moving to a new version of the [Swift binaries](https://swift.org/download/):

1) Install the latest binaries (Swift) on OS X and (Swift + libdispatch) on Ubuntu v15.10 on your test systems.

2) Test the develop branch to determine if it builds on both operating systems using the latest binaries. This includes compilation of the **Kitura modules** and also the **test modules**. If Kitura and test modules build and execute just fine, then we can proceed to update the Docker image used for CI builds (i.e. notify a developer that can update the Docker image and test the Travis CI builds). 

3) If the Kitura modules and/or the test modules in the develop branch do not compile with the latest Swift binaries, then let's create a separate branch from develop to test further and make any necessary changes to have a successful. Please note that the main purpose for having a separate branch is to avoid breaking the develop branch and current Travis CI build while we figure things out. Note that having a separate branch will not address the tagging requirements imposed by SPM. If you find yourself having to make changes across multiple Kitura Swift Packages to build the modules and test classes with the latest Swift binaries, then the following approach is recommended:

* Navigate to the Packages folder and make any necessary changes in the corresponding Swift Package folders.
* You can then push those changes to a separate branch.
* Your changes are now saved and can be pulled down to different VMs or systems.

4) Update the binary version in [Kitura-Build](https://github.com/IBM-Swift/Kitura-Build) in `build_kitura_package.sh` on the develop branch.

5) Once we can compile and execute the Kitura modules and test modules using the Swift binaries, then we can proceed to update the Docker image used for Travis CI builds (i.e. notify a developer that can update the Docker image and test the Travis CI builds).

6) In addition, update the `vagrantfile` in Kitura.

7) Update the statement regarding version in README.md.
