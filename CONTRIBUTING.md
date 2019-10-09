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

Kitura.io is written in Markdown.

When editing existing topics you should adhere to the following guidelines, doing so will provide styling for you.

### Headings

Use # tags for the title of the page.

Use ## tags for headers of sections.

Use ### tags for sub headers.

Use --- to separate sections.

### Normal text/paragraphs
There is no tag needed for writing normal text.

### Code Examples
You can create Swift code blocks by using triple backticks followed by the word swift <code>```swift</code> before the code block, and triple backticks after.


You can create non-Swift code blocks by using triple backticks <code>```</code> before and after the code block.

File names and variable names should be wrapped in single backticks <code>`</code>

### Tables
Tables should be structured as follows:
```
| Table Header 1 | Table Header 2  | Table Header 3  |
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
  id: guide
  items:
    - title: Title 1
      link: /docs/guide-name/title-1
    - title: Title 2
      link: /docs/guide-name/title-2
```

>Yaml is whitespace sensitive, so ensure your indentation is correct.

The content will appear on the side bar where it is located in the `docs-list.yaml` file.
