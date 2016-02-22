module.exports = function toReactElements(node, components) {
  if (typeof node === 'string') {
    return node;
  }

  var children = node.children.map((child, i) => {
    var element = toReactElements(child, components);
    if (typeof element === 'object' && element) {
      element.key = i;
    }
    return element;
  });
  var type = components[node.type];
  if (!type) {
    return {type: 'span', props: {children}};
  }
  return {type, props: {...node.props, children}};
}

