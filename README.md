jsdoc-memosa
------------

Memosa standard way of generating markdown files per JavaScript file


# Installation

```
yarn add jsdoc-memosa
```

# Usage

In your `package.json`, add:

```
"scripts": {
  "docs": "jsdoc:perFile imports/**/*.js -i *.text.js -c jsdoc.json"
}
```
