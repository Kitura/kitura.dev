## Contributing to www.kitura.io

Content on this site is licensed under the Apache Licence, Version 2.0.

**Important**: If you clone this site to a Windows system you must configure Git to handle the correct line ending characters by running the following command:
`git config --global core.autocrlf true`

Topics in the English language can be found in the `en/` folder. Within this folder, topics for the website are written in Markdown, and are contained in folders that represent the website menu:

- Getting started: `en/starter/`
- Tutorials: `en/support/`
- API: `en/api/`
- Support: `en/resources/`

If you want to add topics or update existing topics, please open an Issue or create a Pull request with your changes.

---

### Changing an existing topic

- If you add a link to another page on Kitura.io, use the page language variable by prefixing `/{{ page.lang }}`. For example, to link to the *Getting Started* topic, use:
	`/{{ page.lang }}/starter/gettingstarted.html`

- All headings within the body of the topic should use h2 (represented by two hashes `##`), while h3 (three hashes `###`) can be used for sub-headings.
- Use three hyphens (`---`) to create a horizontal rule above each heading. Make sure to leave a single-line gap in the Markdown above and below these hyphens.
- To automatically add a styled callout ('Info', 'Tip', or 'Warning'), you can use the following syntax:
	- `> ![info] <add text here>` - This creates a blue callout, with a circular 'i' information icon.
	- `> ![tip] <add text here>` - This creates a yellow callout, with a lightbulb icon.
	- `> ![warning] <add text here>` - This creates a red callout, with an exclamation-mark warning icon.
- To automatically highlight Swift syntax in a code block, use the following Markdown:

        ```swift
            <add swift code here>
        ```

- To document a process that is longer or more complex than a series of single-line numbered steps, you can use the following HTML to create an arrow icon. Use this arrow icon to highlight the beginning of each new step:
    `<span class="arrow">&#8227;</span>`

---

### Creating a new topic

- All points in the "Changing an existing topic" section also apply when creating a new topic.
- If your new topic needs to be accessible from the main menu, follow these steps:
    1. Open the file `_includes/header/header-en.html`.
    2. Use the existing format as a guide to add new items to the menu.
    3. For example, to add a new sub-menu item to the "Getting Started" menu, add a new `<li>` element to the parent `<ul>` element:

        `<li><a href="/{{ page.lang }}/starter/example.html">Example Title</a></li>`
- At the beginning of every new topic, a YAML header is required. For example:

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
  - Only change the values of `title`, `menu`, `lang`, and `redirect_from`, as required.
  - The value of `menu` should be one of the Markdown directories: `api`, `resources`, `starter`, or `support`.
  - The value of `redirect_from` should be the path to the Markdown file that you are creating, relative to the parent `en` directory (or other language). Note that this path uses the `.html` suffix, instead of `.md`.
- Directly after the YAML header, add the following HTML to create a title section:

        <div class="titleBlock">
            <h1>Title of the topic</h1>
            <p>This sub-heading, or one-sentence introduction, is optional</p>
        </div>
        
- At the end of every new topic, add the following html:
```html
<section class="social-section">
	<div class="social-link">
		<a rel="nofollow" href="http://swift-at-ibm-slack.mybluemix.net">
		<img src="../../../assets/slack.png" alt="Slack Logo" width="60" height="60" class="social-image"/></a>
		<p class="social-header">Join the discussion on Slack</p>
	</div>
	<div  class="social-link">
		<iframe class="social-image" src="https://ghbtns.com/github-btn.html?user=IBM-Swift&amp;repo=Kitura&amp;type=star&amp;count=true&amp;size=large" frameborder="0" scrolling="0" width="150px" height="30px"></iframe>
		<p class="social-header">Star Kitura on GitHub</p>
	</div>
</section>
```
- and then the following Markdown: 
```
[info]: ../../assets/info-blue.png
[tip]: ../../assets/lightbulb-yellow.png
[warning]: ../../assets/warning-red.png
```
This addition enables the use of styled callouts in the topic. You should include it, even if you do not plan to use styled callouts.
Make sure that the relative path to the `assets` directory is accurate. Add or remove `../` until the path is accurate.

---

### Translating a topic

You might also like to make contributions in other languages, by translating the English content.

Follow these steps:

1. Clone the kitura.io repository
2. Find the 2-digit ISO 639-1 code for the language you wish to translate into. See [Language codes - ISO 639](http://www.iso.org/iso/language_codes)
3. Create a directory that has the ISO 639-1 code.
4. Copy the following files to the language directory:
	- `index.md`
	- `en/*` (and subdirectories)
5. For each markdown file update the `lang` and `title` variables.
6. Copy, rename and edit the header, footer, and notices files for your language:
	- `_includes/header/header-en.html`
	- `_includes/footer/footer-en.html`
	- `_includes/notices/notices-en.html`
7. Append `/{{ page.lang }}` to all the links within your pages.


