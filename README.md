react-safe-html allows you to render user provided html (e.g. from ckeditor) safely. You choose how each element
renders and which attributes get passed through. It has defaults for basic elements and attributes but is fully customizable.

It uses a fast but flexible parser (htmlparser2) and implements shouldComponentUpdate for performance.

## status: alpha

## Install

You can install it with npm:

```sh
npm install --save react-safe-html
```

And require it:

```js
var ReactSafeHtml = require('react-safe-html');
// ...
<ReactSafeHtml html={html} components={ReactSafeHtml.defaultComponents} />
```


## Customization

TODO: write this

