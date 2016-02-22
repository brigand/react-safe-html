var React = require('react');

module.exports = function toReactElements(node, components) {
  if (typeof node === 'string') {
    return node;
  }

  var children = node.children.map((child, i) => {
    var element = toReactElements(child, components);
    return element;
  });
  var type = components[node.type];
  if (!type) {
    return React.createElement('span', {}, ...children);
  }
  return React.createElement(type, node.props, ...children);
}

