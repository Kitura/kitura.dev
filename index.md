---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: home
title: Kitura
menu: home
lang: en
redirect_from: "/en/index.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div>
    {% include header/header-{{ page.lang }}.html %}
    <div id="overlay"></div>
</div>

<div class="main-content">
        <section class="splash">
          <img class="icon" src="../assets/appIcon@2x.png" height="125" width="125"/>
          <h1>Kitura</h1>
          <p class="text">A high performance and simple to use web framework for building modern Swift applications.</p>

          <a href="/{{ page.lang }}/starter/gettingstarted.html"><div class="button"><span class="store-button">Get started with Kitura</span></div></a>

        </section>

        <section class="integrate">
          <h2>Build end-to-end applications in Swift</h2>
          <p class="text">Kitura is a new, modular, package-based web framework written in the Swift language. Install, create and deploy in under 3 minutes.</p>
          <p><a href="https://github.com/IBM-Swift/Kitura">Get involved on GitHub</a>.</p>
          <div class="image"></div>
        </section>

        <section id="manage" name="manage" class="code">
          <div class="text-container">
            <h2>Built on core Swift technologies</h2>
            <p class="text">Kitura scales out of the box, thanks to Grand Central Dispatch. Create your app using Foundation APIs you already know, on macOS and Linux. Manage dependencies and versioning with Swift Package Manager.</p>
            <img class="illustration" src="../assets/kitura@2x.png" height="318" width="534"/>
          </div>
          <div class="image-container">
            <div class="screenshot"></div>
          </div>
        </section>

        <section class="manage">
          <div class="image-container">
            <div class="screenshot"></div>
          </div>
          <div class="text-container">
            <h2>Ready for the cloud</h2>
            <p class="text">Clone, build, push &ndash; using tools you already know. Easily deploy to cloud platforms like IBM Cloud, with buildpacks and Docker containers already provided.</p>
            <img class="illustration" src="../assets/BMcloud@2x.png" height="185" width="353"/>
          </div>
        </section>

        <section class="download">
          <img class="icon" src="../assets/appIcon@2x.png" height="125" width="125"/>
          <h1>Swift@IBM</h1>
          <p class="text">For more information on how IBM Engineering is optimising Swift for end-to-end development, visit our Developer Center.</p>
          <a href="https://developer.ibm.com/swift/"><div class="button"><span class="store-button">Swift@IBM DevCenter</span></div></a>
        </section>
