---
path: "/docs/sessions/what-are-sessions"
title: What are Sessions?
---

#What are Sessions?

A session is server-side storage of information that will be persisted through a user's interaction with the application. When you first visit the server, you are provided with a cookie with a unique session id. The user presents this cookie with future requests so that the server can identify that the requests have come from the same user. Information associated with that session id can then be used to respond to the request. For example, you could persist the user's name, whether they are logged in, and their shopping basket inside a session. Kitura implements sessions using the [Kitura-Session](https://github.com/Kitura/Kitura-Session) library.

A session, unlike a database, is intended to be temporary. If it is not updated or if the session is ended, such as a user logging out, then it is cleared.

Sessions are not the same as authentication, although they are often used together. Authentication is used to verify a user's credentials to identify who they are. A session is used to check that the current request is from the same user as a previous request. You can learn more about authentication in our [What is Authentication?](../authentication/what-is-authentication) guide.

##Next steps

[Session with Codable routes](./codable-session): Learn how to persist the user's information between multiple requests on codable routes.

[Session with Raw routes](./raw-session): Learn how to persist the user's information between multiple requests on raw routes.
