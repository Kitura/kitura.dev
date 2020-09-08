---
title: Community first steps
blurb: Next steps as a community project
date: "2020-09-07"
author: Danny Sung
path: /blogs/community-first-steps
---

Hi all,

The next step in transitioning Kitura to a community project, while not a
breaking change, is potentially a big one so I wanted to make sure everyone is
aware of what is happening.  Starting Saturday 12, 2020, I will begin migrating
active repositories from the IBM-Swift github organization to the Kitura
organization.

This will mean that your package references will change from
https://github.com/IBM-Swift/Kitura to https://github.com/Kitura/Kitura .
GitHub will automatically redirect your requests from the old URL to the new
one.  So again, this should not be a breaking change.  However it will be good
for you to switch your URL pointers at some point in the future.

I will begin the transition with some less active repositories.  If all goes
well, I aim to end the migration with the actual `Kitura` repository within a
couple weeks.  This should give enough time anyone with problems to report
them.

On another front, a few people have chimmed in to help with the project.  While
we don't have a formal roadmap yet, here's a few things on the top of my mind:

 - Aim for NIO by default
 - To do this, we'll need to ensure unit tests are:
    + running successfully
    + updated to include new versions of swift and Xcode
 - Automate performance testing
 - Enhance Kuery-ORM for usability
 - Ensure we have good code quality management tools
 - We always need people to help with code reviews and documentation

If you’re interested in helping to shape the future direction of Kitura, please
reach out! No role is too small or too big! Please follow-up on the
[forums](https://forums.swift.org/c/related-projects/kitura/31) or
[Slack](http://swift-at-ibm-slack.mybluemix.net/).


Thanks!

Danny

