jsdoc-memosa
------------

Memosa standard way of generating markdown files per JavaScript file


# Installation

```
yarn add --dev jsdoc-memosa

# Peer dependencies
yarn add --dev jsdoc jsdoc-babel jsdoc-to-markdown
```

# Usage

In your `package.json`, add:

```
"scripts": {
  "docs": "jsdoc:perFile 'imports/**/*.js' -i *.text.js -c jsdoc.json"
}
```

If you want to have this tool look at wildcard files, pass them in using quotes.

* `-i, --ignore <ignore...>` will ignore files passed to it
* `-c, --config <config>` will use the jsdoc configuration file you pass to it.
* `-v, --verbose` will print out detailed information about which files we are looking at.

# Typical jsdoc.json

A typical `jsdoc.json` file will look like:

```json
{
  "plugins": ["node_modules/jsdoc-babel"]
}

```
