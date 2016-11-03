## Contributing to www.kitura.io

Content on this site is licensed under the Apache Licence, Version 2.0.

**Important**: If you clone this site to a Windows system you must configure git to handle the correct line ending characters by running the following command:
`git config --global core.autocrlf true`

Topics in the English language can be found in the `en/` folder. Within this folder, topics for the website are contained in folders that represent the website menu: 

- Getting started: `en/starter/` 
- Tutorials: `en/support/` 
- API: `en/api/` 
- Support: `en/resources/`
 
If you want to add topics or update existing topics, please open an Issue or create a Pull request with your changes.
Make sure you use the page language variable on all your links by appending `/{{ page.lang }}`. For example, to link to the *Getting Started* topic, use:
	`/{{ page.lang }}/starter/gettingstarted.html`

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
