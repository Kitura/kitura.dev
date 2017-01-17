---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Swift Server Generator project layout reference
menu: starter
lang: en
redirect_from: "/starter/generator/project_layout_reference.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

<div class="titleBlock">
	<h1>Swift Server Generator project layout reference</h1>
</div>

Swift Server Generator project files and directories are stored in a predefined structure within the application root directory.

The standard project structure contains the following sub-directories within the application root directory:

-   `Packages`: Swift packages that are defined as application dependencies.
-   `Sources`: Swift source files.
       - The `/<application_name>` subdirectory contains the `main.swift` file for the application.
       - The `/Generated` subdirectory contains all generated Swift files, including those for models.
-   `models`: All model JSON files.
-   `definitions`: API and product definition YAML files.

The following table describes the project structure in more detail:

*Table 1. Swift Server Generator project structure*

| File or directory                   | Description |
|-------------------------------------|-------------|
| Top-level application directory     |             |
| **`/Packages` directory**           | Contains Swift packages as specified as dependencies in the Package.swift manifest file. These packages are downloaded during the Swift Package Manager build. |
| [`Package.swift`](package_swift.md) | Standard Swift package manifest file. |
| [`config.json`](config_json.md)     | Contains configuration information specific to this application. |
| **`/Sources` directory**            | Contains Swift application files. |
| `/<application_name>` directory     | Contains the `main.swift` file for the application. |
| `/Generated` directory              | Contains the generated Swift files for the application, including model Swift files. By convention, these files are called `<Model_name>.swift`; for example, a model called `customer` results in a Swift class file named `Customer.swift`. **Note:** Model names starting with a lower case alphabetic letter (as in the example above) are capitalized when they are converted to Swift classnames.                                                                                    |
| **/models directory**               | Contains [model definition JSON files](model_definition_json_file.md), by convention named `<model_name>.json`; for example, `customer.json`. |
| **/definitions directory**          | Contains API and product definition YAML files, by convention named `<application>.yaml` and `<application>-product.yaml`; for example `acmebank.yaml` and `acmebank-product.yaml`. |

> ![info] Note: Model names are as you enter them in the model generator and are used in the application endpoints in this way. Model names are converted to Swift class names according to the [Swift specifications for Identifiers](https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-ID410). In addition, the convention that Swift class names start with an uppercase letter is applied, unless the model name starts with an underscore character (_).



[info]: ../../../assets/info-blue.png
[tip]: ../../../assets/lightbulb-yellow.png
[warning]: ../../../assets/warning-red.png
