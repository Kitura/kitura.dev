# Contributing to www.kitura.io

Content on this site is licensed under the Apache Licence, Version 2.0.

## All Changes

### Create development environment
1. Clone the kitura.io repo onto your machine:
	`git clone https://github.com/IBM-Swift/kitura.io`
2. Create a new branch for your development:
	`git checkout -b <branch>`
3. Once changes have been made, open a PR against master and link to the corresponding issue, if applicable.

## Changing an existing guide

Kitura.io is written in markdown.

When editing existing topics you should adhere to the following guidelines, doing so will provide styling for you.

### Headings

Use # tags for the title of the page.

Use ## tags for headers of sections.

Use ### tags for sub headers.

Use --- to separate sections.

### Normal text/paragraphs
There is no tag needed for writing normal text.

### Code Examples
Swift code blocks should be wrapped in:
```
```swift enter code here ```
```
Non-Swift code blocks and single code lines should be wrapped in:

```
``` enter code here ```
```

Wrap text in ** to make it appear bold, use this when stating file names.

### Tables
Tables should be structured as follows:
```
| Table Header 1 |	Table Header 2 | Tablee Header 3 |
| -------------- | --------------- | --------------- |
| Row 1          | Row 1           | Row 1           |
| Row 2          | Row 2           | Row 2           |
| Row 3          | Row 3           | Row 3           |
```

### Notices

The > tag can be used for notices that you want brought to a reader's attention.

## Creating a new guide

**NOTE** All points mentioned in the `Changing an existing guide` apply here as well.

In order to add new content to the side bar, navigate to **content** > **docs** > **docs-list.yaml** and format it like so:

```
- title: Guide
  id: guide-name
  items:
    - title: Title 1
      link: /docs/guide-name/title-2-name
    - title: Title 2
      link: /docs/guide-name/title-3-name
```

>Yaml is whitespace sensitive, so ensure your indentation is correct.

The content will appear on the side bar where it is located in the **docs-list.yaml** file.
