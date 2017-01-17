---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Exposing Swift Server Generator models over REST
menu: starter
lang: en
redirect_from: "/starter/generator/exposing_ssg_models_over_rest.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Exposing Swift Server Generator models over REST</h1>
</div>

Swift Server Generator models automatically have a standard set of HTTP endpoints that provide REST APIs for create, read, update and delete (CRUD) operations on model data.

---

## REST paths

The REST APIs are mounted to the `plural` model name in the [Model definition JSON file](model_definition_json_file.md). For example, a model named `location` with plural `locations` has its REST API mounted on `/api/locations`.

The REST API is as follows:

*Table 1. Model operations*

| Operation        | OpenAPI (Swagger 2.0) operationID | HTTP method | Path                      | Corresponding SQL | Example path       |
|------------------|-----------------------------------|-------------|---------------------------|-------------------|--------------------|
| Create           | create                            | POST        | `/api/{modelPlural}`      | INSERT            | `/api/locations`   |
| Index            | findAll                           | GET         | `/api/{modelPlural}`      | SELECT            | `/api/locations`   |
| Delete (destroy) | deleteAll                         | DELETE      | `/api/{modelPlural}`      | DELETE            | `/api/locations`   |
| Read             | findOne                           | GET         | `/api/{modelPlural}/{id}` | SELECT            | `/api/locations/1` |
| Update (modify)  | update                            | PATCH       | `/api/{modelPlural}/{id}` | UPDATE            | `/api/locations/1` |
| Update (modify)  | replace                           | PUT         | `/api/{modelPlural}/{id}` | UPDATE            | `/api/locations/1` |
| Delete (destroy) | delete                            | DELETE      | `/api/{modelPlural}/{id}` | DELETE            | `/api/locations/1` |

**Request format**

For POST, PUT and PATCH requests, the request body is in JSON format, and the `Content-Type` header set to `application/json`.

**Response format**

The response format for all requests is typically a JSON object/array in the body, and a set of headers. Some responses have an empty body.

For example:

    Date: Tue, 15 Nov 2016 11:13:07 GMT
    Content-Type: application/json
    Content-Length: 59
    Connection: Keep-Alive
    Keep-Alive: timeout=60, max=99
    [
      {
        "title":"MyNote",
        "content":"This is my first note",
        "id":"1":
      }
    ]

The HTTP status code indicates whether a request succeeded, as follows:

*Table 2.*

| Status code | Meaning                             |
|-------------|-------------------------------------|
| 2xx         | Success                             |
| 4xx         | There are problems with the request |
| 5xx         | There are server-side problems      |

The response for an error is in the following JSON format:

    error: <String_error_message>

For example:

    {
      "error": "Provided value (1234) for property 'type' has type (number) which is not compatible with the property type (string)"
    }


    [info]: ../../../assets/info-blue.png
    [tip]: ../../../assets/lightbulb-yellow.png
    [warning]: ../../../assets/warning-red.png
