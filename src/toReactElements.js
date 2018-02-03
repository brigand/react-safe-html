var React = require('react');

module.exports = function toReactElements(node, components, key = 'default_key') {
  if (typeof node === 'string') {
    if (components['#text']) {
      var result = components['#text'](node);
      if (!result || !result.type) {
        console.error('react-safe-html #text component didn\'t return a react element');
        return node;
      }
      return result;
    }
    else {
      return node;
    }
  }

  var children = node.children;

  if (Array.isArray(children)) {
    children = node.children.map((child, i) => {
      var element = toReactElements(child, components, i);
      return element;
    });
  }

  if (!Array.isArray(children)) {
    children = [children];
  }

  var resNode = null;
  var type = components[node.type];

  if (type) {
    var props = Object.assign({}, node.props, { key });
    resNode = React.createElement(type, props, children);
  } else {
    resNode = React.createElement('span', { key }, children);
  }
  return resNode;
}

